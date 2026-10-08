// Flujo completo del ranking contra un Redis en memoria (simula Upstash REST).
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { createGame, step, turn, type Dir } from '../src/scripts/game/snakeEngine';
import { mulberry32 } from '../src/scripts/game/prng';
import { BOARD, type Move } from '../src/scripts/game/replay';

type Z = Map<string, number>;
const kv = new Map<string, string>(), hashes = new Map<string, Map<string, string>>(), zsets = new Map<string, Z>(), counters = new Map<string, number>();

function exec(cmd: (string | number)[]): unknown {
  const [op, key, ...a] = cmd.map(String);
  const z = () => zsets.get(key) ?? (zsets.set(key, new Map()), zsets.get(key)!);
  const ranked = () => [...z().entries()].sort((x, y) => y[1] - x[1]);
  switch (op) {
    case 'INCR': counters.set(key, (counters.get(key) ?? 0) + 1); return counters.get(key);
    case 'EXPIRE': return 1;
    case 'SET': if (a.includes('NX') && kv.has(key)) return null; kv.set(key, a[0]); return 'OK';
    case 'ZADD': { const [, score, m] = a; const cur = z().get(m); if (cur === undefined || Number(score) > cur) z().set(m, Number(score)); return 1; }
    case 'ZSCORE': { const v = z().get(a[0]); return v === undefined ? null : String(v); }
    case 'ZREVRANK': { const i = ranked().findIndex(([m]) => m === a[0]); return i < 0 ? null : i; }
    case 'ZREMRANGEBYRANK': return 0;
    case 'ZREVRANGE': return ranked().slice(Number(a[0]), Number(a[1]) + 1).flatMap(([m, s]) => [m, String(s)]);
    case 'HSET': { const h = hashes.get(key) ?? new Map(); h.set(a[0], a[1]); hashes.set(key, h); return 1; }
    case 'HMGET': return a.map((f) => hashes.get(key)?.get(f) ?? null);
    case 'ZREM': a.forEach((m) => z().delete(m)); return a.length;
    case 'HDEL': a.forEach((f) => hashes.get(key)?.delete(f)); return a.length;
    default: throw new Error(op);
  }
}

function play(seed: number) {
  const rand = mulberry32(seed);
  const g = createGame(BOARD, 0, rand);
  const moves: Move[] = [];
  let ticks = 0;
  const go = (d: Dir) => { moves.push([ticks, d]); turn(g, d); };
  for (let i = 0; i < 3000 && !g.over; i++) {
    const h = g.snake[0], f = g.food;
    if (f.x > h.x && g.dir !== 'left') go('right');
    else if (f.x < h.x && g.dir !== 'right') go('left');
    else if (f.y > h.y && g.dir !== 'up') go('down');
    else if (f.y < h.y && g.dir !== 'down') go('up');
    ticks++;
    step(g, rand);
  }
  return { moves, ticks, score: g.score };
}

let S: typeof import('../src/lib/leaderboard/service');

/** Sesión cuya partida (con el bot de prueba) suma al menos un punto: la semilla es al azar
 *  y una partida de 0 puntos el servidor la rechaza a propósito ('zero'). */
async function scoringSession(ip: string, dev: string) {
  for (let i = 0; i < 50; i++) {
    const s = await S.startSession(ip, dev);
    const g = play(s.seed);
    if (g.score > 0) return { ...s, g };
  }
  throw new Error('no se encontró una semilla con puntos');
}

beforeAll(async () => {
  const env = import.meta.env as Record<string, string>;
  env.LEADERBOARD_SECRET = 'service-test-secret-'.padEnd(48, 'y');
  env.KV_REST_API_URL = 'https://redis.test';
  env.KV_REST_API_TOKEN = 't';
  vi.stubGlobal('fetch', async (_u: string, init: { body: string }) => ({
    ok: true, json: async () => (JSON.parse(init.body) as (string | number)[][]).map((c) => ({ result: exec(c) })),
  }));
  (await import('../src/lib/leaderboard/crypto'))._resetKeys();
  S = await import('../src/lib/leaderboard/service');
});
beforeEach(() => { counters.clear(); });

describe('servicio del ranking', () => {
  it('acepta una partida real y la muestra en el top con su nombre (descifrado)', async () => {
    const { token, g } = await scoringSession('1.1.1.1', 'device-a');
    const later = Date.now() + 10 * 60_000;
    const res = await S.submitScore('1.1.1.1', { token, name: 'Alejo', moves: g.moves, ticks: g.ticks }, later);
    expect(res.score).toBe(g.score);
    expect(res.rank).toBe(1);
    expect(await S.topScores()).toEqual([{ name: 'Alejo', score: g.score }]);
    // En la "base de datos" el nombre no está en claro.
    expect([...hashes.values()].flatMap((h) => [...h.values()]).join()).not.toContain('Alejo');
  });

  it('no deja reutilizar el mismo token (ataque de repetición)', async () => {
    const { token, g } = await scoringSession('2.2.2.2', 'device-b');
    const later = Date.now() + 10 * 60_000;
    await S.submitScore('2.2.2.2', { token, name: 'Uno', moves: g.moves, ticks: g.ticks }, later);
    await expect(S.submitScore('2.2.2.2', { token, name: 'Uno', moves: g.moves, ticks: g.ticks }, later)).rejects.toMatchObject({ code: 'replayed' });
  });

  it('rechaza envíos más rápidos de lo que el juego permite', async () => {
    const { token, g } = await scoringSession('3.3.3.3', 'device-c');
    await expect(S.submitScore('3.3.3.3', { token, name: 'Rápido', moves: g.moves, ticks: g.ticks }, Date.now())).rejects.toMatchObject({ code: 'too-fast' });
  });

  it('rechaza tokens falsificados', async () => {
    await expect(S.submitScore('4.4.4.4', { token: 'abc.def', name: 'X', moves: [], ticks: 1 })).rejects.toMatchObject({ code: 'bad-token' });
  });

  it('limita la cantidad de envíos por IP', async () => {
    for (let i = 0; i < 12; i++) await S.submitScore('5.5.5.5', { token: 'x.y', name: 'X', moves: [], ticks: 1 }).catch(() => {});
    await expect(S.submitScore('5.5.5.5', { token: 'x.y', name: 'X', moves: [], ticks: 1 })).rejects.toMatchObject({ code: 'rate-limited' });
  });
});
