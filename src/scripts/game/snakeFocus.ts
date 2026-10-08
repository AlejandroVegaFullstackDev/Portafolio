// Modo juego del Snake: mientras se juega, la página no se mueve (en cel ningún toque
// hace scroll), detrás aparece un fondo oscuro cyberpunk con partículas neón y cada
// canción comida suelta confeti. Al pausar o perder, todo vuelve a la normalidad.
import { canAffordHeavy, canAnimate } from '../fx/env';

const NEON = ['#ff003c', '#00f0ff', '#fcee0a', '#b026ff', '#39ff88'];

interface Bit { x: number; y: number; vx: number; vy: number; s: number; r: number; vr: number; c: string; life: number; confetti: boolean }

export class SnakeFocus {
  private backdrop: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private bits: Bit[] = [];
  private raf = 0;
  private active = false;
  private readonly block = (e: Event) => {
    // Deja escribir el nombre del ranking, pero nada más mueve la página.
    if ((e.target as HTMLElement | null)?.closest?.('input, textarea')) return;
    e.preventDefault();
  };

  constructor(private root: HTMLElement) {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'sn-backdrop';
    this.backdrop.setAttribute('aria-hidden', 'true');
    this.backdrop.innerHTML = '<div class="sn-bd-glow"></div><div class="sn-bd-floor"></div>';
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'sn-bd-fx';
    this.backdrop.append(this.canvas);
    document.body.append(this.backdrop);
    this.ctx = this.canvas.getContext('2d');
  }

  /** Centra la consola y bloquea el scroll. */
  enter(focusEl: HTMLElement) {
    if (this.active) return;
    this.active = true;
    const r = focusEl.getBoundingClientRect();
    const target = window.scrollY + r.top - Math.max(8, (window.innerHeight - r.height) / 2);
    window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
    document.documentElement.classList.add('snake-focus');
    this.root.classList.add('is-focus');
    document.addEventListener('touchmove', this.block, { passive: false });
    document.addEventListener('wheel', this.block, { passive: false });
    this.resize();
    if (canAnimate()) this.loop();
  }

  exit() {
    if (!this.active) return;
    this.active = false;
    document.documentElement.classList.remove('snake-focus');
    this.root.classList.remove('is-focus');
    document.removeEventListener('touchmove', this.block);
    document.removeEventListener('wheel', this.block);
    // Las partículas se apagan solas con el fondo (transición CSS) y luego se limpia.
    setTimeout(() => { if (!this.active) { cancelAnimationFrame(this.raf); this.bits = []; this.clear(); } }, 500);
  }

  /** Explosión de confeti desde un punto de la pantalla (coordenadas de viewport). */
  burst(x: number, y: number) {
    if (!this.active || !canAnimate()) return;
    const n = canAffordHeavy() ? 46 : 18;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 7;
      this.bits.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3, s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: NEON[i % NEON.length], life: 1, confetti: true });
    }
  }

  private resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = innerWidth * dpr;
    this.canvas.height = innerHeight * dpr;
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private clear() { this.ctx?.clearRect(0, 0, innerWidth, innerHeight); }

  private loop() {
    cancelAnimationFrame(this.raf);
    const ctx = this.ctx;
    if (!ctx) return;
    const ambient = canAffordHeavy() ? 0.35 : 0.12; // partículas por cuadro
    const tick = () => {
      // Polvo neón que sube despacio, de fondo.
      if (this.active && Math.random() < ambient) {
        this.bits.push({ x: Math.random() * innerWidth, y: innerHeight + 10, vx: (Math.random() - 0.5) * 0.4, vy: -(0.6 + Math.random() * 1.2), s: 1 + Math.random() * 2.5, r: 0, vr: 0, c: NEON[(Math.random() * NEON.length) | 0], life: 1, confetti: false });
      }
      this.clear();
      this.bits = this.bits.filter((b) => b.life > 0 && b.y > -20 && b.y < innerHeight + 40);
      for (const b of this.bits) {
        b.x += b.vx; b.y += b.vy; b.r += b.vr;
        if (b.confetti) { b.vy += 0.18; b.vx *= 0.985; b.life -= 0.012; }
        else b.life -= 0.0025;
        ctx.globalAlpha = Math.max(0, Math.min(1, b.life));
        ctx.fillStyle = b.c;
        if (b.confetti) {
          ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
          ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2);
          ctx.restore();
        } else {
          ctx.beginPath(); ctx.arc(b.x, b.y, b.s, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (this.active || this.bits.length) this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
}
