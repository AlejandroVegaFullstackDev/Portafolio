// Vista previa de una canción suelta (respaldo si la lista no trajo la suya).
// GET /api/preview?artist=...&title=...  →  { preview: string | null }
import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { json } from '../../lib/http';
import { findPreview } from '../../lib/deezer';
import { rateLimit } from '../../lib/leaderboard/redis';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const { url } = context;
  const artist = url.searchParams.get('artist') ?? '';
  const title = url.searchParams.get('title') ?? '';
  if (!artist.trim() || !title.trim() || artist.length > 100 || title.length > 100) {
    return json({ preview: null }, 400, 'no-store');
  }

  try {
    const key = createHash('sha256').update(context.clientAddress).digest('hex');
    if (!(await rateLimit(`preview:v1:rl:${key}`, 30, 60))) {
      return json({ preview: null }, 429, 'no-store');
    }
  } catch {
    return json({ preview: null }, 503, 'no-store');
  }

  const preview = await findPreview(artist, title);
  // Las URLs de preview vienen firmadas y vencen: cache corto.
  return json({ preview }, 200, preview ? 'public, max-age=0, s-maxage=1800' : 'no-store');
};
