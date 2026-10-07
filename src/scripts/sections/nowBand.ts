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

  async function fetchNow() {
    try {
      const res = await fetch('/api/now-playing');
      if (!res.ok) return hide();
      const data = await res.json();
      if (item && icon && text && data.title && data.artist) {
        item.hidden = false;
        text.textContent = `${data.isPlaying ? '' : 'LAST: '}${data.artist.toUpperCase()} — ${data.title.toUpperCase()}`;
        icon.textContent = data.isPlaying ? '♫' : '↺';
      } else hide();
      // Alimenta el widget flotante (components/SpotifyNow.astro).
      window.dispatchEvent(new CustomEvent('spotify:update', { detail: data }));
    } catch {
      hide();
    }
  }
  fetchNow();
  setInterval(fetchNow, 30_000);
}
