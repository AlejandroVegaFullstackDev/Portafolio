// Hero: nombre letra por letra y capas
// [data-depth] que se mueven con el mouse (desktop) o el giroscopio (móvil).
import gsap from 'gsap';
import { canAffordHeavy, canAnimate, isFinePointer } from '../fx/env';
import { onTilt } from '../fx/gyro';

function paintName() {
  const el = document.getElementById('heroName');
  if (!el) return;
  const line = (text: string, tail = '') =>
    `<span class="reveal-wrap" aria-hidden="true"><span class="inline-block">${[...text].map((c) => `<span class="hc">${c}</span>`).join('')}${tail}</span></span>`;
  el.innerHTML = line('ALEJANDRO_') + line('VEGA', '<span class="hc" style="color:var(--accent)">.</span>');
}

function animateIn() {
  if (!canAnimate()) return;
  gsap.from('#heroName .hc', { yPercent: 120, rotateX: -40, duration: 0.9, ease: 'expo.out', stagger: 0.025, delay: 0.1 });
  gsap.from('#hero p', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.7 });
  gsap.from('#hero .cy-btn', { y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'expo.out', delay: 0.9 });

  const bg = document.getElementById('heroBg');
  if (bg) {
    gsap.fromTo(bg, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 0.2, duration: 2.4, ease: 'power2.out', delay: 1.2 });
    gsap.to(bg, { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
  }

  // Ola continua y glitch ocasional del nombre (no en modo ahorro).
  if (!canAffordHeavy()) return;
  const chars = gsap.utils.toArray<HTMLElement>('#heroName .hc');
  gsap.to(chars, { y: -6, duration: 0.88, ease: 'sine.inOut', stagger: { each: 0.065, repeat: -1, yoyo: true }, delay: 1.6 });
  gsap.delayedCall(2.8, () => setInterval(() => {
    if (Math.random() > 0.4) return;
    const picked = chars.filter(() => Math.random() > 0.75);
    gsap.to(picked, {
      x: () => gsap.utils.random(-8, 8), skewX: () => gsap.utils.random(-7, 7), duration: 0.07, ease: 'none',
      onComplete: () => gsap.to(picked, { x: 0, skewX: 0, duration: 0.15, ease: 'power2.out' }),
    });
  }, 2500));
}

/** Parallax por capas: cada [data-depth] se mueve proporcional a su profundidad. */
function initDepth() {
  if (!canAffordHeavy()) return;
  const layers = gsap.utils.toArray<HTMLElement>('#hero [data-depth]').map((el) => ({
    d: parseFloat(el.dataset.depth || '1'),
    x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
    y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
  }));
  const name = document.getElementById('heroName');
  const ry = name ? gsap.quickTo(name, 'rotationY', { duration: 0.9, ease: 'power3.out' }) : null;
  const rx = name ? gsap.quickTo(name, 'rotationX', { duration: 0.9, ease: 'power3.out' }) : null;
  const move = (nx: number, ny: number) => {
    layers.forEach((l) => { l.x(nx * 18 * l.d); l.y(ny * 12 * l.d); });
    ry?.(nx * 10); rx?.(-ny * 8);
  };
  if (isFinePointer()) {
    window.addEventListener('pointermove', (e) => {
      if (window.scrollY > window.innerHeight) return;
      move(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    });
  } else {
    onTilt((nx, ny) => move(nx * 0.6, ny * 0.6));
  }
}

export function initHero() {
  paintName();
  animateIn();
  initDepth();
}
