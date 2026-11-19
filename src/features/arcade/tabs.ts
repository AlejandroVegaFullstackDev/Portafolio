// Consola con varios juegos: pestañas Snake · Bloques · Doom. Cambiar de pestaña pausa
// el juego que estaba corriendo y muestra el otro; todos comparten la barra de puntos,
// la música, el tocadiscos y el modo juego (los expone el Snake: ArcadeShared).
// Las pestañas se conectan de inmediato: no dependen de que el Snake termine de cargar
// (ni de que cargue bien); los juegos se arman cuando lo compartido está listo.
import type { ArcadeShared, GameHandle } from './shared/contracts';
import { initBlocks } from './blocks/controller';
import { initDoom } from './doom/controller';

type GameId = 'snake' | 'blocks' | 'doom';

export function initArcade(root: HTMLElement | null, ready: Promise<ArcadeShared | null>) {
  if (!root) return;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-game-tab]')];
  const boards = [...root.querySelectorAll<HTMLElement>('[data-game-board]')];
  if (!tabs.length) return;

  let shared: ArcadeShared | null = null;
  const games: Partial<Record<GameId, GameHandle>> = {};
  // Bloques y Doom se arman la primera vez que se abren (no cuestan nada si nadie entra).
  const lazy: Record<GameId, (s: ArcadeShared) => GameHandle | null> = {
    snake: (s) => ({ activate: s.snakeHud, deactivate: s.pauseSnake }),
    blocks: (s) => initBlocks(s),
    doom: (s) => initDoom(s),
  };
  const handle = (id: GameId) => {
    if (!games[id] && shared) {
      try { games[id] = lazy[id](shared) ?? undefined; } catch (e) { console.error(`[arcade] ${id}`, e); }
    }
    return games[id];
  };
  let current: GameId = 'snake';

  function show(id: GameId) {
    if (id === current) return;
    games[current]?.deactivate();
    current = id;
    root!.dataset.game = id;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.gameTab === id)));
    boards.forEach((b) => { b.hidden = b.dataset.gameBoard !== id; });
    handle(id)?.activate();
  }

  tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.gameTab as GameId)));
  root.dataset.game = 'snake';

  ready.then((s) => {
    shared = s;
    if (!s) return;
    handle('snake');
    if (current !== 'snake') handle(current)?.activate(); // cambiaron de pestaña mientras cargaba
  }).catch((e) => console.error('[arcade]', e));
}
