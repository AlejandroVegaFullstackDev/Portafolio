// Vistas previas de 30 s desde la API pública de Deezer (sin cuenta ni llave).
// Spotify ya no entrega previews a apps nuevas; Deezer sí.

type Hit = { data?: { preview?: string }[] };

/** Quita sufijos que estorban la búsqueda: "Rooster (2022 Remaster)" → "Rooster". */
export const cleanTitle = (s: string) => s.replace(/\s*[-–(].*?(remaster|live|unplugged|version|mono|stereo|edit).*$/i, '').trim();

async function search(q: string): Promise<string | null> {
  const res = await fetch(`https://api.deezer.com/search?limit=1&q=${encodeURIComponent(q)}`);
  if (!res.ok) return null;
  return ((await res.json()) as Hit).data?.[0]?.preview || null;
}

export async function findPreview(artist: string, title: string): Promise<string | null> {
  const a = artist.split(',')[0].trim();
  const t = cleanTitle(title);
  if (!a || !t) return null;
  try {
    return (await search(`artist:"${a}" track:"${t}"`)) ?? (await search(`${a} ${t}`));
  } catch {
    return null;
  }
}

/** Resuelve muchas en paralelo con un límite de concurrencia (Deezer: 50 req / 5 s). */
export async function findPreviews<T extends { artist: string; title: string }>(items: T[], concurrency = 6) {
  const out: (string | null)[] = new Array(items.length).fill(null);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await findPreview(items[i].artist, items[i].title);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return out;
}
