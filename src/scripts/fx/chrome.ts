// "Cromo" de la página: ticker en marquee, barra de progreso de scroll y halo del cursor.
import gsap from 'gsap';
import { canAffordHeavy, canAnimate, isFinePointer } from './env';

/** Marquees infinitos: duplica el contenido y lo desplaza a velocidad constante. */
export function initMarquees() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner || !canAnimate()) return;
    const speed = parseFloat(el.dataset.marquee || '60');
    const dup = inner.cloneNode(true) as HTMLElement;
    dup.setAttribute('aria-hidden', 'true');
    el.appendChild(dup);
    const w = inner.getBoundingClientRect().width;
    gsap.to(Array.from(el.children), { x: -w, duration: w / speed, ease: 'none', repeat: -1 });
  });
}

export function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:100%;background:var(--accent);z-index:9999;pointer-events:none;transform-origin:left;transform:scaleX(0);';
  document.body.appendChild(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

export function initSpotlight() {
  if (!isFinePointer() || !canAffordHeavy()) return;
  const el = document.createElement('div');
  el.className = 'cy-spotlight';
  document.body.appendChild(el);
  const x = gsap.quickTo(el, 'x', { duration: 1.4, ease: 'power3.out' });
  const y = gsap.quickTo(el, 'y', { duration: 1.4, ease: 'power3.out' });
  window.addEventListener('pointermove', (e) => { x(e.clientX); y(e.clientY); });
}
