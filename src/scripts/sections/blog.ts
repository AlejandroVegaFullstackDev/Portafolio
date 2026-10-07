// Blog: pila de hojas 3D de la intro. Se abre en abanico justo antes de que la
// sección se pinee; flota, sigue al mouse o al giroscopio, y la hoja del frente
// se levanta al pasar el cursor. El carrusel lo maneja fx/coverflow.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAnimate, isFinePointer } from '../fx/env';
import { onTilt } from '../fx/gyro';

gsap.registerPlugin(ScrollTrigger);

const FANNED = {
  rig: { rotationX: 12, rotationY: -24, rotationZ: -4 },
  page: (i: number) => ({ z: -i * 44, x: -i * 20, y: -i * 12, rotationZ: -i * 5 }),
};

export function initPaperStack() {
  const stage = document.getElementById('paperStage');
  const float = document.getElementById('paperFloat');
  const rig = document.getElementById('paperRig');
  const tilt = document.getElementById('paperTilt');
  const shadow = document.getElementById('paperShadow');
  const pages = gsap.utils.toArray<HTMLElement>('#paperTilt .paper');
  if (!stage || !rig || !tilt || !pages.length) return;

  if (!canAnimate()) {
    gsap.set(rig, FANNED.rig);
    pages.forEach((p, i) => gsap.set(p, FANNED.page(i)));
    return;
  }

  // Cerrada y acostada, como sobre un escritorio.
  gsap.set(rig, { rotationX: 62, rotationY: 0, rotationZ: -28 });
  pages.forEach((p, i) => gsap.set(p, { z: -i * 3, x: 0, y: 0, rotationZ: 0 }));
  if (shadow) gsap.set(shadow, { scaleX: 0.7, opacity: 0.5 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: '#blog', start: 'top 85%', end: 'top top', scrub: 0.9 },
    defaults: { ease: 'none' },
  });
  tl.to(rig, FANNED.rig, 0);
  pages.forEach((p, i) => tl.to(p, FANNED.page(i), 0));
  if (shadow) tl.to(shadow, { scaleX: 1.15, opacity: 1 }, 0);

  if (float) gsap.to(float, { y: -10, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true });

  const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  if (isFinePointer()) {
    const section = document.getElementById('blog');
    section?.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      ry(gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)) * 18);
      rx(-gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)) * 12);
    });
    section?.addEventListener('pointerleave', () => { rx(0); ry(0); });
  } else {
    onTilt((nx, ny) => { ry(nx * 22); rx(-ny * 16); });
  }

  const front = pages[0];
  const lift = () => gsap.to(front, { z: 46, rotationX: -6, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
  const drop = () => gsap.to(front, { z: 0, rotationX: 0, duration: 0.7, ease: 'expo.out', overwrite: 'auto' });
  stage.addEventListener('pointerenter', lift);
  stage.addEventListener('pointerleave', drop);
  stage.addEventListener('focus', lift);
  stage.addEventListener('blur', drop);
}
