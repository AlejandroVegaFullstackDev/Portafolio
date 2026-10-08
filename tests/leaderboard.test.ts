// Seguridad del ranking: la repetición no se deja engañar, los tokens no se falsifican,
// los registros quedan cifrados y los nombres se validan.
import { beforeAll, describe, expect, it } from 'vitest';
import { createGame, step, turn, type Dir } from '../src/scripts/game/snakeEngine';
import { mulberry32 } from '../src/scripts/game/prng';
import { BOARD, replay, type Move } from '../src/scripts/game/replay';
import { cleanName } from '../src/lib/leaderboard/names';

/** Juega una partida "real" con la semilla, siguiendo una estrategia simple, y registra los giros. */
function play(seed: number) {
  const rand = mulberry32(seed);
  const g = createGame(BOARD, 0, rand);
  const moves: Move[] = [];
  let ticks = 0;
  const go = (d: Dir) => { moves.push([ticks, d]); turn(g, d); };
  for (let i = 0; i < 3000 && !g.over; i++) {
    const h = g.snake[0], f = g.food;
    // Persigue la comida; cuando no puede, sigue recto (y eventualmente choca).
    if (f.x > h.x && g.dir !== 'left') go('right');
    else if (f.x < h.x && g.dir !== 'right') go('left');
    else if (f.y > h.y && g.dir !== 'up') go('down');
    else if (f.y < h.y && g.dir !== 'down') go('up');
    ticks++;
    step(g, rand);
  }
  return { moves, ticks, score: g.score, over: g.over };
}

describe('replay (anti-trampa)', () => {
  const seed = 123456789;
  const real = play(seed);

  it('la partida de prueba termina y suma puntos', () => {
    expect(real.over).toBe(true);
    expect(real.score).toBeGreaterThan(0);
  });

  it('reproduce exactamente el mismo puntaje con la misma semilla', () => {
    const r = replay(seed, real.moves, real.ticks);
    expect(r.ok).toBe(true);
    expect(r.score).toBe(real.score);
  });

  it('rechaza la misma partida con otra semilla', () => {
    const r = replay(seed + 1, real.moves, real.ticks);
    expect(r.ok && r.score === real.score).toBe(false);
  });

  it('rechaza ticks inflados o recortados', () => {
    expect(replay(seed, real.moves, real.ticks + 50).ok).toBe(false);
    expect(replay(seed, real.moves, real.ticks - 1).ok).toBe(false);
  });

  it('rechaza giros desordenados o inválidos', () => {
    if (real.moves.length < 2) return;
    const shuffled = [...real.moves].reverse() as Move[];
    expect(replay(seed, shuffled, real.ticks).ok).toBe(false);
    expect(replay(seed, [[0, 'diagonal' as Dir]], real.ticks).ok).toBe(false);
  });

  it('calcula el tiempo mínimo que debió durar (para descartar envíos instantáneos)', () => {
    expect(replay(seed, real.moves, real.ticks).minMs).toBeGreaterThan(real.ticks * 60);
  });
});

describe('cripto (firma y cifrado)', () => {
  let C: typeof import('../src/lib/leaderboard/crypto');
  beforeAll(async () => {
    (import.meta.env as Record<string, string>).LEADERBOARD_SECRET = 'test-secret-'.padEnd(48, 'x');
    C = await import('../src/lib/leaderboard/crypto');
    C._resetKeys();
  });

  it('firma y verifica tokens; uno alterado no pasa', async () => {
    const t = await C.signToken({ seed: 1, nonce: 'n' });
    expect(await C.verifyToken(t)).toEqual({ seed: 1, nonce: 'n' });
    const [body, sig] = t.split('.');
    const forged = Buffer.from(JSON.stringify({ seed: 999, nonce: 'n' })).toString('base64url');
    expect(await C.verifyToken(`${forged}.${sig}`)).toBeNull();
    expect(await C.verifyToken(`${body}.${sig.slice(0, -2)}AA`)).toBeNull();
  });

  it('cifra registros: el texto no aparece en claro y se descifra igual', async () => {
    const blob = await C.encrypt({ name: 'Alejo', score: 12 });
    expect(blob).not.toContain('Alejo');
    expect(await C.decrypt(blob)).toEqual({ name: 'Alejo', score: 12 });
    expect(await C.encrypt({ name: 'Alejo', score: 12 })).not.toBe(blob); // IV aleatorio
  });

  it('un registro manipulado no se descifra (GCM autentica)', async () => {
    const blob = await C.encrypt({ name: 'X', score: 1 });
    const [iv, ct] = blob.split('.');
    const bad = ct.slice(0, -3) + (ct.endsWith('A') ? 'BBB' : 'AAA');
    expect(await C.decrypt(`${iv}.${bad}`)).toBeNull();
  });

  it('seudonimiza IPs de forma estable sin dejar la IP en claro', async () => {
    const a = await C.pseudonym('190.24.1.10');
    expect(a).toBe(await C.pseudonym('190.24.1.10'));
    expect(a).not.toContain('190');
  });
});

describe('nombres', () => {
  it('acepta nombres normales', () => {
    expect(cleanName('  Alejo  ')).toBe('Alejo');
    expect(cleanName('Ñandú_99')).toBe('Ñandú_99');
  });
  it('rechaza HTML, vacíos, largos y groserías', () => {
    expect(cleanName('<script>')).toBeNull();
    expect(cleanName('a')).toBeNull();
    expect(cleanName('x'.repeat(17))).toBeNull();
    expect(cleanName('Admin')).toBeNull();
    expect(cleanName(42)).toBeNull();
  });
});
