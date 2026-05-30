export const prerender = false;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  album: { images: { url: string }[] };
  duration_ms: number;
};

function json(data: Record<string, unknown>) {
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, max-age=0' },
  });
}

function trackPayload(track: SpotifyTrack, extra: Record<string, unknown>) {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    songUrl: track.external_urls.spotify,
    albumImageUrl: track.album.images[0]?.url ?? null,
    duration_ms: track.duration_ms ?? 0,
    ...extra,
  };
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string) {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
  });
  return res.json() as Promise<{ access_token: string }>;
}

export async function GET() {
  const empty = json({ isPlaying: false, isRecent: false });

  try {
    const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) return empty;

    const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);
    const res = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (res.status !== 204 && res.status < 400) {
      const data = await res.json();
      if (data?.item) {
        return json(trackPayload(data.item, {
          isPlaying: data.is_playing,
          isRecent: false,
          progress_ms: data.progress_ms ?? 0,
        }));
      }
    }

    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (recentRes.status >= 400) return empty;

    const recentData = await recentRes.json();
    const recent = recentData?.items?.[0];
    if (!recent?.track) return empty;

    return json(trackPayload(recent.track, {
      isPlaying: false,
      isRecent: true,
      playedAt: recent.played_at,
      progress_ms: 0,
    }));
  } catch {
    return empty;
  }
}
