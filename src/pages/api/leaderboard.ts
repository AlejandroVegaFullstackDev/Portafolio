// Ranking global del Snake.
//   GET  /api/leaderboard                 → top 10 (público, cache 15 s)
//   POST /api/leaderboard  {action:'start', device}            → { seed, token }
//   POST /api/leaderboard  {action:'submit', token, name, moves, ticks} → { score, best, rank }
// Si falta configuración (Upstash o LEADERBOARD_SECRET) responde { enabled: false }.
import type { APIRoute } from 'astro';
import { hasRedis } from '../../lib/leaderboard/redis';
import { hasSecret } from '../../lib/leaderboard/crypto';
import { LbError, startSession, submitScore, topScores } from '../../lib/leaderboard/service';

export const prerender = false;

const MAX_BODY = 64 * 1024;
const send = (data: unknown, status = 200, cache = 'no-store') =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff' },
  });

const enabled = () => hasRedis() && hasSecret();
const clientIp = (req: Request, fallback: string) => req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || fallback || 'unknown';

export const GET: APIRoute = async () => {
  if (!enabled()) return send({ enabled: false });
  try {
    return send({ enabled: true, top: await topScores(10) }, 200, 'public, max-age=0, s-maxage=15');
  } catch {
    return send({ enabled: true, top: [], error: 'unavailable' }, 503);
  }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!enabled()) return send({ enabled: false }, 503);
  // Solo peticiones del propio sitio (mitiga envíos desde otros orígenes).
  const origin = request.headers.get('origin');
  if (origin && !/^https:\/\/(www\.)?4ledmt\.dev$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return send({ error: 'origin' }, 403);
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return send({ error: 'too-large' }, 413);

  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) return send({ error: 'too-large' }, 413);
    body = JSON.parse(text);
  } catch {
    return send({ error: 'bad-json' }, 400);
  }

  const ip = clientIp(request, clientAddress);
  try {
    if (body.action === 'start') return send(await startSession(ip, String(body.device ?? '')));
    if (body.action === 'submit') return send(await submitScore(ip, body));
    return send({ error: 'bad-action' }, 400);
  } catch (e) {
    if (e instanceof LbError) return send({ error: e.code }, e.status);
    return send({ error: 'unavailable' }, 503);
  }
};
