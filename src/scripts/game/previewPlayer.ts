// Reproductor de vistas previas (30 s) para el Snake, sin espera al comer:
// - Dos <audio> que se turnan: mientras uno suena, el otro ya tiene descargada la
//   siguiente canción (la que está en el tablero).
// - iOS/Safari solo deja reproducir un <audio> que se activó con un toque, así que
//   `unlock()` (llamado desde "Activar sonido") desbloquea los dos.

/** WAV válido de 0,1 s en silencio, generado en código. */
function silentWav(): string {
  const rate = 8000, samples = 800, bytes = 44 + samples;
  const v = new DataView(new ArrayBuffer(bytes));
  const str = (o: number, t: string) => [...t].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  str(0, 'RIFF'); v.setUint32(4, bytes - 8, true); str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
  v.setUint32(24, rate, true); v.setUint32(28, rate, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true);
  str(36, 'data'); v.setUint32(40, samples, true);
  for (let i = 0; i < samples; i++) v.setUint8(44 + i, 128);
  let bin = '';
  new Uint8Array(v.buffer).forEach((b) => (bin += String.fromCharCode(b)));
  return 'data:audio/wav;base64,' + btoa(bin);
}

const VOLUME = 0.6;

export interface Song { title: string; artist: string; preview: string | null }

export class PreviewPlayer {
  private decks = [new Audio(), new Audio()];
  private active = 0;                       // deck que suena
  private loaded: (string | null)[] = [null, null];
  private lookups = new Map<string, Promise<string | null>>();
  onChange: (title: string | null) => void = () => {};

  constructor() {
    this.decks.forEach((a) => {
      a.preload = 'auto';
      a.loop = true; // la preview se repite mientras la carátula siga en pantalla
      a.volume = VOLUME;
      a.addEventListener('ended', () => { if (a === this.decks[this.active]) this.onChange(null); });
    });
  }

  /** Llamar dentro de un toque/click del usuario. */
  unlock() {
    const src = silentWav();
    this.decks.forEach((a) => {
      a.src = src;
      a.play().then(() => a.pause()).catch(() => {});
    });
    this.loaded = [null, null];
  }

  /** URL de la preview: la que vino con la lista o, de respaldo, /api/preview. */
  private url(song: Song): Promise<string | null> {
    if (song.preview) return Promise.resolve(song.preview);
    const key = `${song.artist}::${song.title}`;
    if (!this.lookups.has(key)) {
      this.lookups.set(key, fetch(`/api/preview?artist=${encodeURIComponent(song.artist)}&title=${encodeURIComponent(song.title)}`)
        .then((r) => (r.ok ? r.json() : { preview: null }))
        .then((d: { preview: string | null }) => d.preview)
        .catch(() => null));
    }
    return this.lookups.get(key)!;
  }

  /** Deja la siguiente canción descargándose en el deck libre. */
  async preload(song: Song | undefined) {
    if (!song) return;
    const u = await this.url(song);
    const idle = 1 - this.active;
    if (!u || this.loaded[idle] === u) return;
    this.loaded[idle] = u;
    this.decks[idle].src = u;
    this.decks[idle].load();
  }

  private gen = 0; // si se para mientras se resolvía la URL, no arranca tarde

  async play(song: Song) {
    const g = ++this.gen;
    const u = await this.url(song);
    if (g !== this.gen) return;
    if (!u) { this.onChange(null); return; }
    const idle = 1 - this.active;
    // Si ya estaba precargada en el deck libre, se usa ese (arranque inmediato).
    const deck = this.loaded[idle] === u ? idle : this.active;
    const other = 1 - deck;
    this.decks[other].pause();
    const a = this.decks[deck];
    if (this.loaded[deck] !== u) { a.src = u; this.loaded[deck] = u; }
    cancelAnimationFrame(this.fading);
    a.volume = VOLUME;
    a.currentTime = 0;
    this.active = deck;
    try {
      await a.play();
      if (g !== this.gen) { a.pause(); return; }
      this.onChange(song.title);
    } catch {
      this.onChange(null);
    }
  }

  private fading = 0;

  stop() {
    this.gen++;
    cancelAnimationFrame(this.fading);
    this.decks.forEach((a) => { a.pause(); a.volume = VOLUME; });
    this.onChange(null);
  }

  /** Baja el volumen hasta cero y para (al perder). */
  fadeOut(ms = 1200) {
    const a = this.decks[this.active];
    if (a.paused) return this.stop();
    const from = a.volume, t0 = performance.now();
    cancelAnimationFrame(this.fading);
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      a.volume = from * (1 - k);
      if (k < 1) this.fading = requestAnimationFrame(tick);
      else this.stop();
    };
    this.fading = requestAnimationFrame(tick);
  }
}
