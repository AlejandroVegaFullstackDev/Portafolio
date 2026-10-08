// Interfaz del Snake: estados del tablero (listo / pausa / fin), barra de estado,
// panel que gira (Sonando ⟷ Ranking) y el mosaico de lo que te comiste.
// No sabe nada del juego: snake.ts le dice qué mostrar.

export type OverlayState = 'ready' | 'paused' | 'over' | 'none';
export type Face = 'now' | 'rank';
export interface CoverInfo { title: string; artist: string; cover: string | null; url: string }

export const isEn = () => document.documentElement.getAttribute('data-lang') === 'en';
export const tr = (es: string, en: string) => (isEn() ? en : es);
const cssUrl = (u: string) => `url("${u.replace(/["\\\n]/g, encodeURIComponent)}")`;

export class SnakeUi {
  private overlay: HTMLElement;
  private pauseBtn: HTMLButtonElement;
  private panel: HTMLElement;
  private mosaic: HTMLElement;
  private count: HTMLElement;
  private strip: HTMLElement;
  private overTitle: HTMLElement;
  private badge: HTMLElement;
  readonly rank: HTMLElement;
  readonly overActions: HTMLElement;

  constructor(private root: HTMLElement) {
    const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
    this.overlay = q('[data-snake-overlay]');
    this.pauseBtn = q('[data-snake-pause]');
    this.panel = q('[data-panel]');
    this.mosaic = q('[data-snake-list]');
    this.count = q('[data-eaten-count]');
    this.strip = q('[data-over-strip]');
    this.overTitle = q('[data-over-title]');
    this.badge = q('[data-over-badge]');
    this.rank = q('[data-over-rank]');
    this.overActions = q('[data-over-actions]');
    root.querySelectorAll<HTMLButtonElement>('[data-face-btn]').forEach((b) =>
      b.addEventListener('click', () => this.face(b.dataset.faceBtn as Face)));
    this.face('now');
  }

  /** Muestra un estado del tablero y enfoca su acción principal. */
  state(s: OverlayState) {
    this.overlay.hidden = s === 'none';
    this.overlay.dataset.state = s;
    this.pauseBtn.hidden = s !== 'none';
    if (s === 'none') return;
    requestAnimationFrame(() => {
      const target = this.overlay.querySelector<HTMLElement>(`.ov-${s} .cy-btn:not([hidden])`);
      if (target && target.offsetParent) target.focus({ preventScroll: true });
    });
  }

  /** Gira el panel. La cara oculta queda inerte (ni foco ni lector de pantalla). */
  face(f: Face) {
    this.panel.dataset.face = f;
    this.root.querySelectorAll<HTMLElement>('[data-face-btn]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.faceBtn === f)));
    this.panel.querySelectorAll<HTMLElement>('.sn-face').forEach((el) => {
      const hide = el.dataset.face !== f;
      el.toggleAttribute('inert', hide);
      el.setAttribute('aria-hidden', String(hide));
    });
  }

  clear() {
    this.mosaic.replaceChildren();
    this.count.textContent = '0';
  }

  ate(t: CoverInfo | undefined, n: number) {
    this.count.textContent = String(n);
    if (!t) return;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = t.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = `${t.title} — ${t.artist}`;
    a.setAttribute('aria-label', a.title);
    if (t.cover) a.style.backgroundImage = cssUrl(t.cover);
    li.append(a);
    this.mosaic.prepend(li);
  }

  /** Pantalla de fin: título, récord y la tira de carátulas comidas. */
  over(score: number, eaten: CoverInfo[], newBest: boolean) {
    this.overTitle.textContent = score === 0
      ? tr('Ni una canción', 'Not a single song')
      : score === 1 ? tr('Te comiste 1 canción', 'You ate 1 song') : tr(`Te comiste ${score} canciones`, `You ate ${score} songs`);
    this.badge.hidden = !newBest;
    this.strip.replaceChildren(...eaten.slice(-12).reverse().map((t, i) => {
      const li = document.createElement('li');
      li.style.setProperty('--i', String(i));
      if (t.cover) li.style.backgroundImage = cssUrl(t.cover);
      return li;
    }));
    this.rank.replaceChildren();
    this.state('over');
  }

  /** Línea de resultado; `strong` va resaltado. */
  result(text: string, strong = '') {
    this.rank.replaceChildren(text);
    if (strong) {
      const b = document.createElement('b');
      b.textContent = strong;
      this.rank.prepend(b, ' ');
    }
  }
}
