// Orquestador del home: decide QUÉ se inicia y en QUÉ orden. La lógica de cada cosa
// vive en su módulo (lib/client/ = idioma y movimiento, effects/ = efectos, <Componente>.client.ts = uno por componente).
//
// Regla de ScrollTrigger: los triggers se crean en el orden de la página (de arriba
// abajo) porque las secciones pinneadas empujan todo lo que viene después.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getLang, initLangToggle } from '../../lib/client/language';
import { bootSequence, hideBoot } from '../../scripts/core/boot';
import { initMobileMenu } from '../../scripts/core/menu';

import { detectPerformance } from '../../lib/client/motion';
import { initGyro } from './effects/gyro';
import { initScramble } from './effects/scramble';
import { initTypewriter } from './effects/typewriter';
import { initWipes } from './effects/wipe';
import { initCrt } from './effects/crt';
import { createCoverflow } from '../../scripts/fx/coverflow';
import { initLens } from './effects/lens';
import { initSecretTerminal } from '../../scripts/fx/secretTerminal';
import { initMarquees, initScrollProgress, initSpotlight } from './effects/chrome';

import { initHero } from '../../scripts/sections/hero';
import { initNowBand } from '../../scripts/sections/nowBand';
import { initPaperStack } from '../../scripts/sections/blog';
import { initExperience } from '../../scripts/sections/experience';
import { initContact } from '../../scripts/sections/contact';
import { initPlaylistSnake } from '../../scripts/game/snake';
import { initArcade } from '../../scripts/game/arcade';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const coverflow = (id: string, pace?: number) => {
  const el = document.getElementById(id);
  if (el) createCoverflow(el, pace);
};

/** Un init que falla se registra y no corta a los que vienen después. */
const safe = (name: string, fn: () => unknown) => {
  try {
    const r = fn();
    if (r instanceof Promise) r.catch((e) => console.error(`[home] ${name}`, e));
  } catch (e) {
    console.error(`[home] ${name}`, e);
  }
};

async function start() {
  safe('lang', initLangToggle);
  // El menú responde desde el primer momento, sin esperar al arranque.
  safe('menu', initMobileMenu);
  // El modo ahorro mide FPS mientras corre la pantalla de arranque.
  try {
    await Promise.all([bootSequence(), detectPerformance()]);
  } catch (e) {
    console.error('[home] boot', e);
  } finally {
    hideBoot(); // pase lo que pase, el contenido queda visible
  }

  safe('gyro', initGyro);

  // De arriba abajo, en el orden de la página.
  safe('hero', initHero);
  safe('nowBand', initNowBand);
  safe('experience', initExperience);
  safe('projects', () => coverflow('projects', 0.5)); // 3 destacados: corto, sin pantallas vacías
  safe('paperStack', initPaperStack);
  safe('blog', () => coverflow('blog', 0.5)); // pocos posts: el carrusel se recorre en la mitad del scroll
  safe('arcade', () => {
    const snake = initPlaylistSnake().catch((e) => { console.error('[home] snake', e); return null; });
    initArcade(document.getElementById('snake'), snake);
  });
  safe('contact', initContact);

  // Efectos transversales (leen atributos data-* en todo el documento).
  safe('scramble', () => initScramble(getLang));
  safe('typewriter', () => initTypewriter(getLang));
  safe('wipes', initWipes);
  safe('crt', initCrt);

  // Interfaz.
  safe('terminal', initSecretTerminal);
  safe('lens', initLens);
  safe('marquees', initMarquees);
  safe('scrollProgress', initScrollProgress);
  safe('spotlight', initSpotlight);

  ScrollTrigger.sort();
  setTimeout(() => ScrollTrigger.refresh(), 200);
}

start();
