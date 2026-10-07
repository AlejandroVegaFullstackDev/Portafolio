// Eventos de analítica sin cookies (Vercel Analytics). Cualquier elemento con
// data-track="nombre" envía ese evento al hacer clic; data-track-lang lo etiqueta.
// Ej.: <a data-track="cv_download" data-track-lang="es">.
import { track } from '@vercel/analytics';

export function initTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el?.dataset.track) return;
    const props: Record<string, string> = { path: location.pathname };
    if (el.dataset.trackLang) props.lang = el.dataset.trackLang;
    try { track(el.dataset.track, props); } catch { /* la analítica nunca debe romper la página */ }
  });
}
