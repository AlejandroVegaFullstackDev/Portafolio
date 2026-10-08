// Solo corre si hay un Redis local en REDIS_TEST_URL (p. ej. redis://127.0.0.1:6390).
import { beforeAll, describe, expect, it } from 'vitest';
import { createGame, step, turn, type Dir } from '../src/scripts/game/snakeEngine';
import { mulberry32 } from '../src/scripts/game/prng';
import { BOARD, type Move } from '../src/scripts/game/replay';

const URL = process.env.REDIS_TEST_URL;
function play(seed: number) {
  const rand = mulberry32(seed); const g = createGame(BOARD, 0, rand); const moves: Move[] = []; let ticks = 0;
  const go = (d: Dir) => { moves.push([ticks, d]); turn(g, d); };
  for (let i = 0; i < 3000 && !g.over; i++) {
    const h = g.snake[0], f = g.food;
    if (f.x > h.x && g.dir !== 'left') go('right'); else if (f.x < h.x && g.dir !== 'right') go('left');
    else if (f.y > h.y && g.dir !== 'up') go('down'); else if (f.y < h.y && g.dir !== 'down') go('up');
    ticks++; step(g, rand);
  }
  return { moves, ticks, score: g.score };
}
describe.skipIf(!URL)('ranking sobre Redis TCP real', () => {
  let S: typeof import('../src/lib/leaderboard/service');
  beforeAll(async () => {
    const env = import.meta.env as Record<string, string>;
    env.LEADERBOARD_SECRET = 'tcp-test-secret-'.padEnd(48, 'z'); env.REDIS_URL = URL!;
    delete env.KV_REST_API_URL; delete env.KV_REST_API_TOKEN;
    (await import('../src/lib/leaderboard/crypto'))._resetKeys();
    S = await import('../src/lib/leaderboard/service');
  });
  it('guarda, rankea y no deja repetir', async () => {
    const { seed, token } = await S.startSession('9.9.9.9', 'dev-tcp');
    const g = play(seed); const later = Date.now() + 600_000;
    const r = await S.submitScore('9.9.9.9', { token, name: 'Tcp', moves: g.moves, ticks: g.ticks }, later);
    expect(r.score).toBe(g.score); expect(r.rank).toBe(1);
    expect(await S.topScores()).toEqual([{ name: 'Tcp', score: g.score }]);
    await expect(S.submitScore('9.9.9.9', { token, name: 'Tcp', moves: g.moves, ticks: g.ticks }, later)).rejects.toMatchObject({ code: 'replayed' });
  });
});
