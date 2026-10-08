// Cliente Redis del ranking. Soporta las dos integraciones de Vercel:
//   · "Redis" (Redis Cloud)  → REDIS_URL (redis:// o rediss://, conexión TCP)
//   · "Upstash for Redis"    → KV_REST_API_URL + KV_REST_API_TOKEN (REST)
import type { RedisClientType } from 'redis';

const restUrl = () => import.meta.env.KV_REST_API_URL || import.meta.env.UPSTASH_REDIS_REST_URL;
const restToken = () => import.meta.env.KV_REST_API_TOKEN || import.meta.env.UPSTASH_REDIS_REST_TOKEN;
// LEADERBOARD_SECRET_REDIS_URL: nombre que quedó al conectar la base con ese prefijo en Vercel.
const tcpUrl = () =>
  import.meta.env.REDIS_URL || import.meta.env.LEADERBOARD_SECRET_REDIS_URL || process.env.REDIS_URL || process.env.LEADERBOARD_SECRET_REDIS_URL;

export const hasRedis = () => Boolean((restUrl() && restToken()) || tcpUrl());

type Cmd = (string | number)[];

// Una sola conexión por instancia de la función (se reutiliza entre peticiones).
let client: Promise<RedisClientType> | null = null;
function tcp() {
  client ??= (async () => {
    const { createClient } = await import('redis');
    const c = createClient({ url: tcpUrl(), socket: { connectTimeout: 4000, reconnectStrategy: (n) => (n > 3 ? false : 200) } }) as RedisClientType;
    c.on('error', () => { client = null; }); // fuerza reconexión en la próxima petición
    await c.connect();
    return c;
  })().catch((e) => { client = null; throw e; });
  return client;
}

/** Ejecuta varios comandos en un solo viaje (pipeline) y devuelve sus resultados. */
export async function redis<T = unknown[]>(...cmds: Cmd[]): Promise<T> {
  if (!(restUrl() && restToken())) {
    const c = await tcp();
    // node-redis agrupa en un pipeline los comandos enviados en el mismo tick.
    return (await Promise.all(cmds.map((cmd) => c.sendCommand(cmd.map(String))))) as T;
  }
  const res = await fetch(`${restUrl()}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${restToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  const err = out.find((r) => r.error);
  if (err) throw new Error(err.error);
  return out.map((r) => r.result) as T;
}

/** Límite de peticiones por ventana fija. Devuelve true si se permite. */
export async function rateLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  const [count] = await redis<[number, number]>(['INCR', key], ['EXPIRE', key, windowSec, 'NX']);
  return Number(count) <= max;
}
