// Widget flotante "sonando en Spotify". Escucha el evento spotify:update que emite
// scripts/sections/nowBand.ts y anima el disco/estado.
import gsap from 'gsap';

export function initSpotifyWidget() {

const CHARS = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';

function scramble(el: HTMLElement, text: string) {
  const arr = text.split('');
  let frame = 0;
  const q = arr.map((c) => ({
    to: c,
    start: Math.floor(Math.random() * 8),
    end: Math.floor(Math.random() * 14) + 8,
  }));
  let raf = 0;
  function tick() {
    let out = '', done = 0;
    for (const { to, start, end } of q) {
      if (frame >= end) { done++; out += to; }
      else if (frame >= start) out += CHARS[Math.floor(Math.random() * CHARS.length)];
      else out += ' ';
    }
    el.textContent = out;
    if (done === q.length) return;
    frame++;
    raf = requestAnimationFrame(tick);
  }
  cancelAnimationFrame(raf);
  tick();
}

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const widget   = document.getElementById('spWidget')    as HTMLElement;
const artEl    = document.getElementById('spArt')       as HTMLImageElement;
const titleEl  = document.getElementById('spTitle')     as HTMLElement;
const artistEl = document.getElementById('spArtist')    as HTMLElement;
const barEl    = document.getElementById('spBar')       as HTMLElement;
const timeEl   = document.getElementById('spTime')      as HTMLElement;
const linkEl   = document.getElementById('spLink')      as HTMLAnchorElement;
const eqEl     = document.getElementById('spEq')        as HTMLElement;
const eqBars   = Array.from(eqEl.querySelectorAll('span')) as HTMLElement[];

let visible      = false;
let currentTrack = '';
let progress     = 0;
let duration     = 0;
let playing      = false;
let tickId: ReturnType<typeof setInterval> | null = null;
let floatTl: gsap.core.Tween | null = null;
let eqRunning    = false;

// ── EQ ────────────────────────────────────────────────────────────────────────
function startEQ() {
  if (eqRunning) return;
  eqRunning = true;
  eqBars.forEach((bar, i) => {
    gsap.to(bar, {
      scaleY: () => gsap.utils.random(0.25, 1.5),
      duration: 0.16 + i * 0.06,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
      delay: i * 0.05,
      transformOrigin: 'bottom center',
    });
  });
}

function stopEQ() {
  eqRunning = false;
  gsap.to(eqBars, { scaleY: 0.2, duration: 0.3, ease: 'power2.out', overwrite: true, transformOrigin: 'bottom center' });
}

// ── Progress tick ─────────────────────────────────────────────────────────────
function startTick() {
  if (tickId) clearInterval(tickId);
  tickId = setInterval(() => {
    if (!playing || !duration) return;
    progress = Math.min(progress + 1000, duration);
    gsap.to(barEl, { width: `${(progress / duration) * 100}%`, duration: 0.8, ease: 'none', overwrite: true });
    timeEl.textContent = fmt(progress);
  }, 1000);
}

// ── Show ──────────────────────────────────────────────────────────────────────
function show(data: {
  isPlaying: boolean; isRecent?: boolean; title: string; artist: string;
  songUrl: string; albumImageUrl: string | null;
  progress_ms: number; duration_ms: number;
}) {
  const trackKey = `${data.title}||${data.artist}`;
  const changed  = trackKey !== currentTrack;

  if (!visible) {
    widget.style.display = 'flex';
    gsap.fromTo(widget,
      { y: 90, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.95, ease: 'expo.out',
        onComplete() {
          floatTl = gsap.to(widget, { y: -5, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true });
        },
      }
    );
    visible = true;
    startEQ();
  }

  if (changed) {
    currentTrack = trackKey;

    // Album art crossfade
    if (data.albumImageUrl) {
      gsap.to(artEl, {
        opacity: 0, scale: 0.82, duration: 0.22, ease: 'power2.in',
        onComplete() {
          artEl.src = data.albumImageUrl!;
          artEl.onload = () =>
            gsap.to(artEl, { opacity: 1, scale: 1, duration: 0.38, ease: 'back.out(1.5)' });
        },
      });
    }

    // Title scramble + header glitch
    scramble(titleEl, data.title.toUpperCase());

    // Artist slide-up
    gsap.fromTo(artistEl,
      { opacity: 0, y: 8 },
      {
        opacity: 1, y: 0, duration: 0.38, ease: 'power2.out', delay: 0.12,
        onStart() { artistEl.textContent = data.artist.toUpperCase(); },
      }
    );

    // Corner accent flash
    gsap.fromTo('.sp-c', { opacity: 0.2 }, { opacity: 1, duration: 0.06, yoyo: true, repeat: 5, ease: 'none' });
  }

  linkEl.href = data.songUrl || '#';
  progress  = data.progress_ms;
  duration  = data.duration_ms;
  playing   = data.isPlaying;

  if (duration > 0) {
    gsap.to(barEl, { width: `${(progress / duration) * 100}%`, duration: 1, ease: 'power1.out', overwrite: true });
    timeEl.textContent = fmt(progress);
  }

  if (playing) {
    startEQ();
    startTick();
  } else {
    stopEQ();
  }
}

// ── Hide ──────────────────────────────────────────────────────────────────────
function hide() {
  if (!visible) return;
  floatTl?.kill();
  floatTl = null;
  if (tickId) { clearInterval(tickId); tickId = null; }
  playing = false;
  stopEQ();
  gsap.to(widget, {
    y: 90, opacity: 0, scale: 0.92, duration: 0.6, ease: 'power2.in',
    onComplete() { widget.style.display = 'none'; visible = false; currentTrack = ''; },
  });
}

// ── Listen for data from initNowPlaying ───────────────────────────────────────
window.addEventListener('spotify:update', (e) => {
  const data = (e as CustomEvent).detail;
  if (data?.title && data?.artist) show(data);
  else hide();
});
}
