// Secuencia de arranque tipo consola. Resuelve cuando la pantalla desaparece.
import gsap from 'gsap';

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

/** Corre la secuencia solo la primera vez por sesión; después resuelve al instante. */
export function bootSequence(): Promise<void> {
  const boot = document.getElementById('boot');
  const log = document.getElementById('bootLog');
  if (!boot || !log) return Promise.resolve();
  try {
    if (sessionStorage.getItem(SEEN_KEY)) { boot.style.display = 'none'; return Promise.resolve(); }
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch { /* sin storage: se muestra siempre */ }
  return new Promise((resolve) => {
    let i = 0;
    const tick = () => {
      if (i >= LINES.length) {
        setTimeout(() => {
          gsap.to(boot, { opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => { boot.style.display = 'none'; resolve(); } });
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
