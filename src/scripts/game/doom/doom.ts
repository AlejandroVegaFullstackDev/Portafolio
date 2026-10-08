// Doom (1993) en la consola: el motor original de id Software compilado a WebAssembly
// (paquete wasm-doom, GPL-2.0) con el episodio shareware adentro. Se descarga solo al
// darle "Jugar" (6,8 MB). Cargador propio para poder pausarlo, tener controles
// táctiles y no secuestrar el teclado de toda la página. Doom no trae sonido aquí:
// de fondo suena la playlist, una canción cada 30 s.
import type { ArcadeShared } from '../snake';
import type { GameHandle } from '../blocks/blocks';
import { tr } from '../snakeUi';

const WASM_URL = '/games/doom.wasm';
const W = 640, H = 400;

interface DoomExports { main(): void; doom_loop_step(): void; add_browser_event(kind: 0 | 1, key: number): void }

/** keyCode del navegador → código de tecla de Doom (misma tabla que wasm-doom). */
function doomKey(code: number): number {
  switch (code) {
    case 8: return 127;            // backspace
    case 16: return 182;           // shift (correr)
    case 17: return 157;           // ctrl (disparar)
    case 18: return 184;           // alt (de lado)
    case 37: return 172; case 38: return 173; case 39: return 174; case 40: return 175;
    default:
      if (code >= 65 && code <= 90) return code + 32;   // letras en minúscula
      if (code >= 112 && code <= 123) return code + 75; // F1–F12
      return code;                                       // enter, esc, espacio, números
  }
}
const GAME_KEYS = new Set([8, 13, 16, 17, 18, 27, 32, 37, 38, 39, 40, 49, 50, 51, 52, 53, 54, 55, 89, 78]);

