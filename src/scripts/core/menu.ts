// Menú móvil 3D: las opciones caen como cartas. Esc o un enlace lo cierran.
import gsap from 'gsap';
import { canAnimate } from '../fx/env';

export function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  const cards = Array.from(menu.querySelectorAll<HTMLElement>('[data-mm-card]'));
  let open = false;

  const setOpen = (next: boolean) => {
    if (next === open) return;
    open = next;
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    btn.textContent = open ? '✕' : '≡';
    document.documentElement.style.overflow = open ? 'hidden' : '';

    if (open) {
      menu.hidden = false;
      if (canAnimate()) {
        gsap.fromTo(menu, { clipPath: 'circle(0% at 100% 0%)' }, { clipPath: 'circle(150% at 100% 0%)', duration: 0.6, ease: 'expo.out' });
        gsap.fromTo(cards, { rotationX: -95, y: -30, opacity: 0 }, { rotationX: 0, y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'expo.out', delay: 0.08 });
      }
      cards[0]?.focus({ preventScroll: true });
    } else {
      const done = () => { menu.hidden = true; gsap.set([menu, ...cards], { clearProps: 'all' }); };
      if (!canAnimate()) return done();
      gsap.to(cards, { rotationX: 70, y: 20, opacity: 0, duration: 0.3, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' });
      gsap.to(menu, { clipPath: 'circle(0% at 100% 0%)', duration: 0.45, ease: 'power3.in', delay: 0.15, onComplete: done });
    }
  };

  btn.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { setOpen(false); btn.focus(); } });
}
