import { describe, expect, it } from 'vitest';
import { createGame, step, tickMs, turn, type SnakeState } from '../src/scripts/game/snakeEngine';

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
