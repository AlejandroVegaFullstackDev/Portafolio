// Canción sonando ahora (o la última reproducida) para el widget y la franja de estado.
import { coverUrl, getAccessToken, json, spotifyGet, type SpotifyTrack } from '../../lib/spotify';

export const prerender = false;

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
  const empty = json({ isPlaying: false, isRecent: false });
  try {
    const token = await getAccessToken();
    if (!token) return empty;

    const now = await spotifyGet<{ item?: SpotifyTrack; is_playing: boolean; progress_ms?: number }>(NOW_PLAYING_URL, token);
    if (now.data?.item) {
      return json(trackPayload(now.data.item, { isPlaying: now.data.is_playing, isRecent: false, progress_ms: now.data.progress_ms ?? 0 }));
    }

    const recent = await spotifyGet<{ items?: { track: SpotifyTrack; played_at: string }[] }>(RECENTLY_PLAYED_URL, token);
    const item = recent.data?.items?.[0];
    if (!item?.track) return empty;
    return json(trackPayload(item.track, { isPlaying: false, isRecent: true, playedAt: item.played_at, progress_ms: 0 }));
  } catch {
    return empty;
  }
}
