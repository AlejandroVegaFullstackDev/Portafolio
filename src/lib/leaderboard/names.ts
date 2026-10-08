// Validación de nombres del ranking. Se valida en el servidor (el cliente puede mentir)
// y además todo nombre se escapa al mostrarse.

const ALLOWED = /^[\p{L}\p{N} _.\-]+$/u;
const BLOCKED = ['admin', 'root', 'null', 'undefined', 'hijueputa', 'gonorrea', 'puta', 'fuck', 'shit', 'nazi'];

export function cleanName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const name = raw.normalize('NFC').replace(/\s+/g, ' ').trim();
  if (name.length < 2 || name.length > 16) return null;
  if (!ALLOWED.test(name)) return null;
  const lower = name.toLowerCase().replace(/[\s_.\-]/g, '');
  if (BLOCKED.some((w) => lower.includes(w))) return null;
  return name;
}
