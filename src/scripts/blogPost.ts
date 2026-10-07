// Interacción de un post: barra de lectura, etiqueta de lenguaje en bloques de
// código e índice lateral con la sección activa.

export function initBlogPost() {
  const bar = document.getElementById('read-bar');
  if (bar) {
    const update = () => {
      const d = document.documentElement;
      bar.style.transform = `scaleX(${d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight)})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  document.querySelectorAll('.prose pre > code[class*="language-"]').forEach((code) => {
    const lang = Array.from(code.classList).find((c) => c.startsWith('language-'))?.replace('language-', '').trim();
    const pre = code.parentElement;
    if (lang && pre instanceof HTMLPreElement) pre.dataset.lang = lang;
  });

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'));
  const headings = links
    .map((l) => document.getElementById(l.dataset.tocLink ?? ''))
    .filter((h): h is HTMLElement => Boolean(h));
  if (!links.length || !headings.length || !('IntersectionObserver' in window)) return;

  const setActive = (id: string) => links.forEach((l) => l.classList.toggle('is-active', l.dataset.tocLink === id));
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target.id) setActive(visible.target.id);
  }, { rootMargin: '-18% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] });
  headings.forEach((h) => io.observe(h));
  setActive(headings[0].id);
}
