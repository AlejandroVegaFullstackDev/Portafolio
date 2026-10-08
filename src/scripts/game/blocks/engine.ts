// Motor del juego de bloques (sin DOM): piezas de 4 bloques que caen en un tablero de
// 10×20, se rotan y se mueven; las filas completas se borran y suman puntos.
// Reglas clásicas: bolsa de 7 (cada pieza sale una vez por ronda), rotación con
// empujes de pared, gravedad que acelera por nivel y puntaje 100/300/500/800 × nivel.

export const COLS = 10;
export const ROWS = 20;
export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
export const TYPES: PieceType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

// Forma base de cada pieza (fila, columna) dentro de su caja.
const SHAPES: Record<PieceType, number[][]> = {
  I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
};

const rotateCW = (m: number[][]) => m[0].map((_, c) => m.map((row) => row[c]).reverse());

/** Las 4 rotaciones precalculadas de cada pieza, como lista de celdas [fila, col]. */
const ROTATIONS: Record<PieceType, [number, number][][]> = Object.fromEntries(TYPES.map((t) => {
  const out: [number, number][][] = [];
  let m = SHAPES[t];
  for (let r = 0; r < 4; r++) {
    out.push(m.flatMap((row, y) => row.flatMap((v, x) => (v ? [[y, x] as [number, number]] : []))));
    m = rotateCW(m);
  }
  return [t, out];
})) as Record<PieceType, [number, number][][]>;

/** 0 = vacío; 1..7 = tipo de pieza fijada (índice en TYPES + 1). */
export type Grid = number[][];
export interface Piece { type: PieceType; rot: number; x: number; y: number }
export interface BlocksState {
  grid: Grid;
  piece: Piece;
  queue: PieceType[];
  bag: PieceType[];
  score: number;
  lines: number;
  level: number;
  over: boolean;
  /** Filas que se acaban de borrar (para el efecto); se limpia al leerlo. */
  cleared: number[];
}

export const cellsOf = (p: Piece) => ROTATIONS[p.type][p.rot].map(([r, c]) => [p.y + r, p.x + c] as [number, number]);

function fits(grid: Grid, p: Piece) {
  return cellsOf(p).every(([r, c]) => c >= 0 && c < COLS && r < ROWS && (r < 0 || grid[r][c] === 0));
}

function draw(s: BlocksState, rand: () => number): PieceType {
  if (!s.bag.length) {
    s.bag = [...TYPES];
    for (let i = s.bag.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [s.bag[i], s.bag[j]] = [s.bag[j], s.bag[i]]; }
  }
  return s.bag.pop()!;
}

function spawn(s: BlocksState, rand: () => number) {
  const type = s.queue.shift()!;
  s.queue.push(draw(s, rand));
  const width = type === 'I' ? 4 : type === 'O' ? 2 : 3;
  s.piece = { type, rot: 0, x: Math.floor((COLS - width) / 2), y: type === 'I' ? -1 : 0 };
  if (!fits(s.grid, s.piece)) s.over = true;
}

export function createBlocks(rand: () => number = Math.random): BlocksState {
  const s: BlocksState = {
    grid: Array.from({ length: ROWS }, () => Array(COLS).fill(0)),
    piece: { type: 'T', rot: 0, x: 3, y: 0 }, queue: [], bag: [],
    score: 0, lines: 0, level: 1, over: false, cleared: [],
  };
  for (let i = 0; i < 3; i++) s.queue.push(draw(s, rand));
  spawn(s, rand);
  return s;
}

/** Milisegundos entre caídas según el nivel (se acelera hasta un mínimo). */
export const gravityMs = (level: number) => Math.max(70, Math.round(800 * Math.pow(0.85, level - 1)));

export function move(s: BlocksState, dx: number): boolean {
  if (s.over) return false;
  const p = { ...s.piece, x: s.piece.x + dx };
  if (!fits(s.grid, p)) return false;
  s.piece = p;
  return true;
}

// Empujes de pared: si la rotación choca, prueba correrla un poco.
const KICKS = [[0, 0], [-1, 0], [1, 0], [0, -1], [-2, 0], [2, 0], [-1, -1], [1, -1]];

export function rotate(s: BlocksState, dir: 1 | -1 = 1): boolean {
  if (s.over || s.piece.type === 'O') return false;
  const rot = (s.piece.rot + (dir === 1 ? 1 : 3)) % 4;
  for (const [kx, ky] of KICKS) {
    const p = { ...s.piece, rot, x: s.piece.x + kx, y: s.piece.y + ky };
    if (fits(s.grid, p)) { s.piece = p; return true; }
  }
  return false;
}

/** Hasta dónde caería la pieza (para dibujar la pieza fantasma). */
export function dropY(s: BlocksState): number {
  let y = s.piece.y;
  while (fits(s.grid, { ...s.piece, y: y + 1 })) y++;
  return y;
}

const POINTS = [0, 100, 300, 500, 800];

function lock(s: BlocksState, rand: () => number): number {
  const id = TYPES.indexOf(s.piece.type) + 1;
  for (const [r, c] of cellsOf(s.piece)) {
    if (r < 0) { s.over = true; return 0; }
    s.grid[r][c] = id;
  }
  const full = s.grid.map((row, i) => (row.every((v) => v) ? i : -1)).filter((i) => i >= 0);
  if (full.length) {
    s.grid = s.grid.filter((_, i) => !full.includes(i));
    while (s.grid.length < ROWS) s.grid.unshift(Array(COLS).fill(0));
    s.score += POINTS[full.length] * s.level;
    s.lines += full.length;
    s.level = 1 + Math.floor(s.lines / 10);
  }
  s.cleared = full;
  spawn(s, rand);
  return full.length;
}

export type StepResult = { kind: 'fell' } | { kind: 'locked'; lines: number } | { kind: 'over' };

/** Un paso de gravedad (o caída suave): baja una fila o fija la pieza. */
export function step(s: BlocksState, rand: () => number, soft = false): StepResult {
  if (s.over) return { kind: 'over' };
  const p = { ...s.piece, y: s.piece.y + 1 };
  if (fits(s.grid, p)) {
    s.piece = p;
    if (soft) s.score += 1;
    return { kind: 'fell' };
  }
  const lines = lock(s, rand);
  return s.over ? { kind: 'over' } : { kind: 'locked', lines };
}

/** Caída dura: la pieza baja de una y se fija. */
export function hardDrop(s: BlocksState, rand: () => number): StepResult {
  if (s.over) return { kind: 'over' };
  const y = dropY(s);
  s.score += 2 * (y - s.piece.y);
  s.piece = { ...s.piece, y };
  const lines = lock(s, rand);
  return s.over ? { kind: 'over' } : { kind: 'locked', lines };
}

/** Celdas de una pieza en su caja (para dibujar la "siguiente"). */
export const previewCells = (t: PieceType) => ROTATIONS[t][0];
