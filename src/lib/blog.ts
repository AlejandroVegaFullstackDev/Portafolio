// Utilidades del blog compartidas por el home y /blog.
import { getCollection } from 'astro:content';

export async function getSortedPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const fmtPostDate = (d: Date) =>
  d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' });

/** Minutos de lectura (~200 palabras por minuto). */
export const readingTime = (body?: string) =>
  Math.max(1, Math.round((body?.trim().split(/\s+/).length ?? 0) / 200));
