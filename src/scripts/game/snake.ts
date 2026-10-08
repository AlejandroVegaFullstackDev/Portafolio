// "Cómete mi playlist": renderer y controles del Snake (motor en snakeEngine.ts).
// La comida son carátulas de lo último que escuché en Spotify; el cuerpo se arma
// con las que te comes. Funciona sin Spotify (comida genérica) y sin sonido.
import { createGame, step, tickMs, turn, type Dir, type SnakeState } from './snakeEngine';
import { PreviewPlayer } from './previewPlayer';
import { Ranking } from './ranking';
import { mulberry32 } from './prng';
import type { Move } from './replay';

interface Track { id: string; title: string; artist: string; cover: string | null; uri: string; url: string; preview: string | null }

const BEST_KEY = 'av_snake_best';
const SIZE = 16;
const KEYS: Record<string, Dir> = {
  ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
  w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
};

const store = {
  get: () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; } },
  set: (v: number) => { try { localStorage.setItem(BEST_KEY, String(v)); } catch { /* sin storage */ } },
};
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));

export async function initPlaylistSnake() {
  const root = document.getElementById('snake');
  const canvas = root?.querySelector<HTMLCanvasElement>('[data-snake-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!root || !canvas || !ctx) return;

  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const overlay = $('[data-snake-overlay]')!;
  const overlayTitle = $('[data-snake-overlay-title]')!;
  const overlayBtn = $<HTMLButtonElement>('[data-snake-start]')!;
  const scoreEl = $('[data-snake-score]')!;
  const bestEl = $('[data-snake-best]')!;
  const list = $('[data-snake-list]')!;
  const soundBtn = $<HTMLButtonElement>('[data-snake-sound]')!;
  const nowEl = $('[data-snake-now]')!;
  const nowTitle = $('[data-snake-now-title]')!;

  // ── Datos ──
  let tracks: Track[] = [];
  try {
    const res = await fetch('/api/playlist-snake');
    if (res.ok) {
      const data = (await res.json()) as { tracks: Track[]; source?: string; status?: unknown };
      tracks = data.tracks ?? [];
      // Diagnóstico visible en la consola del navegador (no expone secretos).
      if (!tracks.length) console.info('[snake] sin canciones de Spotify:', data.status);
    }
  } catch { /* sin Spotify: comida genérica */ }
  const covers = tracks.map((t) => {
    if (!t.cover) return null;
    const img = new Image();
    img.decoding = 'async';
    img.src = t.cover;
    return img;
  });
  root.classList.toggle('has-music', tracks.length > 0);

  // ── Estado ──
  let game: SnakeState = createGame(SIZE, tracks.length);
  // Ranking: semilla del servidor + registro de giros para que pueda repetir la partida.
  let rand: () => number = Math.random;
  let moves: Move[] = [];
  let ticks = 0;
  const ranking = new Ranking($('[data-lb-global]')!, $('[data-lb-local]')!, $('[data-lb-off]')!);
  ranking.load();
  const form = $<HTMLFormElement>('[data-lb-form]')!;
  const nameInput = $<HTMLInputElement>('[data-lb-name]')!;
  const lbMsg = $('[data-lb-msg]')!;
  const doTurn = (d: Dir) => { if (!running) return; moves.push([ticks, d]); turn(game, d); };
  let running = false;
  let paused = false;
  let best = store.get();
  let acc = 0;
  let last = 0;
  let flash = 0;
  let soundOn = false;
  const player = new PreviewPlayer();
  player.onChange = (title) => { nowEl.hidden = !title; nowTitle.textContent = title ?? ''; };
  bestEl.textContent = String(best);

  // ── Tamaño (nítido en pantallas retina) ──
  let cell = 20;
  const resize = () => {
    const w = canvas.parentElement!.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cell = Math.floor(w / SIZE);
    const px = cell * SIZE;
    canvas.style.width = canvas.style.height = `${px}px`;
    canvas.width = canvas.height = px * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };

  // ── Dibujo ──
  const css = (v: string) => getComputedStyle(root).getPropertyValue(v).trim();
  function tile(img: HTMLImageElement | null | undefined, x: number, y: number, pad: number, fallback: string) {
    const px = x * cell + pad, py = y * cell + pad, s = cell - pad * 2;
    if (img && img.complete && img.naturalWidth) ctx!.drawImage(img, px, py, s, s);
    else { ctx!.fillStyle = fallback; ctx!.fillRect(px, py, s, s); }
  }
  function draw() {
    const accent = css('--accent') || '#ff003c';
    const line = css('--line') || '#1c1c24';
    const panel = css('--panel') || '#0f0f14';
    const size = cell * SIZE;
    ctx!.clearRect(0, 0, size, size);
    ctx!.strokeStyle = line;
    ctx!.lineWidth = 1;
    for (let i = 1; i < SIZE; i++) {
      ctx!.beginPath(); ctx!.moveTo(i * cell + 0.5, 0); ctx!.lineTo(i * cell + 0.5, size); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(0, i * cell + 0.5); ctx!.lineTo(size, i * cell + 0.5); ctx!.stroke();
    }
    // Comida: la carátula de la siguiente canción, con un pulso de acento.
    const f = game.food;
    const pulse = 1 + Math.sin(performance.now() / 180) * 1.5;
    ctx!.strokeStyle = accent;
    ctx!.lineWidth = 2;
    ctx!.strokeRect(f.x * cell + 1 - pulse, f.y * cell + 1 - pulse, cell - 2 + pulse * 2, cell - 2 + pulse * 2);
    tile(covers[f.item], f.x, f.y, 2, accent);
    // Cuerpo: carátulas comidas (la más reciente pegada a la cabeza).
    game.snake.forEach((c, i) => {
      if (i === 0) return;
      const eatenIdx = game.eaten[game.eaten.length - i];
      tile(eatenIdx !== undefined ? covers[eatenIdx] : null, c.x, c.y, 1, panel);
      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 1;
      ctx!.strokeRect(c.x * cell + 1.5, c.y * cell + 1.5, cell - 3, cell - 3);
    });
    // Cabeza
    const h = game.snake[0];
    ctx!.fillStyle = flash > 0 ? '#ffffff' : accent;
    ctx!.fillRect(h.x * cell + 1, h.y * cell + 1, cell - 2, cell - 2);
    ctx!.fillStyle = '#000';
    const e = Math.max(2, cell / 7);
    const ex = game.dir === 'left' ? 0.28 : game.dir === 'right' ? 0.72 : 0.3;
    const ey = game.dir === 'up' ? 0.28 : game.dir === 'down' ? 0.72 : 0.3;
    if (game.dir === 'up' || game.dir === 'down') {
      ctx!.fillRect(h.x * cell + cell * 0.3 - e / 2, h.y * cell + cell * ey - e / 2, e, e);
      ctx!.fillRect(h.x * cell + cell * 0.7 - e / 2, h.y * cell + cell * ey - e / 2, e, e);
    } else {
      ctx!.fillRect(h.x * cell + cell * ex - e / 2, h.y * cell + cell * 0.3 - e / 2, e, e);
      ctx!.fillRect(h.x * cell + cell * ex - e / 2, h.y * cell + cell * 0.7 - e / 2, e, e);
    }
  }

  // ── Eventos del juego ──
  function onEat() {
    flash = 3;
    scoreEl.textContent = String(game.score);
    try { if ('vibrate' in navigator) navigator.vibrate(15); } catch { /* sin háptica */ }
    const t = tracks[game.eaten[game.eaten.length - 1]];
    if (!t) return;
    const li = document.createElement('li');
    li.innerHTML = `${t.cover ? `<img src="${esc(t.cover)}" alt="" width="40" height="40" loading="lazy" />` : '<span class="ph"></span>'}
      <span class="meta"><a href="${esc(t.url)}" target="_blank" rel="noopener">${esc(t.title)}</a><span>${esc(t.artist)}</span></span>`;
    list.prepend(li);
    if (soundOn) {
      player.play(t);
      player.preload(tracks[game.food.item]); // la siguiente ya queda descargándose
    }
  }

  function onOver() {
    running = false;
    root.classList.remove('is-playing');
    if (game.score > best) { best = game.score; store.set(best); bestEl.textContent = String(best); }
    overlayTitle.textContent = overlayTitle.dataset[document.documentElement.getAttribute('data-lang') === 'en' ? 'overEn' : 'overEs']!.replace('{n}', String(game.score));
    overlayBtn.textContent = overlayBtn.dataset[document.documentElement.getAttribute('data-lang') === 'en' ? 'againEn' : 'againEs']!;
    overlay.hidden = false;
    ranking.recordLocal(game.score);
    if (ranking.ranked && game.score > 0) {
      form.hidden = false;
      lbMsg.textContent = '';
      nameInput.value = ranking.savedName;
      nameInput.focus({ preventScroll: true });
    } else overlayBtn.focus({ preventScroll: true });
  }

  async function start() {
    overlayBtn.disabled = true;
    const seed = await ranking.begin();
    overlayBtn.disabled = false;
    rand = seed === null ? Math.random : mulberry32(seed);
    moves = [];
    ticks = 0;
    form.hidden = true;
    game = createGame(SIZE, tracks.length, rand);
    list.replaceChildren();
    scoreEl.textContent = '0';
    overlay.hidden = true;
    running = true;
    paused = false;
    root.classList.add('is-playing');
    if (soundOn) player.preload(tracks[game.food.item]);
    acc = 0;
    last = performance.now();
    canvas.focus({ preventScroll: true });
  }

  function pause() {
    if (!running) return;
    running = false;
    paused = true;
    root.classList.remove('is-playing');
    overlayTitle.textContent = overlayTitle.dataset[document.documentElement.getAttribute('data-lang') === 'en' ? 'pauseEn' : 'pauseEs']!;
    overlayBtn.textContent = overlayBtn.dataset[document.documentElement.getAttribute('data-lang') === 'en' ? 'resumeEn' : 'resumeEs']!;
    overlay.hidden = false;
  }

  // ── Bucle ──
  function frame(now: number) {
    if (running) {
      acc += now - last;
      const ms = tickMs(game.score);
      while (acc >= ms && running) {
        acc -= ms;
        ticks++;
        const r = step(game, rand);
        if (r === 'ate') onEat();
        else if (r === 'over') onOver();
      }
    }
    last = now;
    if (flash > 0) flash--;
    draw();
    requestAnimationFrame(frame);
  }

  // ── Controles ──
  overlayBtn.addEventListener('click', () => {
    if (paused) { paused = false; running = true; root.classList.add('is-playing'); overlay.hidden = true; last = performance.now(); canvas.focus({ preventScroll: true }); return; }
    start();
  });
  // Teclado: solo mientras se juega, para no robarle el scroll a la página.
  window.addEventListener('keydown', (e) => {
    if (!running) return;
    if (e.key === ' ' || e.key === 'Escape') { e.preventDefault(); pause(); return; }
    const d = KEYS[e.key];
    if (d) { e.preventDefault(); doTurn(d); }
  });
  // Swipe en toda la card: gira apenas el dedo recorre ~22 px (sin esperar a soltar) y
  // se pueden encadenar giros en el mismo gesto. Mientras se juega, la página no
  // hace scroll al deslizar sobre el tablero (por eso passive: false).
  const pad = root.querySelector<HTMLElement>('[data-snake-pad]') ?? canvas;
  const SWIPE = 22;
  let sx = 0, sy = 0, tracking = false;
  pad.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    sx = t.clientX; sy = t.clientY; tracking = true;
  }, { passive: true });
  pad.addEventListener('touchmove', (e) => {
    if (!running || !tracking) return;
    e.preventDefault();
    const t = e.touches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE) return;
    doTurn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
    sx = t.clientX; sy = t.clientY;
  }, { passive: false });
  pad.addEventListener('touchend', () => { tracking = false; });
  // Mouse: arrastrar también sirve (útil para probar en desktop).
  canvas.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') { sx = e.clientX; sy = e.clientY; } });
  canvas.addEventListener('pointerup', (e) => {
    if (e.pointerType !== 'mouse' || !running) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE) return;
    doTurn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  });
  // Sonido opcional (el reproductor se crea con el toque del usuario).
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.setAttribute('aria-pressed', String(soundOn));
    root.classList.toggle('sound-on', soundOn);
    if (soundOn) {
      player.unlock(); // dentro del toque: habilita el audio en iOS/Safari
      setTimeout(() => player.preload(tracks[game.food.item]), 150);
    } else player.stop();
  });
  $('[data-snake-stop]')?.addEventListener('click', () => player.stop());
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button')!;
    btn.disabled = true;
    const res = await ranking.submit(nameInput.value.trim(), moves, ticks);
    btn.disabled = false;
    const en = document.documentElement.getAttribute('data-lang') === 'en';
    if (res === 'name') { lbMsg.textContent = en ? 'Use 2–16 letters or numbers.' : 'Usa de 2 a 16 letras o números.'; return; }
    form.hidden = true;
    overlayTitle.textContent += res.startsWith('#') ? ` · ${en ? 'global' : 'puesto'} ${res}` : '';
    if (res === 'error') overlayTitle.textContent += en ? ' · not saved' : ' · no se guardó';
  });
  // Pausa si cambias de pestaña o sales de la sección.
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { if (!e.isIntersecting) pause(); }, { threshold: 0.25 }).observe(canvas);
    // El widget flotante de Spotify tapaba los controles en el cel.
    const widget = document.getElementById('spWidget');
    if (widget) new IntersectionObserver(([e]) => widget.classList.toggle('sp-away', e.isIntersecting), { threshold: 0.05 }).observe(root);
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(canvas.parentElement!);
  else addEventListener('resize', resize);

  resize();
  requestAnimationFrame(frame);
}
