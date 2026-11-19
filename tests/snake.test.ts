import { describe, expect, it } from 'vitest';
import { createGame, step, tickMs, turn, type Dir, type SnakeState } from '../src/scripts/game/snakeEngine';
import { BOARD, replay, type Move } from '../src/scripts/game/replay';
import { mulberry32 } from '../src/scripts/game/prng';

// rand determinista: siempre elige la primera celda libre y la primera etiqueta.
const zero = () => 0;
const withFood = (s: SnakeState, x: number, y: number) => ({ ...s, food: { x, y, item: 0 } });

describe('snake engine', () => {
  it('arranca con 3 segmentos hacia la derecha y comida fuera del cuerpo', () => {
    const s = createGame(10, 5, zero);
    expect(s.snake).toHaveLength(3);
    expect(s.dir).toBe('right');
    expect(s.snake.some((c) => c.x === s.food.x && c.y === s.food.y)).toBe(false);
  });

  it('avanza una celda por tick sin crecer', () => {
    const s = withFood(createGame(10, 5, zero), 0, 0);
    const head = { ...s.snake[0] };
    expect(step(s, zero)).toBeNull();
    expect(s.snake[0]).toEqual({ x: head.x + 1, y: head.y });
    expect(s.snake).toHaveLength(3);
  });

  it('crece y suma al comer', () => {
    const s = createGame(10, 5, zero);
    const h = s.snake[0];
    const g = withFood(s, h.x + 1, h.y);
    expect(step(g, zero)).toBe('ate');
    expect(g.snake).toHaveLength(4);
    expect(g.score).toBe(1);
    expect(g.eaten).toEqual([0]);
    expect(g.food.item).toBe(1); // la siguiente canción de la lista
  });

  it('no permite dar reversa sobre sí misma', () => {
    const s = createGame(10, 5, zero);
    turn(s, 'left');
    expect(s.queued).toEqual([]);
  });

  it('termina al chocar con la pared', () => {
    const s = withFood(createGame(6, 5, zero), 0, 0);
    let r = null;
    for (let i = 0; i < 6 && r !== 'over'; i++) r = step(s, zero);
    expect(r).toBe('over');
    expect(s.over).toBe(true);
  });

  it('termina al chocar con su propio cuerpo', () => {
    const s: SnakeState = {
      size: 10, items: 5, dir: 'up', queued: [], score: 0, eaten: [], over: false, food: { x: 0, y: 0, item: 0 },
      snake: [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 5 }, { x: 4, y: 4 }, { x: 5, y: 4 }],
    };
    turn(s, 'left');
    expect(step(s, zero)).toBe('over');
  });

  it('acelera con el puntaje pero con un tope', () => {
    expect(tickMs(0)).toBeGreaterThan(tickMs(10));
    expect(tickMs(1000)).toBe(70);
  });
});

describe('snake sin Spotify', () => {
  it('funciona con comida genérica cuando no hay canciones', () => {
    const s = createGame(10, 0, zero);
    expect(s.food.item).toBe(-1);
  });
});

describe('ráfagas de teclado y el ranking', () => {
  // Simula la partida como snake.ts: una ráfaga de teclas en el tick 0 y luego recto hasta chocar.
  function burstGame(record: 'accepted' | 'all') {
    const seed = 42;
    const rand = mulberry32(seed);
    const g = createGame(BOARD, 0, rand);
    const moves: Move[] = [];
    let ticks = 0;
    const keys: Dir[] = Array.from({ length: 30 }, (_, i) => (i % 2 ? 'down' : 'up'));
    for (const d of keys) {
      const ok = turn(g, d);
      if (ok || record === 'all') moves.push([ticks, d]);
    }
    while (!g.over && ticks < 1000) { ticks++; step(g, rand); }
    return { seed, moves, ticks, score: g.score };
  }

  it('turn() dice si aceptó el giro', () => {
    const g = createGame(10, 0, zero);
    expect(turn(g, 'left')).toBe(false); // reversa
    expect(turn(g, 'right')).toBe(false); // repetido
    expect(turn(g, 'up')).toBe(true);
  });

  it('registrando solo los giros aceptados, la ráfaga no invalida la partida', () => {
    const r = burstGame('accepted');
    expect(r.moves).toHaveLength(1);
    expect(replay(r.seed, r.moves, r.ticks)).toMatchObject({ ok: true, score: r.score });
  });

  it('registrando cada tecla, la misma ráfaga la invalidaba', () => {
    const r = burstGame('all');
    expect(replay(r.seed, r.moves, r.ticks).ok).toBe(false);
  });
});
