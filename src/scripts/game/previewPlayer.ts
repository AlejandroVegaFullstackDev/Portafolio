// Reproductor de vistas previas (30 s) para el Snake, con un <audio> propio.
// iOS/Safari solo deja reproducir audio si el MISMO elemento se activó con un toque:
// `unlock()` se llama desde el botón "Activar sonido" y desde ahí `play()` funciona
// aunque lo dispare el juego.

/** WAV válido de 0,1 s en silencio, generado en código (sin depender de un base64 a mano). */
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

export class PreviewPlayer {
  private audio = new Audio();
  private cache = new Map<string, string | null>();
  private token = 0;
  onChange: (title: string | null) => void = () => {};

  constructor() {
    this.audio.preload = 'none';
    this.audio.volume = 0.6;
    this.audio.addEventListener('ended', () => this.onChange(null));
  }

  /** Llamar dentro de un toque/click del usuario. */
  unlock() {
    this.audio.src = silentWav();
    this.audio.play().then(() => this.audio.pause()).catch(() => {});
  }

  private async resolve(artist: string, title: string) {
    const key = `${artist}::${title}`;
    if (this.cache.has(key)) return this.cache.get(key)!;
    try {
      const r = await fetch(`/api/preview?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`);
      const url = r.ok ? ((await r.json()) as { preview: string | null }).preview : null;
      this.cache.set(key, url);
      return url;
    } catch {
      return null;
    }
  }

  async play(artist: string, title: string) {
    const t = ++this.token; // si llega otra canción mientras se busca, gana la última
    const url = await this.resolve(artist, title);
    if (t !== this.token) return;
    if (!url) { this.onChange(null); return; }
    this.audio.src = url;
    try {
      await this.audio.play();
      this.onChange(title);
    } catch {
      this.onChange(null);
    }
  }

  stop() {
    this.token++;
    this.audio.pause();
    this.onChange(null);
  }
}
