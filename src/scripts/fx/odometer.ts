// Odómetro 3D: cada dígito es un rodillo que gira hasta su valor, como contador mecánico.
// Lee [data-counter] (+ data-counter-prefix / data-counter-suffix).

import gsap from 'gsap';
import { canAnimate } from './env';

const REEL_LOOPS = 3; // vueltas del rodillo: 0-9 repetido

export function initOdometers(delay = 0.4) {
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter || '0');
    const prefix = el.dataset.counterPrefix || '';
    const suffix = el.dataset.counterSuffix || '';
    const text = Math.round(target).toLocaleString('es-CO');
    const finalLabel = prefix + text + suffix;
    el.setAttribute('aria-label', finalLabel);

    if (!canAnimate()) { el.textContent = finalLabel; return; }

    const cells = [...text].map((ch) => {
      if (!/\d/.test(ch)) return `<span class="odo-sep">${ch}</span>`;
      const digits = Array.from({ length: 10 * REEL_LOOPS }, (_, i) => `<span>${i % 10}</span>`).join('');
      return `<span class="odo-win"><span class="odo-reel" data-digit="${ch}">${digits}</span></span>`;
    }).join('');
    el.innerHTML = `<span aria-hidden="true" class="odo">${prefix ? `<span class="odo-sep">${prefix}</span>` : ''}${cells}${suffix ? `<span class="odo-sep">${suffix}</span>` : ''}</span>`;

    const reels = Array.from(el.querySelectorAll<HTMLElement>('.odo-reel'));
    reels.forEach((reel, i) => {
      const d = Number(reel.dataset.digit);
      const steps = 10 * (REEL_LOOPS - 1) + d; // termina en la última vuelta
      // Los de la derecha giran más rápido y llegan después, como un odómetro real.
      gsap.fromTo(reel,
        { yPercent: 0, rotationX: 0 },
        {
          yPercent: -(steps * 100) / (10 * REEL_LOOPS),
          duration: 1.4 + (reels.length - i) * 0.12,
          delay: delay + i * 0.06,
          ease: 'power4.out',
          onUpdate() {
            // Inclinación 3D proporcional a la velocidad del rodillo.
            const p = this.progress();
            gsap.set(reel, { rotationX: (1 - p) * -38 });
          },
        });
    });
  });
}
