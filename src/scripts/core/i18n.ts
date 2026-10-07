// Idioma de la página: se guarda en localStorage y se refleja en <html data-lang>.
// El CSS oculta .lang-es / .lang-en según ese atributo (styles/base.css).

export type Lang = 'es' | 'en';
const KEY = 'av_lang';
const listeners = new Set<(lang: Lang) => void>();

export const getLang = (): Lang => (localStorage.getItem(KEY) as Lang) || 'es';

export function setLang(lang: Lang) {
  localStorage.setItem(KEY, lang);
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang);
  listeners.forEach((fn) => fn(lang));
}

export const onLangChange = (fn: (lang: Lang) => void) => listeners.add(fn);

/** Conecta el botón ES/EN del header. */
export function initLangToggle() {
  document.documentElement.setAttribute('data-lang', getLang());
  document.getElementById('langToggle')?.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'));
}
