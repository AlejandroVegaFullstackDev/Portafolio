export const prerender = false;

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';

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
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  const empty = new Response(JSON.stringify({ isPlaying: false }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, max-age=0' },
  });

  if (!clientId || !clientSecret || !refreshToken) return empty;

  try {
    const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);
    const res = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (res.status === 204 || res.status >= 400) return empty;

    const data = await res.json();
    if (!data?.item) return empty;

    return new Response(
      JSON.stringify({
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: (data.item.artists as { name: string }[]).map((a) => a.name).join(', '),
        songUrl: data.item.external_urls.spotify,
        albumImageUrl: (data.item.album.images as { url: string }[])[0]?.url ?? null,
        progress_ms: data.progress_ms ?? 0,
        duration_ms: data.item.duration_ms ?? 0,
      }),
      { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store, max-age=0' } },
    );
  } catch {
    return empty;
  }
}
