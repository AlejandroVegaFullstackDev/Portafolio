// Experiencia: cada empresa llega desde el fondo del túnel (eje Z) y la línea de tiempo
// se dibuja con el scroll; el nodo se enciende cuando su tarjeta llega.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate } from '../fx/env';

gsap.registerPlugin(ScrollTrigger);

export function initExperience() {
  const tunnel = document.getElementById('expTunnel');
  const rail = document.getElementById('expRail');
  const jobs = gsap.utils.toArray<HTMLElement>('#expTunnel [data-job]');
  if (!tunnel || !jobs.length) return;

  if (!canAnimate()) {
    if (rail) gsap.set(rail, { scaleY: 1 });
    jobs.forEach((j) => j.classList.add('is-lit'));
    return;
  }

  if (rail) {
    gsap.to(rail, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tunnel, start: 'top 70%', end: 'bottom 70%', scrub: 0.5 } });
  }

  jobs.forEach((job) => {
    const card = job.querySelector<HTMLElement>('.job-card');
    if (!card) return;
    gsap.fromTo(card,
      { z: -700, rotationX: 14, opacity: 0, transformOrigin: '50% 0%' },
      { z: 0, rotationX: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: job, start: 'top bottom', end: 'top 62%', scrub: 0.7 } });
    ScrollTrigger.create({
      trigger: job, start: 'top 70%',
      onEnter: () => job.classList.add('is-lit'),
      onLeaveBack: () => job.classList.remove('is-lit'),
    });
  });
}
