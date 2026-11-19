// Franja de estado: reloj de Bogotá y canción actual de Spotify (vía /api/now-playing).
// Sin dato real no se inventa una canción: la celda queda oculta.

export function initNowBand() {
  const clock = document.getElementById('nowClock');
  if (clock) {
    const tick = () => {
      clock.textContent = new Date().toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    tick();
    setInterval(tick, 1000);
  }

  const item = document.getElementById('nowTrackItem');
  const icon = document.getElementById('nowPlayIcon');
  const text = document.getElementById('nowTrackText');
  const hide = () => { if (item) item.hidden = true; };

  // Sin dato (error, timeout o API caída) se emite estado vacío: el widget flotante se oculta.
  const emit = (data: unknown) => window.dispatchEvent(new CustomEvent('spotify:update', { detail: data }));
  const EMPTY = { isPlaying: false, isRecent: false };

  async function fetchNow() {
    try {
      const res = await fetch('/api/now-playing', { signal: AbortSignal.timeout(8000) });
      if (!res.ok) { hide(); emit(EMPTY); return; }
      const data = await res.json();
      if (item && icon && text && data.title && data.artist) {
        item.hidden = false;
        text.textContent = `${data.isPlaying ? '' : 'LAST: '}${data.artist.toUpperCase()} — ${data.title.toUpperCase()}`;
        icon.textContent = data.isPlaying ? '♫' : '↺';
      } else hide();
      // Alimenta el widget flotante (components/SpotifyNow.astro).
      emit(data);
    } catch {
      hide();
      emit(EMPTY);
    }
  }

  // Sondeo cada 30 s solo con la pestaña visible; al volver se actualiza de inmediato.
  let poll: ReturnType<typeof setInterval> | undefined;
  const startPoll = () => { clearInterval(poll); fetchNow(); poll = setInterval(fetchNow, 30_000); };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(poll);
    else startPoll();
  });
  if (!document.hidden) startPoll();
}
