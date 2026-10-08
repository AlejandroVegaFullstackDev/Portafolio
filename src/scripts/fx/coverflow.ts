// Coverflow horizontal pinneado: bajas → la sección queda fija y el track avanza
// a la derecha. Lo usan Blog y Proyectos (DRY): mismo motor, distinto contenido.
//
// Contrato de markup (dentro de la sección):
//   .hs-viewport > .hs-track > [data-hs-slide] > .hs-inner
//   opcionales: [data-hs-bg="a"|"b"], .hs-speedlines, [data-hs-index], [data-hs-bar]
//   en cada slide: .hs-media, .hs-media img | .hs-bignum, .hs-title | .hs-end-title,
//   .hs-meta, .hs-desc, .hs-tags, .hs-cta, .hs-end-kicker, .hs-end .cy-btn

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { canAffordHeavy, isFinePointer } from './env';
import { crtFlash } from './crt';
import { onTilt } from './gyro';

gsap.registerPlugin(ScrollTrigger);

const pad = (n: number) => String(n).padStart(2, '0');

/** Parte un texto en palabras → letras; las palabras no se cortan al envolver.
 *  Si el título trae versiones por idioma (.lang-es / .lang-en), parte cada una por
 *  separado para no juntarlas en un solo texto. */
function splitChars(el: HTMLElement) {
  if (el.dataset.split) return el.querySelectorAll<HTMLElement>('.hs-char');
  el.dataset.split = '1';
  const langs = el.querySelectorAll<HTMLElement>(':scope > .lang-es, :scope > .lang-en');
  const targets = langs.length ? [...langs] : [el];
  for (const t of targets) {
    const text = (t.textContent || '').trim();
    t.setAttribute('aria-label', text);
    t.innerHTML = text.split(/\s+/).map((w) =>
      `<span class="hs-word" aria-hidden="true">${[...w].map((c) => `<span class="hs-char">${c}</span>`).join('')}</span>`
    ).join(' ');
  }
  return el.querySelectorAll<HTMLElement>('.hs-char');
}

/** Glitch RGB corto al cruzar el centro. */
function glitch(el: HTMLElement) {
  gsap.timeline()
    .to(el, { x: -7, textShadow: '4px 0 rgba(255,0,60,0.9), -4px 0 rgba(0,210,255,0.85)', duration: 0.05, ease: 'none' })
    .to(el, { x: 5, skewX: -6, duration: 0.05, ease: 'none' })
    .to(el, { x: -2, skewX: 3, textShadow: '-3px 0 rgba(255,0,60,0.9), 3px 0 rgba(0,210,255,0.85)', duration: 0.05, ease: 'none' })
    .to(el, { x: 0, skewX: 0, textShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3, ease: 'expo.out' });
}

export interface Coverflow {
  tween: gsap.core.Tween;
}

