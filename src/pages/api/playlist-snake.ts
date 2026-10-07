// Canciones para el Snake: lo último que escuchó el dueño del sitio en Spotify, sin
// repetidos. Se cachea 1 h en el CDN (no hace falta tiempo real y cuida la cuota).
import { coverUrl, getAccessToken, json, spotifyGet, type SpotifyTrack } from '../../lib/spotify';

export const prerender = false;

const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
const CACHE = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';

export interface SnakeTrack {
  id: string;
  title: string;
  artist: string;
  cover: string | null;
  uri: string;
  url: string;
}

export async function GET() {
  try {
    const token = await getAccessToken();
    if (!token) return json({ tracks: [] }, CACHE);
    const { data } = await spotifyGet<{ items?: { track: SpotifyTrack }[] }>(RECENT_URL, token);
    const seen = new Set<string>();
    const tracks: SnakeTrack[] = [];
    for (const { track } of data?.items ?? []) {
      if (!track?.id || seen.has(track.id)) continue;
      seen.add(track.id);
      tracks.push({
        id: track.id,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        cover: coverUrl(track, 64),
        uri: track.uri,
        url: track.external_urls.spotify,
      });
    }
    return json({ tracks }, CACHE);
  } catch {
    return json({ tracks: [] });
  }
}
