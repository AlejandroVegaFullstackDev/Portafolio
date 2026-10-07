// Cliente mínimo de la API de Spotify (lado servidor). Lo comparten /api/now-playing y
// /api/playlist-snake. Usa el refresh token del dueño del sitio (variables de entorno).

const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  album: { images: { url: string; width: number }[] };
  duration_ms: number;
}

export function credentials() {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;
  return clientId && clientSecret && refreshToken ? { clientId, clientSecret, refreshToken } : null;
}

export async function getAccessToken(): Promise<string | null> {
  const c = credentials();
  if (!c) return null;
  const basic = Buffer.from(`${c.clientId}:${c.clientSecret}`).toString('base64');
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: c.refreshToken }),
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function spotifyGet<T>(url: string, token: string): Promise<{ status: number; data: T | null }> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 204 || res.status >= 400) return { status: res.status, data: null };
  return { status: res.status, data: (await res.json()) as T };
}

/** La imagen más pequeña que mida al menos `min` px (ahorra datos en el juego). */
export function coverUrl(track: SpotifyTrack, min = 64): string | null {
  const imgs = [...track.album.images].sort((a, b) => a.width - b.width);
  return (imgs.find((i) => i.width >= min) ?? imgs[imgs.length - 1])?.url ?? null;
}

export function json(data: unknown, cache = 'no-store, max-age=0') {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json', 'Cache-Control': cache } });
}
