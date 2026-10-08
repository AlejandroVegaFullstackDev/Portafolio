// Criptografía del ranking (Web Crypto, sin dependencias).
// De LEADERBOARD_SECRET se derivan con HKDF tres llaves independientes:
//  - sign:  HMAC-SHA256 para firmar las sesiones de juego (integridad).
//  - hash:  HMAC-SHA256 para seudonimizar IP y dispositivo (nunca se guardan en claro).
//  - enc:   AES-256-GCM para cifrar cada registro antes de guardarlo (confidencialidad).

const te = new TextEncoder();
const td = new TextDecoder();

const b64url = (buf: ArrayBuffer | Uint8Array) =>
  Buffer.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf)).toString('base64url');
const fromB64url = (s: string) => new Uint8Array(Buffer.from(s, 'base64url'));

interface Keys { sign: CryptoKey; hash: CryptoKey; enc: CryptoKey }
let keysPromise: Promise<Keys> | null = null;

export function hasSecret() {
  return (import.meta.env.LEADERBOARD_SECRET ?? '').length >= 32;
}

async function keys(): Promise<Keys> {
  if (keysPromise) return keysPromise;
  keysPromise = (async () => {
    const secret = import.meta.env.LEADERBOARD_SECRET as string;
    const master = await crypto.subtle.importKey('raw', te.encode(secret), 'HKDF', false, ['deriveKey']);
    const derive = (info: string, alg: AesKeyGenParams | HmacImportParams, usages: KeyUsage[]) =>
      crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: te.encode('4ledmt-leaderboard-v1'), info: te.encode(info) }, master, alg, false, usages);
    const hmac = { name: 'HMAC', hash: 'SHA-256', length: 256 } as HmacImportParams;
    return {
      sign: await derive('sign', hmac, ['sign', 'verify']),
      hash: await derive('hash', hmac, ['sign']),
      enc: await derive('enc', { name: 'AES-GCM', length: 256 }, ['encrypt', 'decrypt']),
    };
  })();
  return keysPromise;
}

/** Seudónimo estable (no reversible) para IP o id de dispositivo. */
export async function pseudonym(value: string): Promise<string> {
  const sig = await crypto.subtle.sign('HMAC', (await keys()).hash, te.encode(value));
  return b64url(sig).slice(0, 22);
}

/** Token firmado: base64url(payload JSON) + "." + firma. */
export async function signToken(payload: object): Promise<string> {
  const body = b64url(te.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign('HMAC', (await keys()).sign, te.encode(body));
  return `${body}.${b64url(sig)}`;
}

export async function verifyToken<T>(token: string): Promise<T | null> {
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const ok = await crypto.subtle.verify('HMAC', (await keys()).sign, fromB64url(sig), te.encode(body));
  if (!ok) return null;
  try { return JSON.parse(td.decode(fromB64url(body))) as T; } catch { return null; }
}

/** AES-256-GCM con IV aleatorio de 96 bits: "iv.ciphertext" en base64url. */
export async function encrypt(data: object): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, (await keys()).enc, te.encode(JSON.stringify(data)));
  return `${b64url(iv)}.${b64url(ct)}`;
}

export async function decrypt<T>(blob: string): Promise<T | null> {
  const [iv, ct] = blob.split('.');
  try {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64url(iv) }, (await keys()).enc, fromB64url(ct));
    return JSON.parse(td.decode(pt)) as T;
  } catch {
    return null;
  }
}

export const randomId = (bytes = 16) => b64url(crypto.getRandomValues(new Uint8Array(bytes)));

/** Solo para tests: fuerza recalcular las llaves con otro secreto. */
export const _resetKeys = () => { keysPromise = null; };
