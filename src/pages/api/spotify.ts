import type { APIRoute } from 'astro';

export const prerender = false;

const CLIENT_ID     = import.meta.env.SPOTIFY_CLIENT_ID     as string | undefined;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET as string | undefined;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN as string | undefined;

const TOKEN_ENDPOINT       = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Access-Control-Allow-Origin': '*',
};

async function getAccessToken(): Promise<string> {
  const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN!,
    }),
  });
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

export const GET: APIRoute = async () => {
  // Return fallback if env vars not configured
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return new Response(
      JSON.stringify({ isPlaying: false, configured: false }),
      { status: 200, headers: BASE_HEADERS }
    );
  }

  try {
    const access_token = await getAccessToken();
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 204 = nothing playing
    if (res.status === 204) {
      return new Response(
        JSON.stringify({ isPlaying: false }),
        { status: 200, headers: BASE_HEADERS }
      );
    }

    if (res.status >= 400) {
      return new Response(
        JSON.stringify({ isPlaying: false, error: `spotify_${res.status}` }),
        { status: 200, headers: BASE_HEADERS }
      );
    }

    const song = await res.json() as {
      is_playing: boolean;
      progress_ms: number;
      item: {
        name: string;
        duration_ms: number;
        external_urls: { spotify: string };
        album: { name: string; images: { url: string }[] };
        artists: { name: string }[];
      };
    };

    if (!song?.item) {
      return new Response(
        JSON.stringify({ isPlaying: false }),
        { status: 200, headers: BASE_HEADERS }
      );
    }

    return new Response(JSON.stringify({
      isPlaying:    song.is_playing,
      title:        song.item.name,
      artist:       song.item.artists.map(a => a.name).join(', '),
      album:        song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url ?? null,
      songUrl:      song.item.external_urls.spotify,
      progress_ms:  song.progress_ms ?? 0,
      duration_ms:  song.item.duration_ms,
    }), { status: 200, headers: BASE_HEADERS });

  } catch (err) {
    return new Response(
      JSON.stringify({ isPlaying: false, error: 'internal' }),
      { status: 200, headers: BASE_HEADERS }
    );
  }
};
