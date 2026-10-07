// Efectos 3D de /blog: la palabra BLOG gira con scroll/cursor y las filas entran volteándose.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initBlogIndex() {

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || document.documentElement.getAttribute('data-tweak-anim') === 'off';
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (!reduced) {
    // Palabra BLOG con profundidad: gira con el scroll y con el cursor.
    const word = document.querySelector<HTMLElement>('.blog-bg-word');
    if (word) {
      gsap.set(word, { yPercent: -50, y: 0, rotationY: -28, rotationX: 10, transformOrigin: '100% 50%' });
      gsap.to(word, {
        rotationY: 18, rotationX: -6, ease: 'none',
        scrollTrigger: { trigger: '.blog-header', start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
      if (finePointer) {
        const rz = gsap.quickTo(word, 'rotationZ', { duration: 1, ease: 'power3.out' });
        const zz = gsap.quickTo(word, 'z', { duration: 1, ease: 'power3.out' });
        window.addEventListener('pointermove', (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rz(nx * -4);
          zz(ny * 60);
        });
      }
    }

    // Filas: entran volteándose como hojas.
    const rows = gsap.utils.toArray<HTMLElement>('.post-row');
    gsap.set(rows, { rotationX: -78, y: 40, opacity: 0, transformOrigin: '50% 0%' });
    ScrollTrigger.batch(rows, {
      start: 'top 94%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { rotationX: 0, y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'expo.out' }),
    });

    // Tilt 3D: título y portada se despegan en distintas profundidades.
    if (finePointer) {
      rows.forEach((row) => {
        const title = row.querySelector<HTMLElement>('.post-title');
        const cover = row.querySelector<HTMLElement>('.post-cover-thumb');
        row.addEventListener('pointermove', (e) => {
          const r = row.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(row, { rotationY: nx * 5, rotationX: -ny * 7, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
          if (title) gsap.to(title, { z: 30, x: nx * 8, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
          if (cover) gsap.to(cover, { z: 60, rotationY: nx * -10, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
        });
        row.addEventListener('pointerleave', () => {
          gsap.to(row, { rotationY: 0, rotationX: 0, duration: 0.9, ease: 'elastic.out(1,0.45)', overwrite: 'auto' });
          if (title) gsap.to(title, { z: 0, x: 0, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
          if (cover) gsap.to(cover, { z: 0, rotationY: 0, duration: 0.7, ease: 'expo.out', overwrite: 'auto' });
        });
      });
    }
  }
}
