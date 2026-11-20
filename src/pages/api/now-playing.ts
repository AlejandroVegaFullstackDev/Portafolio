// Canción sonando ahora (o la última reproducida) para el widget y la franja de estado.
import { coverUrl, getAccessToken, spotifyGet, type SpotifyTrack } from '../../lib/spotify';
import { json } from '../../lib/http';

export const prerender = false;

// Caché corta en el CDN: el widget sigue casi en vivo y una ráfaga de peticiones no llega a Spotify.
const CACHE = 'public, max-age=0, s-maxage=15, stale-while-revalidate=15';

const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

function trackPayload(track: SpotifyTrack, extra: Record<string, unknown>) {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    songUrl: track.external_urls.spotify,
    albumImageUrl: coverUrl(track, 300),
    duration_ms: track.duration_ms ?? 0,
    ...extra,
  };
}

export async function GET() {
  const empty = json({ isPlaying: false, isRecent: false }, 200, CACHE);
  try {
    const token = await getAccessToken();
    if (!token) return empty;

    const now = await spotifyGet<{ item?: SpotifyTrack; is_playing: boolean; progress_ms?: number }>(NOW_PLAYING_URL, token);
    if (now.data?.item) {
      return json(trackPayload(now.data.item, { isPlaying: now.data.is_playing, isRecent: false, progress_ms: now.data.progress_ms ?? 0 }), 200, CACHE);
    }

    const recent = await spotifyGet<{ items?: { track: SpotifyTrack; played_at: string }[] }>(RECENTLY_PLAYED_URL, token);
    const item = recent.data?.items?.[0];
    if (!item?.track) return empty;
    return json(trackPayload(item.track, { isPlaying: false, isRecent: true, playedAt: item.played_at, progress_ms: 0 }), 200, CACHE);
  } catch {
    return empty;
  }
}
