// Orquestador del home: decide QUÉ se inicia y en QUÉ orden. La lógica de cada cosa
// vive en su módulo (core/ = infraestructura, sections/ = una por sección, fx/ = efectos).
//
// Regla de ScrollTrigger: los triggers se crean en el orden de la página (de arriba
// abajo) porque las secciones pinneadas empujan todo lo que viene después.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getLang, initLangToggle } from './core/i18n';
import { bootSequence } from './core/boot';
import { initMobileMenu } from './core/menu';

import { detectPerformance } from './fx/env';
import { initGyro } from './fx/gyro';
import { initScramble } from './fx/scramble';
import { initTypewriter } from './fx/typewriter';
import { initWipes } from './fx/wipe';
import { initCrt } from './fx/crt';
import { createCoverflow } from './fx/coverflow';
import { initLens } from './fx/lens';
import { initSecretTerminal } from './fx/secretTerminal';
import { initMarquees, initScrollProgress, initSpotlight } from './fx/chrome';

import { initHero } from './sections/hero';
import { initNowBand } from './sections/nowBand';
import { initPaperStack } from './sections/blog';
import { initExperience } from './sections/experience';
import { initContact } from './sections/contact';
import { initPlaylistSnake } from './game/snake';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const coverflow = (id: string, pace?: number) => {
  const el = document.getElementById(id);
  if (el) createCoverflow(el, pace);
};

async function start() {
  initLangToggle();
  // El modo ahorro mide FPS mientras corre la pantalla de arranque.
  await Promise.all([bootSequence(), detectPerformance()]);

  initGyro();

  // De arriba abajo, en el orden de la página.
  initHero();
  initNowBand();
  initExperience();
  initPaperStack();
  coverflow('blog', 0.5); // pocos posts: el carrusel se recorre en la mitad del scroll
  initPlaylistSnake();
  initContact();

  // Efectos transversales (leen atributos data-* en todo el documento).
  initScramble(getLang);
  initTypewriter(getLang);
  initWipes();
  initCrt();

  // Interfaz.
  initMobileMenu();
  initSecretTerminal();
  initLens();
  initMarquees();
  initScrollProgress();
  initSpotlight();

  ScrollTrigger.sort();
  setTimeout(() => ScrollTrigger.refresh(), 200);
}

start();
