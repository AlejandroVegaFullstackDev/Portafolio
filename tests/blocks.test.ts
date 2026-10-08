// Motor del juego de bloques: piezas, rotación, líneas, puntaje y fin de partida.
import { describe, expect, it } from 'vitest';
import { COLS, ROWS, TYPES, cellsOf, createBlocks, dropY, gravityMs, hardDrop, move, rotate, step } from '../src/scripts/game/blocks/engine';
import { mulberry32 } from '../src/scripts/game/prng';

describe('bloques', () => {
  it('la bolsa de 7 reparte cada pieza una vez por ronda', () => {
    const rand = mulberry32(42);
    const s = createBlocks(rand);
    const seen: string[] = [s.piece.type];
    for (let i = 0; i < 6; i++) { hardDrop(s, rand); seen.push(s.piece.type); if (s.over) break; }
    expect(new Set(seen).size).toBe(7);
    expect([...new Set(seen)].sort()).toEqual([...TYPES].sort());
  });

  it('no deja salir la pieza del tablero', () => {
    const s = createBlocks(mulberry32(1));
    for (let i = 0; i < 20; i++) move(s, -1);
    expect(Math.min(...cellsOf(s.piece).map(([, c]) => c))).toBe(0);
    for (let i = 0; i < 20; i++) move(s, 1);
    expect(Math.max(...cellsOf(s.piece).map(([, c]) => c))).toBe(COLS - 1);
  });

  it('rota contra la pared empujando la pieza hacia adentro', () => {
    const s = createBlocks(mulberry32(3));
    s.piece = { type: 'I', rot: 1, x: 0, y: 5 };
    for (let i = 0; i < 5; i++) move(s, -1);
    expect(rotate(s)).toBe(true);
    expect(cellsOf(s.piece).every(([, c]) => c >= 0 && c < COLS)).toBe(true);
  });

  it('borra una fila completa y suma puntos según el nivel', () => {
    const rand = mulberry32(7);
    const s = createBlocks(rand);
    // Llena la última fila salvo 4 huecos y deja caer una I acostada en ellos.
    s.grid[ROWS - 1] = [1, 1, 1, 0, 0, 0, 0, 1, 1, 1];
    s.piece = { type: 'I', rot: 0, x: 3, y: 0 };
    const r = hardDrop(s, rand);
    expect(r).toEqual({ kind: 'locked', lines: 1 });
    expect(s.lines).toBe(1);
    expect(s.score).toBeGreaterThanOrEqual(100);
    expect(s.grid[ROWS - 1].every((v) => v === 0)).toBe(true);
  });

  it('la pieza fantasma coincide con la caída dura', () => {
    const rand = mulberry32(9);
    const s = createBlocks(rand);
    const y = dropY(s);
    const before = { ...s.piece };
    step(s, rand);
    expect(y).toBeGreaterThan(before.y);
  });

  it('termina cuando las piezas llegan arriba', () => {
    const rand = mulberry32(5);
    const s = createBlocks(rand);
    let r;
    for (let i = 0; i < 200 && !s.over; i++) r = hardDrop(s, rand);
    expect(s.over).toBe(true);
    expect(r).toEqual({ kind: 'over' });
  });

  it('la gravedad acelera con el nivel', () => {
    expect(gravityMs(5)).toBeLessThan(gravityMs(1));
    expect(gravityMs(99)).toBe(70);
  });
});
