// Titulares tipo terminal: el texto se tipea con cursor parpadeante al entrar en pantalla.
// Conserva el markup (spans de idioma y de acento) partiendo solo los nodos de texto.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate } from './env';

gsap.registerPlugin(ScrollTrigger);

function wrapChars(root: HTMLElement): HTMLElement[] {
  const chars: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const text = node.textContent || '';
    if (!text.trim()) return;
    const frag = document.createDocumentFragment();
    [...text].forEach((c) => {
      const s = document.createElement('span');
      s.className = 'tw-ch';
      s.textContent = c;
      frag.appendChild(s);
      chars.push(s);
    });
    node.replaceWith(frag);
  });
  return chars;
}

/** Tipea cada [data-type] (titulares). Respeta el idioma activo. */
export function initTypewriter(getLang: () => 'es' | 'en') {
  if (!canAnimate()) {
    document.querySelectorAll('[data-type]').forEach((el) => el.classList.add('tw-done'));
    return;
  }
  document.querySelectorAll<HTMLElement>('[data-type]').forEach((el) => {
    const cursor = document.createElement('span');
    cursor.className = 'tw-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    // Se parten ambos idiomas para que el toggle no deje texto sin animar.
    const all = wrapChars(el);
    gsap.set(all, { opacity: 0 });

    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => {
        const scope = el.querySelector<HTMLElement>(`.lang-${getLang()}`) || el;
        const chars = Array.from(scope.querySelectorAll<HTMLElement>('.tw-ch'));
        const rest = all.filter((c) => !chars.includes(c));
        gsap.set(rest, { opacity: 1 }); // el otro idioma queda listo sin animación
        const perChar = Math.min(0.045, 1.1 / Math.max(chars.length, 1));
        const tl = gsap.timeline();
        chars.forEach((c, i) => {
          tl.add(() => {
            gsap.set(c, { opacity: 1 });
            c.after(cursor);
          }, i * perChar);
        });
        // El cursor parpadea un momento al final y desaparece.
        tl.add(() => { cursor.classList.add('tw-cursor--idle'); el.classList.add('tw-done'); }, '+=0.05');
        tl.to(cursor, { opacity: 0, duration: 0.3, delay: 1.6, onComplete: () => cursor.remove() });
      },
    });
  });
}
