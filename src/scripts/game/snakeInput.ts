// Controles del Snake: teclado (solo mientras se juega, para no robarle el scroll a la
// página) y swipe en toda la consola: gira apenas el dedo recorre ~22 px, sin esperar a
// soltar, y se pueden encadenar giros. Mientras se juega, deslizar no mueve la página.
import type { Dir } from './snakeEngine';

const SWIPE = 22;
const KEYS: Record<string, Dir> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
};
const dirOf = (dx: number, dy: number): Dir => (Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));

interface Handlers { running: () => boolean; turn: (d: Dir) => void; pause: () => void }

export function bindControls(pad: HTMLElement, canvas: HTMLCanvasElement, h: Handlers) {
  window.addEventListener('keydown', (e) => {
    if (!h.running()) return;
    if (e.key === ' ' || e.key === 'Escape') { e.preventDefault(); h.pause(); return; }
    const d = KEYS[e.key];
    if (d) { e.preventDefault(); h.turn(d); }
  });

  let sx = 0, sy = 0, tracking = false;
  pad.addEventListener('touchstart', (e) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; tracking = true; }, { passive: true });
  pad.addEventListener('touchmove', (e) => {
    if (!h.running() || !tracking) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE) return;
    h.turn(dirOf(dx, dy));
    sx = t.clientX; sy = t.clientY;
  }, { passive: false });
  pad.addEventListener('touchend', () => { tracking = false; });

  // Mouse: arrastrar también sirve.
  canvas.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') { sx = e.clientX; sy = e.clientY; } });
  canvas.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'mouse' || !h.running()) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) >= SWIPE) h.turn(dirOf(dx, dy));
  });
}
