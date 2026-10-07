// Terminal secreta (easter egg). Se abre escribiendo "sudo" fuera de un campo de
// texto, o tocando 5 veces el logo en menos de 2 s. Esc la cierra.
import gsap from 'gsap';
import { canAnimate } from './env';
import { getLang } from '../core/i18n';

interface TermData {
  name: string;
  title: { es: string; en: string };
  linkedin: string;
  github: string;
  stack: string[];
  projects: { n: string; slug: string; name: { es: string; en: string } }[];
  posts: { slug: string; title: string }[];
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export function initSecretTerminal() {
  const root = document.getElementById('secretTerm');
  const out = document.getElementById('stOut');
  const form = document.getElementById('stForm') as HTMLFormElement | null;
  const input = document.getElementById('stIn') as HTMLInputElement | null;
  const raw = document.getElementById('termData')?.textContent;
  if (!root || !out || !form || !input || !raw) return;
  const data: TermData = JSON.parse(raw);
  let lastFocus: HTMLElement | null = null;

  const print = (html: string, cls = '') => {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  };

  const commands: Record<string, (args: string[]) => void> = {
    help: () => print('comandos: <b>whoami</b> · <b>stack</b> · <b>projects</b> · <b>open &lt;n&gt;</b> · <b>blog</b> · <b>contact</b> · <b>hire</b> · <b>snake</b> · <b>clear</b> · <b>exit</b>'),
    whoami: () => print(`${esc(data.name)} — ${esc(data.title[getLang()])}`),
    stack: () => print(esc(data.stack.join(' · '))),
    projects: () => data.projects.forEach((p) => print(`[${p.n}] ${esc(p.name[getLang()])}`)),
    open: ([n]) => {
      const p = data.projects.find((x) => x.n === n || x.n === n?.padStart(3, '0') || x.slug === n);
      if (!p) return print(`open: no existe "${esc(n || '')}". prueba <b>projects</b>`, 'st-err');
      print(`abriendo ${esc(p.slug)}…`, 'st-dim');
      setTimeout(() => { window.location.href = `/proyecto/${p.slug}`; }, 400);
    },
    blog: () => data.posts.forEach((p) => print(`<a href="/blog/${esc(p.slug)}">${esc(p.title)}</a>`)),
    contact: () => {
      print(`linkedin → <a href="${esc(data.linkedin)}" target="_blank" rel="noopener">${esc(data.linkedin)}</a>`);
      print(`github → <a href="${esc(data.github)}" target="_blank" rel="noopener">${esc(data.github)}</a>`);
    },
    hire: () => {
      print('[sudo] verificando permisos… <b>ACCESS GRANTED</b>');
      print('buena decisión. escríbeme por linkedin y hablamos 🤝', 'st-dim');
    },
    sudo: (args) => (args.length ? run(args.join(' ')) : print('sudo: ya eres root aquí 😎', 'st-dim')),
    snake: () => { print('cargando playlist…', 'st-dim'); close(); document.getElementById('snake')?.scrollIntoView({ behavior: 'smooth' }); },
    clear: () => { out.innerHTML = ''; },
    exit: () => close(),
    'rm': () => print('rm: buen intento. este portafolio tiene backups 🙃', 'st-err'),
  };

  function run(line: string) {
    const [cmd, ...args] = line.trim().split(/\s+/);
    if (!cmd) return;
    print(`<span style="color:var(--accent)">$</span> ${esc(line)}`, 'st-dim');
    (commands[cmd.toLowerCase()] ?? (() => print(`${esc(cmd)}: comando no encontrado. escribe <b>help</b>`, 'st-err')))(args);
  }

  function openTerm() {
    if (!root.hidden) return;
    lastFocus = document.activeElement as HTMLElement;
    root.hidden = false;
    if (!out.childElementCount) {
      print('4ledmt-os v2026 · sesión root', 'st-dim');
      print('escribe <b>help</b> para ver los comandos');
    }
    if (canAnimate()) gsap.fromTo(root.firstElementChild, { scaleY: 0.02, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.45, ease: 'expo.out' });
    input.focus();
  }

  function close() {
    root.hidden = true;
    lastFocus?.focus?.();
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); run(input.value); input.value = ''; });
  root.addEventListener('click', (e) => { if (e.target === root) close(); });

  // Disparadores: escribir "sudo" (fuera de inputs) o 5 toques al logo.
  let buffer = '';
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !root.hidden) return close();
    const t = e.target as HTMLElement;
    if (t.closest('input, textarea, [contenteditable]') || e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-4);
    if (buffer === 'sudo') { buffer = ''; openTerm(); }
  });

  const logo = document.getElementById('logoBtn');
  let taps: number[] = [];
  logo?.addEventListener('click', () => {
    const now = Date.now();
    taps = [...taps.filter((t) => now - t < 2000), now];
    if (taps.length >= 5) { taps = []; openTerm(); }
    else if (taps.length === 1) window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
