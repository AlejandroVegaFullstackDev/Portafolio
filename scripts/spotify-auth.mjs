/**
 * One-time script to get your Spotify refresh token.
 *
 * Steps:
 *  1. Create an app at https://developer.spotify.com/dashboard
 *  2. In the app settings add Redirect URI: http://localhost:8888/callback
 *  3. Copy Client ID and Client Secret into your .env file
 *  4. Run: node scripts/spotify-auth.mjs
 *  5. Open the URL shown in the browser and authorize
 *  6. Copy SPOTIFY_REFRESH_TOKEN into your .env file
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';

// Load .env manually (no dotenv dependency needed)
let CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
let CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  if (existsSync('.env')) {
    const raw = readFileSync('.env', 'utf8');
    for (const line of raw.split('\n')) {
      const [k, ...rest] = line.split('=');
      const v = rest.join('=').trim();
      if (k?.trim() === 'SPOTIFY_CLIENT_ID')     CLIENT_ID     = v;
      if (k?.trim() === 'SPOTIFY_CLIENT_SECRET')  CLIENT_SECRET = v;
    }
  }
}

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n❌ Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env\n');
  process.exit(1);
}

const REDIRECT_URI = 'http://localhost:8888/callback';
const SCOPES = [
  'user-read-currently-playing',
  'user-read-playback-state',
].join(' ');

const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

console.log('\n🎵  Spotify Auth Helper\n');
console.log('Open this URL in your browser:\n');
console.log(authUrl);
console.log('\nWaiting for callback on http://localhost:8888 ...\n');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:8888`);
  if (url.pathname !== '/callback') return;

  const code = url.searchParams.get('code');
  if (!code) {
    res.end('<h2>Error: no code received. Try again.</h2>');
    server.close();
    return;
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.refresh_token) {
    console.error('\n❌ Failed to get refresh token:', JSON.stringify(tokens));
    res.end('<h2>❌ Error getting token. Check terminal.</h2>');
    server.close();
    return;
  }

  console.log('\n✅ Add this line to your .env file:\n');
  console.log(`SPOTIFY_REFRESH_TOKEN=${tokens.refresh_token}\n`);

  res.end(`
    <html><body style="font-family:monospace;background:#050507;color:#5cffb1;padding:2rem;">
      <h2>✅ Done!</h2>
      <p>Check your terminal and copy the SPOTIFY_REFRESH_TOKEN to your .env file.</p>
    </body></html>
  `);
  server.close();
});

server.listen(8888);
