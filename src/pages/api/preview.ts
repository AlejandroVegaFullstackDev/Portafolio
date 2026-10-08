// Vista previa de una canción suelta (respaldo si la lista no trajo la suya).
// GET /api/preview?artist=...&title=...  →  { preview: string | null }
import type { APIRoute } from 'astro';
import { json } from '../../lib/spotify';
import { findPreview } from '../../lib/deezer';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const preview = await findPreview(url.searchParams.get('artist') ?? '', url.searchParams.get('title') ?? '');
  // Las URLs de preview vienen firmadas y vencen: cache corto.
  return json({ preview }, preview ? 'public, max-age=0, s-maxage=1800' : 'no-store');
};
