// Contacto: los stickers entran rebotando, flotan, se inclinan con el giroscopio y
// se sacuden con la velocidad del scroll. En desktop reaccionan al hover.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAffordHeavy, canAnimate, isFinePointer } from '../fx/env';
import { onTilt } from '../fx/gyro';

gsap.registerPlugin(ScrollTrigger);

function clusterEntrance() {
  const stickers = gsap.utils.toArray<HTMLElement>('#stickerCluster .stk');
  if (!stickers.length) return;
  stickers.forEach((s) => gsap.set(s, { opacity: 0, scale: 0, rotation: Number(s.dataset.rot) + gsap.utils.random(-25, 25) }));
  ScrollTrigger.create({
    trigger: '#contact', start: 'top 78%', once: true,
    onEnter: () => stickers.forEach((s, i) => {
      const rot = Number(s.dataset.rot);
      gsap.to(s, {
        opacity: 1, scale: 1, rotation: rot, duration: 0.7, ease: 'back.out(2.4)', delay: 0.07 * i,
        onComplete: () => gsap.to(s, { y: -gsap.utils.random(4, 9), rotation: rot + gsap.utils.random(-2.5, 2.5), duration: gsap.utils.random(2.6, 4.1), ease: 'sine.inOut', repeat: -1, yoyo: true }),
      });
    }),
  });
  if (!isFinePointer()) return;
  stickers.forEach((s) => {
    const img = s.querySelector('img');
    if (!img) return;
    s.addEventListener('pointerenter', () => gsap.to(img, { scale: 1.22, rotation: Math.random() > 0.5 ? 10 : -10, duration: 0.22, ease: 'power2.out', overwrite: 'auto' }));
    s.addEventListener('pointerleave', () => gsap.to(img, { scale: 1, rotation: 0, duration: 0.65, ease: 'elastic.out(1,0.38)', overwrite: 'auto' }));
  });
}

/** Giroscopio + velocidad (móvil): cada sticker se mueve según su profundidad. */
function physics() {
  if (!canAffordHeavy() || isFinePointer()) return;
  // Solo los stickers móviles: los de desktop ya tienen flotación y hover propios.
  const items = gsap.utils.toArray<HTMLElement>('#contact .stk-mw').map((el) => {
    return {
      d: parseFloat(el.dataset.depth || '1'),
      x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
      r: gsap.quickTo(el, 'rotation', { duration: 0.6, ease: 'power3.out' }),
    };
  });
  if (!items.length) return;

  onTilt((nx, ny) => items.forEach((it) => { it.x(nx * 22 * it.d); it.y(ny * 14 * it.d); }));

  let settle: ReturnType<typeof setTimeout> | undefined;
  ScrollTrigger.create({
    trigger: '#contact', start: 'top bottom', end: 'bottom top',
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-12, 12, self.getVelocity() / 160);
      items.forEach((it) => it.r(v * it.d));
      clearTimeout(settle);
      settle = setTimeout(() => items.forEach((it) => it.r(0)), 140);
    },
  });
}

export function initContact() {
  if (!canAnimate()) return;
  clusterEntrance();
  physics();
}
