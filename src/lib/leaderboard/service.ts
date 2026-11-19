// Lógica del ranking global (independiente de HTTP para poder testearla).
//
// Flujo:
//  1. startSession(): el servidor elige una semilla aleatoria y la firma (HMAC) junto a
//     un nonce, la hora y el seudónimo del dispositivo.
//  2. El navegador juega con esa semilla y guarda los giros [tick, dir].
//  3. submitScore(): se verifica la firma, que el nonce no se haya usado, la edad del
//     token, que la partida haya durado lo mínimo posible, y se REPITE la partida en el
//     servidor. El puntaje que cuenta es el de la repetición, nunca el que dice el cliente.
//  4. Se guarda el mejor puntaje por dispositivo; el registro va cifrado (AES-256-GCM).
import { decrypt, encrypt, pseudonym, randomId, signToken, verifyToken } from './crypto';
import { rateLimit, redis, redisMulti } from './redis';
import { cleanName } from './names';
import { replay, type Move } from '../../scripts/game/replay';

const BOARD_KEY = 'lb:v1:global';
const ENTRY_KEY = 'lb:v1:entry';
const KEEP = 200;                 // entradas que se conservan en el ranking
const TOKEN_TTL_MS = 30 * 60_000; // una partida no puede durar más de 30 min
const TIME_SLACK = 0.85;          // margen por jitter de red/frames

interface Session { v: 1; seed: number; nonce: string; iat: number; dev: string }
interface Entry { name: string; at: number }

// La condición del nonce se evalúa dentro de EXEC. Redis no revierte errores
// de ejecución: se comprueban ambos tipos de clave antes de escribir.
const SAVE_SCORE = `
  local board, entries, nonce = KEYS[1], KEYS[2], KEYS[3]
  local member, score, record, keep, ttl = unpack(ARGV)
  if redis.call('EXISTS', nonce) == 1 then return false end
  redis.call('ZSCORE', board, member)
  redis.call('HEXISTS', entries, member)
  redis.call('ZADD', board, 'GT', score, member)
  local best = redis.call('ZSCORE', board, member)
  redis.call('HSET', entries, member, record)
  redis.call('ZREMRANGEBYRANK', board, 0, -(tonumber(keep) + 1))
  redis.call('SET', nonce, '1', 'PX', ttl)
  return {best, redis.call('ZREVRANK', board, member)}
`;

export class LbError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}

export async function startSession(ip: string, deviceId: string) {
  if (!(await rateLimit(`lb:v1:rl:start:${await pseudonym(ip)}`, 40, 600))) throw new LbError(429, 'rate-limited');
  const seed = crypto.getRandomValues(new Uint32Array(1))[0];
  const dev = await pseudonym(`dev:${deviceId.slice(0, 64)}`);
  const token = await signToken({ v: 1, seed, nonce: randomId(), iat: Date.now(), dev } satisfies Session);
  return { seed, token };
}

export async function submitScore(ip: string, body: { token?: unknown; name?: unknown; moves?: unknown; ticks?: unknown }, now = Date.now()) {
  if (!(await rateLimit(`lb:v1:rl:submit:${await pseudonym(ip)}`, 12, 600))) throw new LbError(429, 'rate-limited');

  const session = typeof body.token === 'string' ? await verifyToken<Session>(body.token) : null;
  if (!session || session.v !== 1) throw new LbError(400, 'bad-token');
  if (now - session.iat > TOKEN_TTL_MS) throw new LbError(400, 'expired');

  const name = cleanName(body.name);
  if (!name) throw new LbError(400, 'bad-name');

  const moves = body.moves;
  if (!Array.isArray(moves) || moves.length > 40_000 || !moves.every((m) => Array.isArray(m) && m.length === 2 && Number.isInteger(m[0]) && typeof m[1] === 'string')) {
    throw new LbError(400, 'bad-moves');
  }
  const result = replay(session.seed, moves as Move[], Number(body.ticks));
  if (!result.ok) throw new LbError(400, `replay-${result.reason}`);
  if (result.score < 1) throw new LbError(400, 'zero');
  if (now - session.iat < result.minMs * TIME_SLACK) throw new LbError(400, 'too-fast');

  // El conjunto ordenado es la fuente del puntaje. El registro cifrado guarda el nombre.
  const record = await encrypt({ name, at: now } satisfies Entry);
  const [saved] = await redisMulti<[[string, number | null] | null]>([
    'EVAL', SAVE_SCORE, 3, BOARD_KEY, ENTRY_KEY, `lb:v1:nonce:${session.nonce}`,
    session.dev, result.score, record, KEEP, TOKEN_TTL_MS * 2,
  ]);
  if (!saved) throw new LbError(409, 'replayed');
  const [best, rank] = saved;
  return { score: result.score, best: Number(best), rank: rank === null ? null : rank + 1 };
}

export async function topScores(limit = 10) {
  // Se revisa todo el ranking acotado para llenar el top aunque haya filas incompletas.
  const [flat] = await redis<[string[]]>(['ZREVRANGE', BOARD_KEY, 0, KEEP - 1, 'WITHSCORES']);
  if (!flat?.length) return [];
  const members = flat.filter((_, i) => i % 2 === 0);
  const [blobs] = await redis<[(string | null)[]]>(['HMGET', ENTRY_KEY, ...members]);
  const rows: { name: string; score: number }[] = [];
  for (let i = 0; i < members.length && rows.length < limit; i++) {
    const e = blobs[i] ? await decrypt<Entry>(blobs[i]!) : null;
    if (!e || !cleanName(e.name)) continue;
    rows.push({ name: e.name, score: Number(flat[i * 2 + 1]) });
  }
  return rows;
}
