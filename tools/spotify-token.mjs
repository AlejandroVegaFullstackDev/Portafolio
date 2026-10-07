// Genera un SPOTIFY_REFRESH_TOKEN con los permisos que usa el sitio.
//
// Uso (en un PC, una sola vez):
//   1. En https://developer.spotify.com/dashboard → tu app → Settings → Redirect URIs,
//      agrega exactamente:  http://127.0.0.1:8888/callback   y guarda.
//   2. npx vercel env pull .env.local   (trae las variables de Vercel; .env.local está en .gitignore)
//      npm run spotify-token
//   3. Abre el link que imprime, acepta, y copia el refresh token que sale en la terminal.
//   4. Pégalo en Vercel → Settings → Environment Variables → SPOTIFY_REFRESH_TOKEN y redeploy.
import http from 'node:http';
import { existsSync, readFileSync } from 'node:fs';

// También lee .env.local / .env (p. ej. tras `npx vercel env pull .env.local`).
for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error('Faltan SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET en el entorno.');
  process.exit(1);
}

const PORT = 8888;
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = ['user-read-currently-playing', 'user-read-recently-played', 'user-top-read'];

const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
  client_id: id, response_type: 'code', redirect_uri: REDIRECT, scope: SCOPES.join(' '), show_dialog: 'true',
});

http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', REDIRECT);
  if (url.pathname !== '/callback') { res.writeHead(404).end(); return; }
  const code = url.searchParams.get('code');
  if (!code) { res.end('Spotify no devolvió código: ' + (url.searchParams.get('error') ?? '¿?')); return; }

  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT }),
  });
  const data = await r.json();
  if (!data.refresh_token) {
    res.end('Error: ' + JSON.stringify(data));
    console.error(data);
  } else {
    res.end('Listo. Vuelve a la terminal y copia el refresh token.');
    console.log('\nPermisos:', data.scope);
    console.log('\nSPOTIFY_REFRESH_TOKEN=' + data.refresh_token + '\n');
  }
  setTimeout(() => process.exit(0), 300);
}).listen(PORT, '127.0.0.1', () => {
  console.log('Abre este link en el navegador y acepta:\n\n' + authUrl + '\n');
});
