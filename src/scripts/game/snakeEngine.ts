// Motor del Snake: lógica pura, sin DOM ni tiempo real (se prueba con Vitest).
// La comida es una canción (índice en la lista que llega de Spotify); el renderer
// dibuja su carátula y, con lo que se va comiendo, arma el cuerpo de la serpiente.

export type Dir = 'up' | 'down' | 'left' | 'right';
export interface Cell { x: number; y: number }
export interface Food extends Cell { item: number }

export interface SnakeState {
  size: number;         // tablero cuadrado de size × size
  items: number;        // cuántas canciones hay (0 = sin Spotify, comida genérica)
  snake: Cell[];        // [0] es la cabeza
  dir: Dir;
  queued: Dir[];        // giros pendientes (permite dos teclas rápidas)
  food: Food;
  score: number;
  eaten: number[];      // índices de canciones comidas, en orden
  over: boolean;
}

const DELTA: Record<Dir, Cell> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const OPPOSITE: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
const same = (a: Cell, b: Cell) => a.x === b.x && a.y === b.y;

/** Coloca la siguiente canción en una celda libre. `rand` se inyecta para testear. */
export function placeFood(size: number, snake: Cell[], item: number, rand: () => number = Math.random): Food {
  const free: Cell[] = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!snake.some((s) => s.x === x && s.y === y)) free.push({ x, y });
  const cell = free[Math.floor(rand() * free.length)] ?? { x: 0, y: 0 };
  return { ...cell, item };
}

const nextItem = (s: Pick<SnakeState, 'items' | 'score'>) => (s.items > 0 ? s.score % s.items : -1);

export function createGame(size = 16, items = 0, rand: () => number = Math.random): SnakeState {
  const mid = Math.floor(size / 2);
  const snake = [{ x: mid, y: mid }, { x: mid - 1, y: mid }, { x: mid - 2, y: mid }];
  return { size, items, snake, dir: 'right', queued: [], food: placeFood(size, snake, items > 0 ? 0 : -1, rand), score: 0, eaten: [], over: false };
}

/** Encola un giro; ignora reversas sobre sí misma y repetidos. */
export function turn(state: SnakeState, dir: Dir): void {
  const last = state.queued[state.queued.length - 1] ?? state.dir;
  if (dir === last || dir === OPPOSITE[last] || state.queued.length >= 2) return;
  state.queued.push(dir);
}

/** Avanza un tick. Devuelve 'ate' si comió, 'over' si chocó, o null. */
export function step(state: SnakeState, rand: () => number = Math.random): 'ate' | 'over' | null {
  if (state.over) return 'over';
  state.dir = state.queued.shift() ?? state.dir;
  const d = DELTA[state.dir];
  const head = { x: state.snake[0].x + d.x, y: state.snake[0].y + d.y };

  const hitsWall = head.x < 0 || head.y < 0 || head.x >= state.size || head.y >= state.size;
  const eats = same(head, state.food);
  // La cola se mueve en este tick (salvo que coma), así que no cuenta como choque.
  const body = eats ? state.snake : state.snake.slice(0, -1);
  if (hitsWall || body.some((c) => same(c, head))) {
    state.over = true;
    return 'over';
  }

  state.snake.unshift(head);
  if (eats) {
    state.eaten.push(state.food.item);
    state.score += 1;
    state.food = placeFood(state.size, state.snake, nextItem(state), rand);
    return 'ate';
  }
  state.snake.pop();
  return null;
}

/** Milisegundos por tick: arranca tranquilo y acelera con el puntaje (con tope). */
export const tickMs = (score: number) => Math.max(70, 160 - score * 4);