/** `pace`: cuánto scroll vertical cuesta el recorrido horizontal (1 = lo mismo; 0.5 = la mitad). */
export function createCoverflow(section: HTMLElement, pace = 1): Coverflow | null {
  const viewport = section.querySelector<HTMLElement>('.hs-viewport');
  const track = section.querySelector<HTMLElement>('.hs-track');
  const slides = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('[data-hs-slide]'));
  if (!viewport || !track || slides.length < 2) return null;

  const bar = section.querySelector<HTMLElement>('[data-hs-bar]');
  const idx = section.querySelector<HTMLElement>('[data-hs-index]');
  const bgA = section.querySelector<HTMLElement>('[data-hs-bg="a"]');
  const bgB = section.querySelector<HTMLElement>('[data-hs-bg="b"]');
  const speed = section.querySelector<HTMLElement>('.hs-speedlines');
  const heavy = canAffordHeavy();
  const fine = isFinePointer();

  section.classList.add('is-pinned');
  viewport.scrollLeft = 0;

  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
  // El blur cuesta FPS: solo en desktop con modo full.
  const soft = (px: number) => (heavy && fine ? { filter: `blur(${px}px)` } : {});

  // Progreso (0..1) en el que cada diapositiva queda centrada → snap y contador.
  let stops: number[] = [];
  const computeStops = () => {
    const d = distance() || 1;
    stops = slides.map((sl) => gsap.utils.clamp(0, 1, (sl.offsetLeft + sl.offsetWidth / 2 - viewport.clientWidth / 2) / d));
  };
  const nearest = (v: number) => stops.reduce((best, s, i) => (Math.abs(s - v) < Math.abs(stops[best] - v) ? i : best), 0);

  let lastIndex = 0;
  const haptic = () => {
    try { if (!fine && 'vibrate' in navigator) navigator.vibrate(12); } catch { /* sin háptica */ }
  };

  const skewTo = heavy ? gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' }) : null;
  const speedTo = heavy && speed ? gsap.quickTo(speed, 'opacity', { duration: 0.4, ease: 'power2.out' }) : null;
  let settle: ReturnType<typeof setTimeout> | undefined;

  const tween = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + distance() * pace,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: computeStops,
      snap: {
        snapTo: (v: number) => (stops.length ? stops[nearest(v)] : v),
        duration: { min: 0.25, max: 0.7 },
        delay: 0.08,
        ease: 'power3.inOut',
      },
      onUpdate: (self) => {
        if (bar) gsap.set(bar, { scaleX: self.progress });
        const i = nearest(self.progress);
        if (idx) idx.textContent = pad(i + 1);
        if (i !== lastIndex) { lastIndex = i; haptic(); }
        if (skewTo) {
          const v = self.getVelocity();
          skewTo(gsap.utils.clamp(-7, 7, v / -280));
          speedTo?.(gsap.utils.clamp(0, 1, Math.abs(v) / 2200));
          clearTimeout(settle);
          settle = setTimeout(() => { skewTo(0); speedTo?.(0); }, 120);
        }
      },
    },
  });
  computeStops();

  // Fondo vivo: dos capas en parallax opuesto.
  const bgTrigger = () => ({ trigger: section, start: 'top top', end: () => '+=' + distance() * pace, scrub: 1.2, invalidateOnRefresh: true });
  if (bgA) gsap.fromTo(bgA, { xPercent: 0 }, { xPercent: -28, ease: 'none', scrollTrigger: bgTrigger() });
  if (bgB) gsap.fromTo(bgB, { xPercent: -30 }, { xPercent: 0, ease: 'none', scrollTrigger: bgTrigger() });

  const along = (slide: HTMLElement, start: string, end: string) => ({
    trigger: slide, containerAnimation: tween, start, end, scrub: true,
  });

  slides.forEach((slide, i) => {
    const inner = slide.querySelector<HTMLElement>('.hs-inner');
    if (!inner) return;
    const isLast = i === slides.length - 1;
    const isIntro = slide.hasAttribute('data-hs-intro');

    if (isIntro) {
      // La intro se hunde en profundidad mientras entra la primera diapositiva.
      gsap.to(inner, {
        rotationY: -32, z: -340, opacity: 0.1, ...soft(4), ease: 'none', transformOrigin: '0% 50%',
        scrollTrigger: along(slide, 'left left', 'right left'),
      });
      return;
    }

    const enterEnd = isLast ? 'right 95%' : 'center center';

    // Coverflow: entra girada desde el fondo, se planta de frente, sale girando.
    gsap.fromTo(inner,
      { rotationY: 46, z: -380, opacity: 0.15, ...soft(6), transformOrigin: '50% 50%' },
      { rotationY: 0, z: 0, opacity: 1, ...soft(0), ease: 'none', scrollTrigger: along(slide, 'left right', enterEnd) });
    if (!isLast) {
      gsap.to(inner, {
        rotationY: -46, z: -380, opacity: 0.15, ...soft(6), ease: 'none', immediateRender: false,
        scrollTrigger: along(slide, 'center center', 'right left'),
      });
    }

    // Portada: wipe con clip-path + parallax interno.
    const mediaBox = slide.querySelector<HTMLElement>('.hs-media');
    if (mediaBox) {
      gsap.fromTo(mediaBox, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: along(slide, 'left 95%', 'center 62%') });
    }
    const media = slide.querySelector<HTMLElement>('.hs-media img, .hs-bignum');
    if (media) {
      gsap.fromTo(media, { xPercent: -9, scale: 1.2 }, { xPercent: 9, scale: 1.08, ease: 'none', scrollTrigger: along(slide, 'left right', 'right left') });
    }

    // Título: se arma letra por letra en 3D (si tiene acento de color, entra entero).
    const title = slide.querySelector<HTMLElement>('.hs-title, .hs-end-title');
    if (title && !title.querySelector('.text-\\[var\\(--accent\\)\\]')) {
      gsap.fromTo(splitChars(title),
        { rotationX: -95, y: 36, z: -60, opacity: 0 },
        { rotationX: 0, y: 0, z: 0, opacity: 1, stagger: 0.03, ease: 'none', scrollTrigger: along(slide, 'left 80%', isLast ? 'right 95%' : 'center 58%') });
    } else if (title) {
      gsap.fromTo(title, { rotationX: -70, y: 40, opacity: 0, transformOrigin: '50% 100%' },
        { rotationX: 0, y: 0, opacity: 1, ease: 'none', scrollTrigger: along(slide, 'left 85%', 'right 95%') });
    }

    // Resto del texto: llega en capas, un poco después que la tarjeta.
    const copy = slide.querySelectorAll<HTMLElement>('.hs-meta, .hs-desc, .hs-tags, .hs-cta, .hs-end-kicker, .hs-end-list, .hs-end .cy-btn');
    if (copy.length) {
      gsap.fromTo(copy, { x: 80, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.08, ease: 'none',
        scrollTrigger: along(slide, 'left 85%', isLast ? 'right 95%' : 'center 55%'),
      });
    }

    // Al cruzar el centro: glitch RGB en el título + encendido CRT de la portada.
    ScrollTrigger.create({
      trigger: slide, containerAnimation: tween, start: 'center 55%', end: 'center 45%',
      onEnter: () => { if (title) glitch(title); if (mediaBox) crtFlash(mediaBox); },
      onEnterBack: () => { if (title) glitch(title); if (mediaBox) crtFlash(mediaBox); },
    });

    // Desktop: tilt sobre la diapositiva (no choca con el scrub del inner).
    if (fine && slide.matches('a')) {
      slide.addEventListener('pointermove', (e) => {
        const r = slide.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(slide, { rotationY: nx * 7, rotationX: -ny * 6, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
      });
      slide.addEventListener('pointerleave', () => {
        gsap.to(slide, { rotationY: 0, rotationX: 0, duration: 0.9, ease: 'elastic.out(1,0.45)', overwrite: 'auto' });
      });
    }
  });

  // Teclado: si el foco cae en una diapositiva, se lleva el scroll hasta ella.
  slides.forEach((slide, i) => {
    slide.addEventListener('focusin', () => {
      const st = tween.scrollTrigger;
      if (!st) return;
      window.scrollTo({ top: st.start + (st.end - st.start) * (stops[i] ?? 0), behavior: 'smooth' });
    });
  });

  // Giroscopio: inclinar el cel mueve el punto de fuga de todo el 3D.
  if (!fine && heavy) {
    gsap.set(viewport, { '--po-x': 50, '--po-y': 50 });
    const ox = gsap.quickTo(viewport, '--po-x', { duration: 0.6, ease: 'power3.out' });
    const oy = gsap.quickTo(viewport, '--po-y', { duration: 0.6, ease: 'power3.out' });
    onTilt((nx, ny) => { ox(50 - nx * 30); oy(50 - ny * 25); });
  }

  return { tween };
}
