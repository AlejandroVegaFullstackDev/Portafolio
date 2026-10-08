// Validación de nombres del ranking. Se valida en el servidor (el cliente puede mentir)
// y además todo nombre se escapa al mostrarse.
//
// El filtro de groserías compara versiones "normalizadas" del nombre: sin tildes ni
// signos, con números leetspeak traducidos (4→a, 3→e, 1→i, 0→o, 5→s…), con letras
// repetidas colapsadas (fuuuck → fuck) y probando sustituciones típicas (v→u, y→i).
// Así "XPvssyDestroyerX" o "H1jueput4" no pasan.

const ALLOWED = /^[\p{L}\p{N} _.\-]+$/u;

const BLOCKED = [
  // reservados
  'admin', 'root', 'null', 'undefined', 'moderador',
  // español
  'hijueputa', 'hijodeputa', 'malparid', 'gonorrea', 'puta', 'puto', 'pendej', 'mierda', 'marica',
  'verga', 'culiao', 'perra', 'zorra', 'polla', 'follar', 'coño', 'mamaguev', 'imbecil', 'violad', 'violar',
  // inglés
  'fuck', 'shit', 'pussy', 'cunt', 'bitch', 'nigga', 'nigger', 'faggot', 'whore', 'slut', 'porn',
  // odio
  'nazi', 'hitler',
];

const LEET: Record<string, string> = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '9': 'g' };

/** minúsculas, sin tildes (salvo ñ), leet traducido y solo letras. */
function base(s: string) {
  return s
    .toLowerCase()
    .replace(/ñ/g, '\u0000')
    .normalize('NFD').replace(/\p{M}/gu, '')
    .replace(/\u0000/g, 'ñ')
    .replace(/[0-9]/g, (d) => LEET[d] ?? '')
    .replace(/[^a-zñ]/g, '');
}
const collapse = (s: string) => s.replace(/(.)\1+/g, '$1');

const NEEDLES = BLOCKED.map((w) => collapse(base(w)));

export function isOffensive(name: string): boolean {
  const b = base(name);
  const variants = new Set([b, b.replace(/v/g, 'u'), b.replace(/y/g, 'i'), b.replace(/v/g, 'u').replace(/y/g, 'i'), b.replace(/k/g, 'c'), b.replace(/z/g, 's')]);
  return [...variants].some((v) => {
    const c = collapse(v);
    return NEEDLES.some((n) => c.includes(n));
  });
}

export function cleanName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const name = raw.normalize('NFC').replace(/\s+/g, ' ').trim();
  if (name.length < 2 || name.length > 16) return null;
  if (!ALLOWED.test(name)) return null;
  if (isOffensive(name)) return null;
  return name;
}
