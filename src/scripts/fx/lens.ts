// Cursor lente (solo con mouse): un anillo que sigue al puntero; sobre enlaces y
// tarjetas crece como lupa y muestra una etiqueta ([data-lens="ver"]). Los
// elementos [data-magnetic] se acercan al cursor.
import gsap from 'gsap';
import { canAnimate, isFinePointer } from './env';

const TARGETS = 'a, button, [data-lens], [data-magnetic]';

export function initLens() {
  if (!isFinePointer() || document.documentElement.hasAttribute('data-tweak-nocursor')) return;

  const lens = document.createElement('div');
  lens.className = 'cy-lens';
  lens.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.className = 'cy-lens-label';
  lens.appendChild(label);
  document.body.appendChild(lens);

  const mouse = { x: -100, y: -100 };
  const pos = { x: -100, y: -100 };
  let target: HTMLElement | null = null;

  window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  gsap.ticker.add(() => {
    // Con objetivo, la lente se deja atraer un 30% hacia su centro.
    let tx = mouse.x, ty = mouse.y;
    if (target) {
      const r = target.getBoundingClientRect();
      tx += (r.left + r.width / 2 - tx) * 0.3;
      ty += (r.top + r.height / 2 - ty) * 0.3;
    }
    pos.x += (tx - pos.x) * 0.22;
    pos.y += (ty - pos.y) * 0.22;
    lens.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  });

  document.addEventListener('pointerover', (e) => {
    const t = (e.target as Element)?.closest?.<HTMLElement>(TARGETS) ?? null;
    if (t === target) return;
    target = t;
    lens.classList.toggle('is-active', !!t);
    label.textContent = t?.dataset.lens || '';
  });

  if (!canAnimate()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.18, y: (e.clientY - (r.top + r.height / 2)) * 0.22, duration: 0.4, ease: 'power3.out' });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }));
  });
}
