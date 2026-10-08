// Repetición determinista de una partida (la usa el servidor para validar el ranking).
// El cliente registra cada giro con el número de tick en que ocurrió; el servidor
// recrea el juego con la misma semilla y aplica los mismos giros en el mismo orden.
import { createGame, step, tickMs, turn, type Dir } from './snakeEngine';
import { mulberry32 } from './prng';

export const BOARD = 16;
export type Move = [tick: number, dir: Dir];
const DIRS = new Set<Dir>(['up', 'down', 'left', 'right']);

export interface ReplayResult { ok: boolean; score: number; ticks: number; minMs: number; reason?: string }

/**
 * @param seed   semilla firmada por el servidor
 * @param moves  giros [tick, dir] en orden
 * @param ticks  ticks que dice haber jugado el cliente (la partida debe terminar ahí)
 */
export function replay(seed: number, moves: Move[], ticks: number, maxTicks = 20_000): ReplayResult {
  if (!Number.isInteger(ticks) || ticks < 1 || ticks > maxTicks) return { ok: false, score: 0, ticks: 0, minMs: 0, reason: 'ticks' };
  if (moves.length > ticks * 2) return { ok: false, score: 0, ticks: 0, minMs: 0, reason: 'moves' };

  const rand = mulberry32(seed);
  const game = createGame(BOARD, 0, rand);
  let m = 0;
  let minMs = 0;
  let lastTick = -1;

  for (let t = 0; t < ticks; t++) {
    while (m < moves.length && moves[m][0] === t) {
      const [tick, dir] = moves[m];
      if (tick < lastTick || !DIRS.has(dir)) return { ok: false, score: 0, ticks: t, minMs, reason: 'move' };
      lastTick = tick;
      turn(game, dir);
      m++;
    }
    if (m < moves.length && moves[m][0] < t) return { ok: false, score: 0, ticks: t, minMs, reason: 'order' };
    minMs += tickMs(game.score);
    const r = step(game, rand);
    if (r === 'over') {
      // La partida tiene que terminar exactamente en el último tick declarado.
      const ok = t === ticks - 1 && m === moves.length;
      return { ok, score: game.score, ticks: t + 1, minMs, reason: ok ? undefined : 'end' };
    }
  }
  return { ok: false, score: game.score, ticks, minMs, reason: 'not-over' };
}
