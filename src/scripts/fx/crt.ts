// Glitch CRT: la imagen se enciende como un monitor viejo.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate } from './env';

gsap.registerPlugin(ScrollTrigger);

/** Destello corto (reutilizable): brillo, corte horizontal y aberración de color. */
export function crtFlash(el: HTMLElement) {
  if (!canAnimate()) return;
  gsap.timeline()
    .set(el, { filter: 'brightness(2.6) contrast(1.4)' })
    .to(el, { scaleY: 0.96, x: -6, duration: 0.05, ease: 'none' })
    .set(el, { filter: 'hue-rotate(110deg) brightness(1.5)' })
    .to(el, { scaleY: 1, x: 4, duration: 0.05, ease: 'none' })
    .set(el, { filter: 'hue-rotate(0deg) brightness(1)' })
    .to(el, { x: 0, duration: 0.2, ease: 'expo.out' })
    .set(el, { clearProps: 'filter' });
}

/** Encendido completo al entrar en pantalla para cada [data-crt]. */
export function initCrt() {
  if (!canAnimate()) return;
  gsap.utils.toArray<HTMLElement>('[data-crt]').forEach((el) => {
    gsap.set(el, { scaleY: 0.02, opacity: 0, transformOrigin: '50% 50%' });
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => {
        gsap.timeline()
          .to(el, { opacity: 1, duration: 0.01 })
          .to(el, { scaleY: 1.06, duration: 0.28, ease: 'power3.out' })
          .to(el, { scaleY: 1, duration: 0.16, ease: 'power2.out' })
          .add(() => crtFlash(el));
      },
    });
  });
}
