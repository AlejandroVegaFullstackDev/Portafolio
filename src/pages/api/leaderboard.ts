// Ranking global del Snake.
//   GET  /api/leaderboard                 → top 10 (público, cache 15 s)
//   POST /api/leaderboard  {action:'start', device}            → { seed, token }
//   POST /api/leaderboard  {action:'submit', token, name, moves, ticks} → { score, best, rank }
// Si falta configuración (Upstash o LEADERBOARD_SECRET) responde { enabled: false }.
import type { APIRoute } from 'astro';
import { hasRedis } from '../../lib/leaderboard/redis';
import { hasSecret } from '../../lib/leaderboard/crypto';
import { LbError, startSession, submitScore, topScores } from '../../lib/leaderboard/service';
import { json } from '../../lib/http';

export const prerender = false;

const MAX_BODY = 64 * 1024;

const enabled = () => hasRedis() && hasSecret();

export const GET: APIRoute = async () => {
  if (!enabled()) return json({ enabled: false });
  try {
    return json({ enabled: true, top: await topScores(10) }, 200, 'public, max-age=0, s-maxage=15');
  } catch {
    return json({ enabled: true, top: [], error: 'unavailable' }, 503);
  }
};

export const POST: APIRoute = async (context) => {
  const { request } = context;
  if (!enabled()) return json({ enabled: false }, 503);
  // Solo peticiones del propio sitio (mitiga envíos desde otros orígenes).
  const origin = request.headers.get('origin');
  if (!origin || !/^https:\/\/(www\.)?4ledmt\.dev$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return json({ error: 'origin' }, 403);
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return json({ error: 'too-large' }, 413);

  let body: Record<string, unknown>;
  try {
    const bytes = new Uint8Array(MAX_BODY);
    const reader = request.body?.getReader();
    if (!reader) return json({ error: 'bad-json' }, 400);
    let length = 0;
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (length + value.byteLength > MAX_BODY) {
          void reader.cancel().catch(() => {});
          return json({ error: 'too-large' }, 413);
        }
        bytes.set(value, length);
        length += value.byteLength;
      }
    } finally {
      reader.releaseLock();
    }
    const parsed: unknown = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes.subarray(0, length)));
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return json({ error: 'bad-json' }, 400);
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: 'bad-json' }, 400);
  }

  try {
    if (body.action === 'start') {
      if (typeof body.device !== 'string') return json({ error: 'bad-device' }, 400);
      return json(await startSession(context.clientAddress, body.device));
    }
    if (body.action === 'submit') {
      if (typeof body.token !== 'string') return json({ error: 'bad-token' }, 400);
      if (typeof body.name !== 'string') return json({ error: 'bad-name' }, 400);
      if (!Array.isArray(body.moves)) return json({ error: 'bad-moves' }, 400);
      if (!Number.isInteger(body.ticks)) return json({ error: 'bad-ticks' }, 400);
      return json(await submitScore(context.clientAddress, body));
    }
    return json({ error: 'bad-action' }, 400);
  } catch (e) {
    if (e instanceof LbError) return json({ error: e.code }, e.status);
    return json({ error: 'unavailable' }, 503);
  }
};
