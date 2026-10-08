// Juego de bloques de la consola: dibujo neón, controles y estados (listo/pausa/fin).
// Motor: ./engine.ts. Comparte con el Snake la música, el tocadiscos, el modo juego y
// la barra de puntos (ArcadeShared). Cada línea completa cambia de canción.
import { COLS, ROWS, TYPES, cellsOf, createBlocks, dropY, gravityMs, hardDrop, move, previewCells, rotate, step, type BlocksState, type PieceType } from './engine';
import type { ArcadeShared } from '../snake';
import { canAnimate } from '../../fx/env';
import { tr } from '../snakeUi';

const BEST_KEY = 'av_blocks_best';
const COLORS: Record<PieceType, string> = { I: '#00f0ff', O: '#fcee0a', T: '#b026ff', S: '#39ff88', Z: '#ff003c', J: '#3a86ff', L: '#ff8a00' };
const ls = {
  get: () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; } },
  set: (v: number) => { try { localStorage.setItem(BEST_KEY, String(v)); } catch { /* sin storage */ } },
};

/** Lo que la consola necesita de cada juego para cambiar de pestaña. */
export interface GameHandle { activate: () => void; deactivate: () => void }

export function initBlocks(shared: ArcadeShared): GameHandle | null {
  const { root, tracks, player, deck, focus } = shared;
  const board = root.querySelector<HTMLElement>('[data-game-board="blocks"]');
  const canvas = board?.querySelector<HTMLCanvasElement>('[data-blocks-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!board || !canvas || !ctx) return null;
  const overlay = board.querySelector<HTMLElement>('[data-blocks-overlay]')!;
  const overTitle = board.querySelector<HTMLElement>('[data-blocks-over-title]')!;
  const overResult = board.querySelector<HTMLElement>('[data-blocks-over-result]')!;
  const scoreEl = root.querySelector<HTMLElement>('[data-snake-score]')!;
  const bestEl = root.querySelector<HTMLElement>('[data-snake-best]')!;
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-snake-pause]')!;

  let s: BlocksState = createBlocks();
  let running = false, active = false;
  let best = ls.get();
  let acc = 0, last = 0, softHeld = false;
  let flashRows: number[] = [], flashT = 0;
  let song = Math.floor(Math.random() * Math.max(1, tracks.length));
  let cell = 20, ox = 0, oy = 0, size = 0;

  const hud = () => { scoreEl.textContent = String(s.score); bestEl.textContent = String(best); };
  const state = (st: 'ready' | 'paused' | 'over' | 'none') => {
    overlay.hidden = st === 'none';
    overlay.dataset.state = st;
    pauseBtn.hidden = st !== 'none';
  };

  // ── Música: suena una canción; cada línea completa pasa a la siguiente ──
  const current = () => tracks[song % Math.max(1, tracks.length)];
  function playSong() {
    const t = current();
    if (!t) return;
    deck.show(t);
    if (shared.soundOn()) { player.play(t); player.preload(tracks[(song + 1) % tracks.length]); }
  }

  // ── Tamaño ──
  function resize() {
    const cs = getComputedStyle(board!);
    const w = board!.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size = Math.max(160, Math.floor(w));
    cell = Math.floor(size / ROWS);
    const fieldW = cell * COLS, side = cell * 5;
    ox = Math.floor((size - fieldW - side - cell) / 2);
    oy = Math.floor((size - cell * ROWS) / 2);
    canvas!.style.width = canvas!.style.height = `${size}px`;
    canvas!.width = canvas!.height = size * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  // ── Dibujo ──
  function block(x: number, y: number, color: string, alpha = 1, glow = false) {
    const c = ctx!;
    const px = ox + x * cell, py = oy + y * cell, k = cell - 2;
    c.globalAlpha = alpha;
    if (glow) { c.shadowColor = color; c.shadowBlur = cell * 0.6; }
    const g = c.createLinearGradient(px, py, px + k, py + k);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0.55)');
    c.fillStyle = color;
    c.fillRect(px + 1, py + 1, k, k);
    c.shadowBlur = 0;
    c.fillStyle = g;
    c.fillRect(px + 1, py + 1, k, k);
    c.fillStyle = 'rgba(255,255,255,0.35)';
    c.fillRect(px + 1, py + 1, k, Math.max(1, cell * 0.12));
    c.globalAlpha = 1;
  }
  function draw() {
    const c = ctx!;
    c.clearRect(0, 0, size, size);
    // Campo
    c.fillStyle = 'rgba(255,255,255,0.02)';
    c.fillRect(ox, oy, cell * COLS, cell * ROWS);
    c.strokeStyle = 'rgba(255,255,255,0.06)';
    c.lineWidth = 1;
    c.beginPath();
    for (let x = 1; x < COLS; x++) { c.moveTo(ox + x * cell + 0.5, oy); c.lineTo(ox + x * cell + 0.5, oy + ROWS * cell); }
    for (let y = 1; y < ROWS; y++) { c.moveTo(ox, oy + y * cell + 0.5); c.lineTo(ox + COLS * cell, oy + y * cell + 0.5); }
    c.stroke();
    c.strokeStyle = 'rgba(255,0,60,0.6)';
    c.strokeRect(ox - 0.5, oy - 0.5, cell * COLS + 1, cell * ROWS + 1);
    // Fijados
    s.grid.forEach((row, y) => row.forEach((v, x) => { if (v) block(x, y, COLORS[TYPES[v - 1]]); }));
    // Fantasma y pieza activa
    if (!s.over) {
      const gy = dropY(s);
      const color = COLORS[s.piece.type];
      c.strokeStyle = color;
      c.globalAlpha = 0.45;
      for (const [r, col] of cellsOf({ ...s.piece, y: gy })) if (r >= 0) c.strokeRect(ox + col * cell + 2.5, oy + r * cell + 2.5, cell - 5, cell - 5);
      c.globalAlpha = 1;
      for (const [r, col] of cellsOf(s.piece)) if (r >= 0) block(col, r, color, 1, true);
    }
    // Destello de líneas borradas
    if (flashT > 0) {
      c.fillStyle = `rgba(255,255,255,${flashT / 12})`;
      for (const r of flashRows) c.fillRect(ox, oy + r * cell, cell * COLS, cell);
    }
    // Lateral: siguientes y datos
    const sx = ox + cell * (COLS + 1);
    c.fillStyle = 'rgba(255,255,255,0.55)';
    c.font = `${Math.max(9, cell * 0.5)}px "JetBrains Mono Variable", monospace`;
    c.fillText(tr('SIGUE', 'NEXT'), sx, oy + cell * 0.8);
    s.queue.slice(0, 3).forEach((t, i) => {
      const cells = previewCells(t);
      const k = cell * 0.7, by = oy + cell * 1.4 + i * cell * 3;
      c.fillStyle = COLORS[t];
      for (const [r, col] of cells) c.fillRect(sx + col * k, by + r * k, k - 2, k - 2);
    });
    c.fillStyle = 'rgba(255,255,255,0.55)';
    c.fillText(tr('LÍNEAS', 'LINES'), sx, oy + cell * 11);
    c.fillText(tr('NIVEL', 'LEVEL'), sx, oy + cell * 14);
    c.fillStyle = '#ffffff';
    c.font = `700 ${Math.max(14, cell * 1.1)}px "Space Grotesk Variable", sans-serif`;
    c.fillText(String(s.lines), sx, oy + cell * 12.4);
    c.fillText(String(s.level), sx, oy + cell * 15.4);
  }

  // ── Reglas en tiempo real ──
  function afterLock(lines: number) {
    hud();
    if (!lines) return;
    flashRows = s.cleared.slice();
    flashT = 12;
    try { if ('vibrate' in navigator) navigator.vibrate(25); } catch { /* sin háptica */ }
    const r = canvas!.getBoundingClientRect();
    focus.burst(r.left + (ox + cell * COLS / 2) * (r.width / size), r.top + (oy + (flashRows[0] ?? 10) * cell) * (r.height / size));
    song++;
    playSong();
  }
  function over() {
    running = false;
    root.classList.remove('is-playing');
    focus.exit();
    player.fadeOut(1200);
    const newBest = s.score > best;
    if (newBest) { best = s.score; ls.set(best); }
    hud();
    overTitle.textContent = s.lines === 1 ? tr('1 línea', '1 line') : tr(`${s.lines} líneas`, `${s.lines} lines`);
    overResult.textContent = newBest ? tr(`¡Nuevo récord! ${s.score} puntos`, `New best! ${s.score} points`) : tr(`${s.score} puntos · récord ${best}`, `${s.score} points · best ${best}`);
    if (canAnimate()) board!.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 320 });
    state('over');
  }
  const apply = (r: ReturnType<typeof step>) => { if (r.kind === 'locked') afterLock(r.lines); else if (r.kind === 'over') over(); };

  function frame(now: number) {
    if (running) {
      acc += now - last;
      const ms = softHeld ? Math.min(45, gravityMs(s.level)) : gravityMs(s.level);
      while (acc >= ms && running) { acc -= ms; apply(step(s, Math.random, softHeld)); }
      if (softHeld) hud();
    }
    last = now;
    if (flashT > 0) flashT--;
    if (active) draw();
    requestAnimationFrame(frame);
  }

  function start(withMusic: boolean) {
    player.stop();
    shared.setSound(withMusic);
    s = createBlocks();
    acc = 0; flashT = 0;
    hud();
    resume();
  }
  function resume() {
    state('none');
    focus.enter(shared.consoleEl);
    running = true;
    root.classList.add('is-playing');
    last = performance.now();
    canvas!.focus({ preventScroll: true });
    playSong();
  }
  function pause() {
    if (!running) return;
    running = false;
    softHeld = false;
    root.classList.remove('is-playing');
    focus.exit();
    player.stop();
    state('paused');
  }

  // ── Botones ──
  board.querySelectorAll<HTMLButtonElement>('[data-blocks-play]').forEach((b) => b.addEventListener('click', () => start(b.dataset.blocksPlay === 'music')));
  board.querySelector('[data-blocks-again]')?.addEventListener('click', () => start(shared.soundOn()));
  board.querySelector('[data-blocks-restart]')?.addEventListener('click', () => start(shared.soundOn()));
  board.querySelector('[data-blocks-resume]')?.addEventListener('click', resume);
  pauseBtn.addEventListener('click', () => { if (active) pause(); });
  root.querySelector('[data-snake-sound]')?.addEventListener('click', () => { if (active && running && shared.soundOn()) playSong(); });

  // ── Teclado (solo mientras se juega) ──
  window.addEventListener('keydown', (e) => {
    if (!running) return;
    const k = e.key;
    const handled = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'Escape', 'a', 'd', 's', 'w', 'z', 'x', 'p', 'A', 'D', 'S', 'W', 'Z', 'X', 'P'].includes(k);
    if (!handled) return;
    e.preventDefault();
    if (k === 'Escape' || k === 'p' || k === 'P') return pause();
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') move(s, -1);
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') move(s, 1);
    else if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === 'x' || k === 'X') rotate(s, 1);
    else if (k === 'z' || k === 'Z') rotate(s, -1);
    else if (k === 'ArrowDown' || k === 's' || k === 'S') softHeld = true;
    else if (k === ' ') apply(hardDrop(s, Math.random));
  });
  window.addEventListener('keyup', (e) => { if (['ArrowDown', 's', 'S'].includes(e.key)) softHeld = false; });

  // ── Táctil: arrastrar mueve de a una columna, tocar gira, deslizar rápido hacia abajo suelta ──
  let tx = 0, ty = 0, t0 = 0, movedX = 0, movedY = 0, dragged = false;
  board.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    tx = t.clientX; ty = t.clientY; t0 = performance.now(); movedX = movedY = 0; dragged = false;
  }, { passive: true });
  board.addEventListener('touchmove', (e) => {
    if (!running) return;
    e.preventDefault();
    const t = e.touches[0];
    const unit = Math.max(14, cell * 0.9);
    const dx = t.clientX - tx, dy = t.clientY - ty;
    while (dx - movedX * unit >= unit) { move(s, 1); movedX++; dragged = true; }
    while (dx - movedX * unit <= -unit) { move(s, -1); movedX--; dragged = true; }
    while (dy - movedY * unit >= unit) { apply(step(s, Math.random, true)); movedY++; dragged = true; hud(); }
  }, { passive: false });
  board.addEventListener('touchend', (e) => {
    if (!running) return;
    const t = e.changedTouches[0];
    const dt = performance.now() - t0, dy = t.clientY - ty, dx = t.clientX - tx;
    if (dt < 260 && dy > cell * 3 && Math.abs(dy) > Math.abs(dx) * 1.5) apply(hardDrop(s, Math.random));
    else if (!dragged && dt < 300 && Math.hypot(dx, dy) < 12) rotate(s, 1);
  });

  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(board);
  state('ready');
  requestAnimationFrame(frame);

  return {
    activate() { active = true; resize(); hud(); if (!running && tracks.length) deck.show(current()); },
    deactivate() { pause(); active = false; },
  };
}
