// Efectos 3D del Snake (todo CSS 3D + Web Animations, sin librerías):
//  · el tablero se inclina hacia donde va la serpiente, y sigue al mouse en reposo
//  · al comer, la carátula salta del tablero girando
//  · al chocar, el tablero tiembla y destella
// Respeta "reducir movimiento" y el modo ahorro (fx/env).
import { canAffordHeavy, canAnimate, isFinePointer } from '../fx/env';
import type { Dir } from './snakeEngine';

const LEAN: Record<Dir, [number, number]> = { up: [3, 0], down: [-2, 0], left: [0, -3], right: [0, 3] };
const BASE_X = 4; // inclinación de "consola sobre la mesa" mientras se juega

export class SnakeFx {
  private playing = false;

  constructor(private root: HTMLElement, private card: HTMLElement, private board: HTMLElement, private canvas: HTMLCanvasElement) {
    if (!canAnimate()) return;
    if (isFinePointer()) {
      card.addEventListener('pointermove', (e) => {
        if (this.playing) return;
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        card.classList.add('is-hover');
        this.set(-ny * 8, nx * 10);
      });
      card.addEventListener('pointerleave', () => { card.classList.remove('is-hover'); if (!this.playing) this.set(0, 0); });
    }
  }

  private set(rx: number, ry: number) {
    this.card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    this.card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
  }

  play() { this.playing = true; this.card.classList.remove('is-hover'); this.set(BASE_X, 0); }
  idle() { this.playing = false; this.set(0, 0); }

  lean(d: Dir) {
    if (!this.playing || !canAnimate()) return;
    const [rx, ry] = LEAN[d];
    this.set(BASE_X + rx, ry);
  }

  /** La carátula comida salta del tablero, gira y se desvanece; un aro marca el punto. */
  pop(src: string | null, x: number, y: number, cell: number) {
    if (!canAnimate()) return;
    const left = this.canvas.offsetLeft + x * cell, top = this.canvas.offsetTop + y * cell;
    const place = <T extends HTMLElement>(el: T): T => {
      Object.assign(el.style, { left: `${left}px`, top: `${top}px`, width: `${cell}px`, height: `${cell}px` });
      this.board.append(el);
      return el;
    };
    const ring = place(document.createElement('span'));
    ring.className = 'fx-ring';
    ring.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(4)', opacity: 0 }], { duration: 520, easing: 'cubic-bezier(.16,1,.3,1)' })
      .finished.then(() => ring.remove(), () => ring.remove());
    if (!src || !canAffordHeavy()) return;
    const img = place(new Image());
    img.className = 'fx-pop';
    img.alt = '';
    img.src = src;
    img.animate([
      { transform: 'perspective(500px) translateZ(0) rotateY(0) scale(1)', opacity: 1 },
      { transform: 'perspective(500px) translateZ(120px) translateY(-40%) rotateY(200deg) scale(2.4)', opacity: 1, offset: 0.55 },
      { transform: 'perspective(500px) translateZ(60px) translateY(-110%) rotateY(360deg) scale(2.8)', opacity: 0 },
    ], { duration: 820, easing: 'cubic-bezier(.2,.8,.2,1)' }).finished.then(() => img.remove(), () => img.remove());
  }

  /** Choque: temblor + destello rojo. */
  hit() {
    try { if ('vibrate' in navigator) navigator.vibrate([30, 40, 60]); } catch { /* sin háptica */ }
    this.root.classList.add('is-hit');
    setTimeout(() => this.root.classList.remove('is-hit'), 420);
    if (!canAnimate()) return;
    this.board.animate([
      { transform: 'translate(0,0) rotate(0)' }, { transform: 'translate(-6px,2px) rotate(-1deg)' },
      { transform: 'translate(5px,-3px) rotate(.8deg)' }, { transform: 'translate(-3px,1px) rotate(-.4deg)' },
      { transform: 'translate(0,0) rotate(0)' },
    ], { duration: 380, easing: 'ease-out' });
  }

  /** Número que cambia: voltea como marcador de estadio. */
  bump(el: HTMLElement) {
    if (!canAnimate()) return;
    el.animate([
      { transform: 'perspective(300px) rotateX(-90deg)', opacity: 0 },
      { transform: 'perspective(300px) rotateX(15deg)', opacity: 1, offset: 0.7 },
      { transform: 'perspective(300px) rotateX(0)', opacity: 1 },
    ], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)' });
  }
}
