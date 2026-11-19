// Secuencia de arranque tipo consola. Resuelve cuando la pantalla desaparece.
// La pantalla solo se ve si el inline de BootScreen.astro puso html.js-boot.
import gsap from 'gsap';
import { canAnimate } from '../../lib/client/motion';

const LINES = [
  '[ OK ]  loading kernel modules ...',
  '[ OK ]  init: spawning init.d',
  '[ OK ]  mount /home/alejandro',
  '[ OK ]  starting 4ledmt-os',
  '[ OK ]  loading runtime: php · python · node · ts',
  '[ OK ]  loading drivers: postgresql · mysql · bigquery',
  '[ OK ]  authenticating: 4ledmt.dev .....',
  '[ OK ]  ACCESS GRANTED.',
  '',
  '> launching portfolio.exe',
];

const SEEN_KEY = 'av_booted';
const CLASS = 'js-boot';

/** Quita la pantalla de arranque sin animación. */
export function hideBoot() {
  document.documentElement.classList.remove(CLASS);
  const boot = document.getElementById('boot');
  if (boot) boot.style.display = 'none';
}

/** Corre la secuencia solo la primera vez por sesión; después resuelve al instante. */
export function bootSequence(): Promise<void> {
  const boot = document.getElementById('boot');
  const log = document.getElementById('bootLog');
  const shown = document.documentElement.classList.contains(CLASS);
  if (!boot || !log || !shown || !canAnimate()) { hideBoot(); return Promise.resolve(); }
  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* sin storage: se muestra cada vez */ }
  return new Promise((resolve) => {
    let i = 0;
    const finish = () => { hideBoot(); resolve(); };
    const tick = () => {
      if (i >= LINES.length) {
        setTimeout(() => {
          try { gsap.to(boot, { opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: finish }); } catch { finish(); }
        }, 240);
        return;
      }
      const l = document.createElement('div');
      l.textContent = LINES[i++];
      log.appendChild(l);
      setTimeout(tick, 90 + Math.random() * 90);
    };
    tick();
  });
}
