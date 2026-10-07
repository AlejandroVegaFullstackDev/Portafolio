// Canciones para el Snake. Prueba en orden: lo último escuchado → top tracks → lo que
// suena ahora. Solo cachea respuestas con canciones (un fallo no queda guardado 1 h).
// `source` y `status` sirven para diagnosticar: no exponen ningún secreto.
import { coverUrl, credentials, getAccessToken, json, spotifyGet, type SpotifyTrack } from '../../lib/spotify';

export const prerender = false;

const CACHE_OK = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';
const NO_CACHE = 'no-store, max-age=0';

export interface SnakeTrack { id: string; title: string; artist: string; cover: string | null; uri: string; url: string }

const toSnake = (t: SpotifyTrack): SnakeTrack => ({
  id: t.id,
  title: t.name,
  artist: t.artists.map((a) => a.name).join(', '),
  cover: coverUrl(t, 64),
  uri: t.uri,
  url: t.external_urls.spotify,
});

const unique = (list: SpotifyTrack[]) => {
  const seen = new Set<string>();
  return list.filter((t) => t?.id && !seen.has(t.id) && seen.add(t.id));
};

export async function GET() {
  if (!credentials()) return json({ tracks: [], source: 'none', status: 'missing-env' }, NO_CACHE);
  try {
    const token = await getAccessToken();
    if (!token) return json({ tracks: [], source: 'none', status: 'token-refresh-failed' }, NO_CACHE);

    const statuses: Record<string, number> = {};

    const recent = await spotifyGet<{ items?: { track: SpotifyTrack }[] }>('https://api.spotify.com/v1/me/player/recently-played?limit=50', token);
    statuses.recent = recent.status;
    let list = unique((recent.data?.items ?? []).map((i) => i.track));
    let source = 'recently-played';

    if (!list.length) {
      const top = await spotifyGet<{ items?: SpotifyTrack[] }>('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', token);
      statuses.top = top.status;
      list = unique(top.data?.items ?? []);
      source = 'top-tracks';
    }
    if (!list.length) {
      const now = await spotifyGet<{ item?: SpotifyTrack }>('https://api.spotify.com/v1/me/player/currently-playing', token);
      statuses.now = now.status;
      list = now.data?.item ? [now.data.item] : [];
      source = 'currently-playing';
    }

    const tracks = list.map(toSnake);
    return json({ tracks, source: tracks.length ? source : 'none', status: statuses }, tracks.length ? CACHE_OK : NO_CACHE);
  } catch {
    return json({ tracks: [], source: 'none', status: 'error' }, NO_CACHE);
  }
}
