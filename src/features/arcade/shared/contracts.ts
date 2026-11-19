// Contratos de la consola: lo que el Snake comparte con los otros juegos (tabs.ts) y
// lo que cada juego expone para que las pestañas lo pausen o reanuden.
import type { Track } from '../../../lib/arcade/track';
import type { PreviewPlayer } from './preview-player';
import type { VinylDeck } from './vinyl-deck';
import type { SnakeFocus } from './game-focus';

export interface ArcadeShared {
  root: HTMLElement;
  tracks: Track[];
  player: PreviewPlayer;
  deck: VinylDeck;
  focus: SnakeFocus;
  consoleEl: HTMLElement;
  setSound: (on: boolean) => void;
  soundOn: () => boolean;
  /** Pausa el Snake si está corriendo. */
  pauseSnake: () => void;
  /** Vuelve a poner en la barra los puntos y el récord del Snake. */
  snakeHud: () => void;
}

export interface GameHandle { activate: () => void; deactivate: () => void }
