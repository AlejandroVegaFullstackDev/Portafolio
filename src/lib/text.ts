// Helpers puros de texto para el blog (fechas, tiempo de lectura, índice).
// Sin dependencias de Astro, para poder probarlos con Vitest.

export const fmtPostDate = (d: Date) =>
  d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' });

export const fmtLongDate = (d: Date) =>
  d.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

const stripInlineMarkdown = (text: string) =>
  text.replace(/`([^`]+)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_~]/g, '').trim();

const slugifyHeading = (text: string) =>
  text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');

/** Índice del post a partir de sus "## títulos", con los mismos ids que genera Astro. */
export function getToc(body?: string) {
  if (!body) return [];
  const seen = new Map<string, number>();
  return body
    .split('\n')
    .map((line) => line.match(/^##\s+(.+)$/)?.[1])
    .filter((t): t is string => Boolean(t))
    .map(stripInlineMarkdown)
    .map((text) => {
      const base = slugifyHeading(text);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      return { text, id: n ? `${base}-${n}` : base };
    });
}

/** Minutos de lectura (~200 palabras por minuto). */
export const readingTime = (body?: string) =>
  Math.max(1, Math.round((body?.trim().split(/\s+/).length ?? 0) / 200));
