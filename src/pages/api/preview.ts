// Vista previa de 30 s de una canción para el Snake. Spotify ya no entrega previews a
// apps nuevas, así que se buscan en la API pública de Deezer (sin cuenta ni llave).
// GET /api/preview?artist=...&title=...  →  { preview: string | null }
import type { APIRoute } from 'astro';
import { json } from '../../lib/spotify';

export const prerender = false;

const clean = (s: string) => s.replace(/\s*[-–(].*?(remaster|live|unplugged|version|mono|stereo).*$/i, '').trim();

export const GET: APIRoute = async ({ url }) => {
  const artist = (url.searchParams.get('artist') ?? '').split(',')[0].trim();
  const title = url.searchParams.get('title') ?? '';
  if (!artist || !title) return json({ preview: null }, 'no-store');

  try {
    const q = `artist:"${artist}" track:"${clean(title)}"`;
    const res = await fetch(`https://api.deezer.com/search?limit=1&q=${encodeURIComponent(q)}`);
    const data = (await res.json()) as { data?: { preview?: string }[] };
    let preview = data.data?.[0]?.preview || null;
    if (!preview) {
      // Segundo intento, búsqueda libre (títulos con símbolos o versiones raras).
      const loose = await fetch(`https://api.deezer.com/search?limit=1&q=${encodeURIComponent(`${artist} ${clean(title)}`)}`);
      preview = ((await loose.json()) as { data?: { preview?: string }[] }).data?.[0]?.preview || null;
    }
    // Las URLs de preview vienen firmadas y vencen: cache corto.
    return json({ preview }, preview ? 'public, max-age=0, s-maxage=1800' : 'no-store');
  } catch {
    return json({ preview: null }, 'no-store');
  }
};
