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
import { rateLimit, redis } from './redis';
import { cleanName } from './names';
import { replay, type Move } from '../../scripts/game/replay';

const BOARD_KEY = 'lb:v1:global';
const ENTRY_KEY = 'lb:v1:entry';
const KEEP = 200;                 // entradas que se conservan en el ranking
const TOKEN_TTL_MS = 30 * 60_000; // una partida no puede durar más de 30 min
const TIME_SLACK = 0.85;          // margen por jitter de red/frames

interface Session { v: 1; seed: number; nonce: string; iat: number; dev: string }
interface Entry { name: string; score: number; at: number }

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

  // Un token = una partida: el nonce se marca como usado (NX) y expira solo.
  const [fresh] = await redis<[string | null]>(['SET', `lb:v1:nonce:${session.nonce}`, '1', 'NX', 'PX', TOKEN_TTL_MS * 2]);
  if (fresh !== 'OK') throw new LbError(409, 'replayed');

  // Mejor puntaje por dispositivo (GT = solo sube).
  const [, best] = await redis<[number, string | null]>(['ZADD', BOARD_KEY, 'GT', result.score, session.dev], ['ZSCORE', BOARD_KEY, session.dev]);
  const bestScore = Number(best ?? result.score);
  const record = await encrypt({ name, score: bestScore, at: now } satisfies Entry);
  const [, , rank] = await redis<[number, number, number | null]>(
    ['HSET', ENTRY_KEY, session.dev, record],
    ['ZREMRANGEBYRANK', BOARD_KEY, 0, -(KEEP + 1)],
    ['ZREVRANK', BOARD_KEY, session.dev],
  );
  return { score: result.score, best: bestScore, rank: rank === null ? null : rank + 1 };
}

export async function topScores(limit = 10) {
  // Se piden de más por si hay que descartar nombres que el filtro actual ya no acepta.
  const [flat] = await redis<[string[]]>(['ZREVRANGE', BOARD_KEY, 0, limit * 2 - 1, 'WITHSCORES']);
  if (!flat?.length) return [];
  const members = flat.filter((_, i) => i % 2 === 0);
  const [blobs] = await redis<[(string | null)[]]>(['HMGET', ENTRY_KEY, ...members]);
  const rows: { name: string; score: number }[] = [];
  const purge: string[] = [];
  for (let i = 0; i < members.length; i++) {
    const e = blobs[i] ? await decrypt<Entry>(blobs[i]!) : null;
    if (!e || !cleanName(e.name)) { purge.push(members[i]); continue; }
    rows.push({ name: e.name, score: Number(flat[i * 2 + 1]) });
  }
  // Registros con nombres que ya no pasan el filtro (o ilegibles) salen del ranking.
  if (purge.length) await redis(['ZREM', BOARD_KEY, ...purge], ['HDEL', ENTRY_KEY, ...purge]).catch(() => {});
  return rows.slice(0, limit);
}
