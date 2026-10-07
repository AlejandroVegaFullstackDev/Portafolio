// Reproductor oficial de Spotify embebido (iFrame API). Se carga solo cuando el usuario
// activa el sonido. Sin sesión de Spotify suena una vista previa de ~30 s.
// iOS/Safari puede bloquear el play automático: el reproductor queda visible para tocarlo.

interface Controller { loadUri(uri: string): void; play(): void; pause(): void }
interface IFrameAPI {
  createController(el: HTMLElement, opts: { uri: string; width?: string | number; height?: number }, cb: (c: Controller) => void): void;
}

let apiPromise: Promise<IFrameAPI> | null = null;

function loadApi(): Promise<IFrameAPI> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    (window as unknown as { onSpotifyIframeApiReady: (api: IFrameAPI) => void }).onSpotifyIframeApiReady = resolve;
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    s.onerror = () => { apiPromise = null; reject(new Error('spotify embed')); };
    document.head.appendChild(s);
  });
  return apiPromise;
}

export class SpotifyPlayer {
  private controller: Controller | null = null;
  private pending: string | null = null;

  constructor(private host: HTMLElement) {}

  /** Crea el reproductor con la primera canción (llamar desde un toque del usuario). */
  async init(firstUri: string) {
    if (this.controller) return;
    const api = await loadApi();
    const mount = document.createElement('div');
    this.host.replaceChildren(mount);
    api.createController(mount, { uri: firstUri, width: '100%', height: 80 }, (c) => {
      this.controller = c;
      if (this.pending) { c.loadUri(this.pending); c.play(); this.pending = null; }
    });
  }

  play(uri: string) {
    if (!this.controller) { this.pending = uri; return; }
    this.controller.loadUri(uri);
    this.controller.play();
  }

  pause() { this.controller?.pause(); }
}
