// "Cómete mi playlist": orquesta el juego. La comida son carátulas de mi playlist de
// Spotify; el cuerpo se arma con las que te comes.
//   motor: snakeEngine.ts · dibujo: snakeRender.ts · efectos: snakeFx.ts
//   interfaz: snakeUi.ts · controles: snakeInput.ts · vinilo: vinylDeck.ts · audio: previewPlayer.ts · ranking: ranking.ts
// Flujo: Listo (con o sin música) → jugando ⇄ pausa → fin (música se apaga, se anota solo
// si el dispositivo ya tiene nombre) → otra vez.
import { createGame, step, tickMs, turn, type Dir, type SnakeState } from './snakeEngine';
import { PreviewPlayer } from './previewPlayer';
import { Ranking, validName } from './ranking';
import { mulberry32 } from './prng';
import { drawBoard, readPalette, type Palette } from './snakeRender';
import { SnakeFx } from './snakeFx';
import { VinylDeck } from './vinylDeck';
import { SnakeUi, tr } from './snakeUi';
import { bindControls } from './snakeInput';
import { SnakeFocus } from './snakeFocus';
import type { Move } from './replay';

interface Track { id: string; title: string; artist: string; cover: string | null; art?: string | null; uri: string; url: string; preview: string | null }

const BEST_KEY = 'av_snake_best';
const SIZE = 16;
const store = {
  get: () => { try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch { return 0; } },
  set: (v: number) => { try { localStorage.setItem(BEST_KEY, String(v)); } catch { /* sin storage */ } },
};

