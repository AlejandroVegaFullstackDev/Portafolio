// Idioma de la página: se guarda en localStorage y se refleja en <html data-lang>.
// El CSS oculta .lang-es / .lang-en según ese atributo (styles/base.css).
// El storage puede lanzar (cookies bloqueadas): nunca debe tumbar la página.

export type Lang = 'es' | 'en';
const KEY = 'av_lang';

const isLang = (v: unknown): v is Lang => v === 'es' || v === 'en';

export function getLang(): Lang {
  try {
    const v = localStorage.getItem(KEY);
    if (isLang(v)) return v;
  } catch { /* sin storage */ }
  const attr = document.documentElement.getAttribute('data-lang');
  return isLang(attr) ? attr : 'es';
}

export function setLang(lang: Lang) {
  try { localStorage.setItem(KEY, lang); } catch { /* sin storage: vale para esta página */ }
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
}

/** Conecta el botón ES/EN del header. */
export function initLangToggle() {
  document.documentElement.setAttribute('data-lang', getLang());
  document.getElementById('langToggle')?.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'));
}
