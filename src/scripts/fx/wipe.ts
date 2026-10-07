// Wipe entre secciones: cada [data-wipe] se revela con una máscara diagonal ligada al scroll,
// y sus [data-stagger-item] entran en cascada.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate } from './env';

gsap.registerPlugin(ScrollTrigger);

const HIDDEN = 'polygon(0% 0%, 0% 0%, -25% 100%, -25% 100%)';
const SHOWN = 'polygon(0% 0%, 125% 0%, 100% 100%, -25% 100%)';

export function initWipes() {
  if (!canAnimate()) return;
  document.querySelectorAll<HTMLElement>('[data-wipe]').forEach((section) => {
    gsap.fromTo(section, { clipPath: HIDDEN }, {
      clipPath: SHOWN, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top 95%', end: 'top 35%', scrub: 0.6 },
    });

    const items = section.querySelectorAll('[data-stagger-item]');
    if (items.length) {
      gsap.fromTo(items, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'expo.out',
        scrollTrigger: { trigger: items[0], start: 'top 88%', once: true },
      });
    }
  });
}
