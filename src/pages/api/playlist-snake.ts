// Canciones para el Snake, con su vista previa ya resuelta (así no hay espera al comer).
// Fuente: la playlist del sitio (SPOTIFY_SNAKE_PLAYLIST o la de abajo); si no se puede
// leer, lo último escuchado → top tracks. Solo cachea respuestas con canciones.
// `source` y `status` sirven para diagnosticar y no exponen secretos.
import { coverUrl, credentials, getAccessToken, json, spotifyGet, type SpotifyTrack } from '../../lib/spotify';
import { findPreviews } from '../../lib/deezer';

export const prerender = false;

const PLAYLIST_ID = import.meta.env.SPOTIFY_SNAKE_PLAYLIST || '5Xc3x3ELDWOkBcnHtFPumm';
const MAX = 40;
// Las previews de Deezer vienen firmadas y vencen en horas: 30 min de CDN es seguro.
const CACHE_OK = 'public, max-age=0, s-maxage=1800, stale-while-revalidate=600';
const NO_CACHE = 'no-store, max-age=0';

export interface SnakeTrack { id: string; title: string; artist: string; cover: string | null; art: string | null; uri: string; url: string; preview: string | null }
type PlaylistRow = { item?: SpotifyTrack | null; track?: SpotifyTrack | null };

const unique = (list: (SpotifyTrack | null | undefined)[]) => {
  const seen = new Set<string>();
  return list.filter((t): t is SpotifyTrack => !!t?.id && !seen.has(t.id) && !!seen.add(t.id));
};

export async function GET() {
  if (!credentials()) return json({ tracks: [], source: 'none', status: 'missing-env' }, NO_CACHE);
  try {
    const token = await getAccessToken();
    if (!token) return json({ tracks: [], source: 'none', status: 'token-refresh-failed' }, NO_CACHE);
    const statuses: Record<string, number> = {};

    // Desde feb-2026 Spotify movió /tracks → /items (y `track` → `item`), y solo devuelve
    // el contenido de playlists que el dueño del token creó o en las que colabora.
    const pl = await spotifyGet<{ items?: PlaylistRow[]; next?: string | null }>(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/items?limit=50&additional_types=track`, token);
    statuses.playlist = pl.status;
    let rows = pl.data?.items ?? [];
    if (pl.data?.next) {
      const more = await spotifyGet<{ items?: PlaylistRow[] }>(pl.data.next, token);
      rows = rows.concat(more.data?.items ?? []);
    }
    if (!rows.length) {
      // Compatibilidad con el endpoint viejo, por si la app aún lo tiene.
      const old = await spotifyGet<{ items?: PlaylistRow[] }>(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=100`, token);
      statuses.playlistLegacy = old.status;
      rows = old.data?.items ?? [];
    }
    let list = unique(rows.map((r) => r.item ?? r.track).filter((t) => !!t?.album));
    let source = 'playlist';

    if (!list.length) {
      const recent = await spotifyGet<{ items?: { track: SpotifyTrack }[] }>('https://api.spotify.com/v1/me/player/recently-played?limit=50', token);
      statuses.recent = recent.status;
      list = unique((recent.data?.items ?? []).map((i) => i.track));
      source = 'recently-played';
    }
    if (!list.length) {
      const top = await spotifyGet<{ items?: SpotifyTrack[] }>('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', token);
      statuses.top = top.status;
      list = unique(top.data?.items ?? []);
      source = 'top-tracks';
    }

    // Orden aleatorio para que cada partida empiece distinto.
    list = list.sort(() => Math.random() - 0.5).slice(0, MAX);
    const base = list.map((t) => ({
      id: t.id,
      title: t.name,
      artist: t.artists.map((a) => a.name).join(', '),
      cover: coverUrl(t, 64),
      art: coverUrl(t, 300), // carátula grande para el vinilo
      uri: t.uri,
      url: t.external_urls.spotify,
    }));
    const previews = await findPreviews(base);
    const tracks: SnakeTrack[] = base.map((t, i) => ({ ...t, preview: previews[i] }));

    return json({ tracks, source: tracks.length ? source : 'none', status: statuses }, tracks.length ? CACHE_OK : NO_CACHE);
  } catch {
    return json({ tracks: [], source: 'none', status: 'error' }, NO_CACHE);
  }
}
