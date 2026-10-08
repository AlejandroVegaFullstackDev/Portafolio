// Consola con varios juegos: pestañas Snake · Bloques · Doom. Cambiar de pestaña pausa
// el juego que estaba corriendo y muestra el otro; todos comparten la barra de puntos,
// la música, el tocadiscos y el modo juego (los expone el Snake: ArcadeShared).
import type { ArcadeShared } from './snake';
import { initBlocks, type GameHandle } from './blocks/blocks';
import { initDoom } from './doom/doom';

type GameId = 'snake' | 'blocks' | 'doom';

export function initArcade(shared: ArcadeShared) {
  const { root } = shared;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-game-tab]')];
  const boards = [...root.querySelectorAll<HTMLElement>('[data-game-board]')];
  if (!tabs.length) return;

  const snake: GameHandle = { activate: shared.snakeHud, deactivate: shared.pauseSnake };
  const games: Partial<Record<GameId, GameHandle>> = { snake };
  // Bloques y Doom se arman la primera vez que se abren (no cuestan nada si nadie entra).
  const lazy: Record<Exclude<GameId, 'snake'>, () => GameHandle | null> = {
    blocks: () => initBlocks(shared),
    doom: () => initDoom(shared),
  };
  let current: GameId = 'snake';

  function show(id: GameId) {
    if (id === current) return;
    games[current]?.deactivate();
    current = id;
    root.dataset.game = id;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.gameTab === id)));
    boards.forEach((b) => { b.hidden = b.dataset.gameBoard !== id; });
    if (!games[id] && id !== 'snake') games[id] = lazy[id]() ?? undefined;
    games[id]?.activate();
  }

  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.gameTab as GameId)));
  root.dataset.game = 'snake';
}