export function initDoom(shared: ArcadeShared): GameHandle | null {
  const { root, tracks, player, deck, focus } = shared;
  const board = root.querySelector<HTMLElement>('[data-game-board="doom"]');
  const canvas = board?.querySelector<HTMLCanvasElement>('[data-doom-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!board || !canvas || !ctx) return null;
  const overlay = board.querySelector<HTMLElement>('[data-doom-overlay]')!;
  const loadMsg = board.querySelector<HTMLElement>('[data-doom-loading]')!;
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-snake-pause]')!;
  canvas.width = W; canvas.height = H;

  let doom: DoomExports | null = null;
  let memory: WebAssembly.Memory | null = null;
  let running = false, active = false, loading = false;
  // Reloj virtual: al pausar se congela, así Doom no "adelanta" el tiempo perdido.
  let clock = 0, lastReal = performance.now();
  let song = Math.floor(Math.random() * Math.max(1, tracks.length));
  let songTimer: ReturnType<typeof setInterval> | undefined;

  const state = (st: 'ready' | 'loading' | 'paused' | 'error' | 'none') => {
    overlay.hidden = st === 'none';
    overlay.dataset.state = st;
    pauseBtn.hidden = st !== 'none';
  };

  function render(ptr: number) {
    if (!memory) return;
    ctx!.putImageData(new ImageData(new Uint8ClampedArray(memory.buffer, ptr, W * H * 4), W, H), 0, 0);
  }

  async function load() {
    loading = true;
    state('loading');
    memory = new WebAssembly.Memory({ initial: 108 });
    const imports = {
      js: {
        js_console_log: () => {}, js_stdout: () => {}, js_stderr: () => {},
        js_draw_screen: render,
        js_milliseconds_since_start: () => clock,
      },
      env: { memory },
    };
    // Descarga con progreso (6,8 MB).
    const res = await fetch(WASM_URL);
    if (!res.ok || !res.body) throw new Error(`doom ${res.status}`);
    const total = Number(res.headers.get('content-length')) || 6_843_809;
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let got = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value); got += value.length;
      loadMsg.textContent = `${Math.min(99, Math.round((got / total) * 100))}%`;
    }
    const bytes = new Uint8Array(got);
    let off = 0;
    for (const c of chunks) { bytes.set(c, off); off += c.length; }
    const { instance } = await WebAssembly.instantiate(bytes, imports);
    doom = instance.exports as unknown as DoomExports;
    doom.main();
    loading = false;
  }

  function loop() {
    const now = performance.now();
    if (running && doom) {
      clock += Math.min(100, now - lastReal); // si el navegador se atrasó, no saltar más de 100 ms
      doom.doom_loop_step();
    }
    lastReal = now;
    requestAnimationFrame(loop);
  }

  // ── Música de fondo ──
  function playSong() {
    const t = tracks[song % Math.max(1, tracks.length)];
    if (!t) return;
    deck.show(t);
    if (shared.soundOn()) { player.play(t); player.preload(tracks[(song + 1) % tracks.length]); }
  }
  function startMusic() {
    clearInterval(songTimer);
    playSong();
    songTimer = setInterval(() => { if (running) { song++; playSong(); } }, 30_000);
  }

  async function start(withMusic: boolean) {
    player.stop();
    shared.setSound(withMusic); // dentro del toque: desbloquea el audio en iOS
    if (!doom) {
      if (loading) return;
      try { await load(); } catch { loading = false; state('error'); return; }
    }
    resume();
  }
  function resume() {
    state('none');
    focus.enter(shared.consoleEl);
    running = true;
    root.classList.add('is-playing');
    lastReal = performance.now();
    canvas!.focus({ preventScroll: true });
    startMusic();
  }
  function pause() {
    if (!running) return;
    running = false;
    clearInterval(songTimer);
    root.classList.remove('is-playing');
    focus.exit();
    player.stop();
    state('paused');
  }

  // ── Teclado (solo con Doom corriendo; no toca el resto de la página) ──
  const onKey = (kind: 0 | 1) => (e: KeyboardEvent) => {
    if (!running || !doom || !GAME_KEYS.has(e.keyCode)) return;
    e.preventDefault();
    doom.add_browser_event(kind, doomKey(e.keyCode));
  };
  window.addEventListener('keydown', onKey(0));
  window.addEventListener('keyup', onKey(1));

  // ── Controles táctiles: cada botón manda su tecla mientras está presionado ──
  board.querySelectorAll<HTMLButtonElement>('[data-k]').forEach((b) => {
    const key = Number(b.dataset.k);
    const press = (e: PointerEvent) => {
      e.preventDefault();
      if (!doom || !running) return;
      b.setPointerCapture?.(e.pointerId);
      b.classList.add('on');
      doom.add_browser_event(0, key);
    };
    const release = () => { if (!b.classList.contains('on')) return; b.classList.remove('on'); doom?.add_browser_event(1, key); };
    b.addEventListener('pointerdown', press);
    b.addEventListener('pointerup', release);
    b.addEventListener('pointercancel', release);
    b.addEventListener('lostpointercapture', release);
    b.addEventListener('contextmenu', (e) => e.preventDefault());
  });
  // Cambiar de arma: recorre 1–5 (puño, pistola, escopeta, ametralladora, lanzacohetes).
  let weapon = 2;
  board.querySelector('[data-doom-weapon]')?.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (!doom || !running) return;
    weapon = weapon >= 5 ? 1 : weapon + 1;
    const k = 48 + weapon;
    doom.add_browser_event(0, k);
    setTimeout(() => doom?.add_browser_event(1, k), 80);
  });

  board.querySelectorAll<HTMLButtonElement>('[data-doom-play]').forEach((b) => b.addEventListener('click', () => start(b.dataset.doomPlay === 'music')));
  board.querySelector('[data-doom-resume]')?.addEventListener('click', resume);
  pauseBtn.addEventListener('click', () => { if (active) pause(); });
  root.querySelector('[data-snake-sound]')?.addEventListener('click', () => { if (active && running && shared.soundOn()) playSong(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

  state('ready');
  requestAnimationFrame(loop);

  return {
    activate() {
      active = true;
      const best = root.querySelector<HTMLElement>('[data-snake-best]');
      const score = root.querySelector<HTMLElement>('[data-snake-score]');
      if (score) score.textContent = '—';
      if (best) best.textContent = '—';
      if (!running && tracks.length) deck.show(tracks[song % tracks.length]);
      loadMsg.textContent = loadMsg.textContent || tr('Cargando…', 'Loading…');
    },
    deactivate() { pause(); active = false; },
  };
}