export async function initPlaylistSnake() {
  const root = document.getElementById('snake');
  const canvas = root?.querySelector<HTMLCanvasElement>('[data-snake-canvas]');
  const ctx = canvas?.getContext('2d');
  if (!root || !canvas || !ctx) return;
  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;

  const ui = new SnakeUi(root);
  const fx = new SnakeFx(root, $('[data-snake-pad]'), $('.board'), canvas);
  const deck = new VinylDeck($('[data-deck]'));
  const focus = new SnakeFocus(root);
  const consoleEl = $('[data-snake-pad]');
  const player = new PreviewPlayer();
  const scoreEl = $('[data-snake-score]');
  const bestEl = $('[data-snake-best]');
  const soundBtn = $<HTMLButtonElement>('[data-snake-sound]');
  const form = $<HTMLFormElement>('[data-lb-form]');
  const nameInput = $<HTMLInputElement>('[data-lb-name]');
  const lbMsg = $('[data-lb-msg]');

  // ── Datos ──
  let tracks: Track[] = [];
  try {
    const res = await fetch('/api/playlist-snake');
    if (res.ok) {
      const data = (await res.json()) as { tracks: Track[]; source?: string; status?: unknown };
      tracks = data.tracks ?? [];
      console.info('[snake] fuente:', data.source, data.status); // diagnóstico, sin secretos
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
  const arts = new Map<number, HTMLImageElement>();
  const preloadArt = (i: number) => {
    const src = tracks[i]?.art;
    if (!src || arts.has(i)) return;
    const img = new Image(); img.decoding = 'async'; img.src = src; arts.set(i, img);
  };

  // ── Estado ──
  let game: SnakeState = createGame(SIZE, tracks.length);
  let rand: () => number = Math.random;
  let moves: Move[] = [];
  let ticks = 0;
  let running = false;
  let best = store.get();
  let acc = 0, last = 0, flash = 0;
  let soundOn = false;
  bestEl.textContent = String(best);

  // ── Ranking ──
  const ranking = new Ranking($('[data-lb-global]'), $('[data-lb-local]'), $('[data-lb-off]'));
  const meBox = $('[data-me]'), meName = $('[data-me-name]'), meForm = $<HTMLFormElement>('[data-me-form]'), meInput = $<HTMLInputElement>('[data-me-input]');
  const showMe = (n: string) => { meBox.hidden = !n; meName.textContent = n; };
  ranking.onName = showMe;
  showMe(ranking.name);
  ranking.load();

  // ── Audio ──
  player.onChange = (title) => root.classList.toggle('is-sounding', !!title);
  function setSound(on: boolean) {
    soundOn = on && root!.classList.contains('has-music');
    soundBtn.setAttribute('aria-pressed', String(soundOn));
    const label = soundOn ? tr('Silenciar música', 'Mute music') : tr('Activar música', 'Turn music on');
    soundBtn.title = label;
    soundBtn.setAttribute('aria-label', label);
    root!.classList.toggle('sound-on', soundOn);
    if (soundOn) {
      player.unlock(); // dentro del toque: habilita el audio en iOS/Safari
      setTimeout(() => player.preload(onBoard()), 150);
    } else player.stop();
  }
  setSound(false);

  // Suena la canción de la carátula que está en el tablero; la siguiente queda precargada.
  const onBoard = () => tracks[game.food.item];
  const upNext = () => (tracks.length ? tracks[(game.score + 1) % tracks.length] : undefined);
  function playBoard() {
    const t = onBoard();
    if (t) deck.show(t);
    if (!soundOn || !t) return;
    player.play(t);
    player.preload(upNext());
  }

  // ── Tamaño (nítido en retina) ──
  let cell = 20;
  const board = canvas.parentElement!;
  const resize = () => {
    const cs = getComputedStyle(board);
    const w = board.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cell = Math.max(8, Math.floor(w / SIZE));
    const px = cell * SIZE;
    canvas.style.width = canvas.style.height = `${px}px`;
    canvas.width = canvas.height = px * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };
  let palette: Palette = readPalette(root);
  new MutationObserver(() => { palette = readPalette(root); }).observe(document.documentElement, { attributes: true });
  const draw = () => drawBoard(ctx, game, covers, cell, SIZE, flash, palette);

  // ── Ciclo de una partida ──
  async function start(withMusic: boolean) {
    player.stop();
    setSound(withMusic);
    root!.querySelectorAll<HTMLButtonElement>('[data-play], [data-again], [data-restart]').forEach((b) => (b.disabled = true));
    const seed = await ranking.begin();
    root!.querySelectorAll<HTMLButtonElement>('[data-play], [data-again], [data-restart]').forEach((b) => (b.disabled = false));
    rand = seed === null ? Math.random : mulberry32(seed);
    moves = [];
    ticks = 0;
    game = createGame(SIZE, tracks.length, rand);
    scoreEl.textContent = '0';
    ui.clear();
    deck.reset();
    ui.face('now');
    preloadArt(game.food.item);
    resume();
  }

  function resume() {
    ui.state('none');
    focus.enter(consoleEl); // centra la consola y bloquea el scroll mientras se juega
    running = true;
    root!.classList.add('is-playing');
    fx.play();
    acc = 0;
    last = performance.now();
    canvas!.focus({ preventScroll: true });
    playBoard();
  }

  function pause() {
    if (!running) return;
    running = false;
    root!.classList.remove('is-playing');
    fx.idle();
    focus.exit();
    player.stop(); // el juego se detiene y la música también
    ui.state('paused');
  }

  const doTurn = (d: Dir) => { if (!running) return; moves.push([ticks, d]); turn(game, d); fx.lean(d); };

  function onEat() {
    flash = 3;
    scoreEl.textContent = String(game.score);
    fx.bump(scoreEl);
    try { if ('vibrate' in navigator) navigator.vibrate(15); } catch { /* sin háptica */ }
    const idx = game.eaten[game.eaten.length - 1];
    const t = tracks[idx];
    const head = game.snake[0];
    const big = arts.get(idx);
    fx.pop(big?.complete && big.naturalWidth ? big.src : t?.cover ?? null, head.x, head.y, cell);
    const cr = canvas.getBoundingClientRect();
    focus.burst(cr.left + (head.x + 0.5) * cell, cr.top + (head.y + 0.5) * cell);
    preloadArt(game.food.item);
    ui.ate(t, game.score);
    playBoard(); // pasa a la canción de la nueva carátula
  }

  async function onOver() {
    running = false;
    root!.classList.remove('is-playing');
    fx.hit();
    fx.idle();
    focus.exit();
    player.fadeOut(1200);
    ui.overActions.hidden = false;
    const newBest = game.score > best;
    if (newBest) { best = game.score; store.set(best); bestEl.textContent = String(best); fx.bump(bestEl); }
    const localPos = ranking.recordLocal(game.score);
    ui.over(game.score, game.eaten.map((i) => tracks[i]).filter(Boolean), newBest && game.score > 0);
    form.hidden = true;

    const localText = localPos ? tr(`#${localPos} en este dispositivo`, `#${localPos} on this device`) : '';
    if (!ranking.ranked || game.score < 1) { ui.result(localText); return; }
    if (ranking.name) await sendScore(ranking.name);
    else {
      // Primera vez en este dispositivo: se pide el nombre una sola vez.
      ui.result('');
      ui.overActions.hidden = true;
      form.hidden = false;
      lbMsg.textContent = '';
      nameInput.value = '';
      requestAnimationFrame(() => nameInput.focus({ preventScroll: true }));
    }
  }

  async function sendScore(name: string) {
    ui.result(tr('Anotando…', 'Saving…'));
    const res = await ranking.submit(name, moves, ticks);
    if ('reason' in res && res.reason === 'name') {
      ui.result('');
      ui.overActions.hidden = true;
      form.hidden = false;
      nameInput.value = name;
      lbMsg.textContent = tr('Ese nombre no va. Prueba otro (2–16 letras o números).', 'That name won’t work. Try another (2–16 letters or numbers).');
      return;
    }
    form.hidden = true;
    ui.overActions.hidden = false;
    if (res.ok && res.rank) ui.result(tr(`en el ranking global · como ${name}`, `in the global ranking · as ${name}`), `#${res.rank}`);
    else if (res.ok) ui.result(tr(`Anotado como ${name}`, `Saved as ${name}`));
    else ui.result(tr('No se pudo anotar esta vez.', 'Couldn’t save it this time.'));
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

  // ── Botones ──
  root.querySelectorAll<HTMLButtonElement>('[data-play]').forEach((b) => b.addEventListener('click', () => start(b.dataset.play === 'music')));
  $('[data-again]').addEventListener('click', () => start(soundOn));
  $('[data-restart]').addEventListener('click', () => start(soundOn));
  $('[data-resume]').addEventListener('click', resume);
  $('[data-snake-pause]').addEventListener('click', pause);
  $('[data-show-rank]').addEventListener('click', () => {
    ui.face('rank');
    $('[data-panel]').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  soundBtn.addEventListener('click', () => {
    setSound(!soundOn);
    // Si se activa a mitad de partida, suena la de la carátula en pantalla.
    if (soundOn && running) playBoard();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = nameInput.value.trim();
    if (!validName(n)) { lbMsg.textContent = tr('Usa de 2 a 16 letras o números.', 'Use 2–16 letters or numbers.'); return; }
    sendScore(n);
  });
  $('[data-lb-skip]').addEventListener('click', () => {
    form.hidden = true;
    ui.overActions.hidden = false;
    ui.result(tr('Sin anotar. Te lo vuelvo a preguntar la próxima.', 'Not saved. I’ll ask again next time.'));
    $<HTMLButtonElement>('[data-again]').focus({ preventScroll: true });
  });
  $('[data-me-edit]').addEventListener('click', () => { meForm.hidden = false; meInput.value = ranking.name; meInput.focus(); });
  meForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validName(meInput.value)) return;
    ranking.name = meInput.value;
    meForm.hidden = true;
  });

  bindControls($('[data-snake-pad]'), canvas, { running: () => running, turn: doTurn, pause });

  // ── Pausa si cambias de pestaña o sales de la sección ──
  document.addEventListener('visibilitychange', () => { if (document.hidden) { pause(); player.stop(); } });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { if (!e.isIntersecting) pause(); }, { threshold: 0.25 }).observe(canvas);
    const widget = document.getElementById('spWidget'); // el widget flotante tapaba controles en el cel
    if (widget) new IntersectionObserver(([e]) => widget.classList.toggle('sp-away', e.isIntersecting), { threshold: 0.05 }).observe(root);
  }
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(board);
  else addEventListener('resize', resize);

  ui.state('ready');
  resize();
  requestAnimationFrame(frame);
}
