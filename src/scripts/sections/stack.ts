// Stack: el tambor de tecnologías gira con el scroll (una vuelta completa por la sección).
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate } from '../fx/env';

gsap.registerPlugin(ScrollTrigger);

export function initStack() {
  const drum = document.getElementById('stackDrum');
  const section = document.getElementById('stack');
  if (!drum || !section) return;
  if (!canAnimate()) { gsap.set(drum, { rotationX: 0 }); return; }
  gsap.fromTo(drum, { rotationX: 0 }, {
    rotationX: 360, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
  });
}
