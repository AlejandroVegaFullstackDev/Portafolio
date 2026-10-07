// Etiquetas "// 0N _ NOMBRE" que se descifran al entrar en pantalla.
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate } from './env';
import type { Lang } from '../core/i18n';

const CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';

function scramble(el: HTMLElement, finalText: string) {
  let frame = 0;
  const queue = [...finalText].map((to) => ({ to, start: Math.floor(Math.random() * 18), end: Math.floor(Math.random() * 30) + 18 }));
  const update = () => {
    let out = '';
    let complete = 0;
    for (const { to, start, end } of queue) {
      if (frame >= end) { complete++; out += to; }
      else if (frame >= start) out += CHARS[Math.floor(Math.random() * CHARS.length)];
      else out += ' ';
    }
    el.textContent = out;
    if (complete === queue.length) return;
    frame++;
    requestAnimationFrame(update);
  };
  update();
}

export function initScramble(getLang: () => Lang) {
  if (!canAnimate()) return;
  document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
    // Guarda el markup bilingüe y lo restaura al terminar para que el toggle siga funcionando.
    const original = el.innerHTML;
    const target = el.querySelector<HTMLElement>(`.lang-${getLang()}`);
    const text = (target ? target.textContent : el.textContent) || '';
    el.textContent = '';
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        scramble(el, text);
        setTimeout(() => { el.innerHTML = original; }, 1400);
      },
    });
  });
}
