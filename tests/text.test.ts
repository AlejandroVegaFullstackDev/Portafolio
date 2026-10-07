import { describe, expect, it } from 'vitest';
import { getToc, readingTime } from '../src/lib/text';

describe('readingTime', () => {
  it('nunca baja de 1 minuto', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime(undefined)).toBe(1);
  });
  it('calcula ~200 palabras por minuto', () => {
    expect(readingTime(Array(1000).fill('palabra').join(' '))).toBe(5);
  });
});

describe('getToc', () => {
  it('toma solo los ## y limpia el markdown en línea', () => {
    const toc = getToc('# Título\n## El `problema` real\ntexto\n### sub\n## [Enlace](https://x.dev)');
    expect(toc.map((t) => t.text)).toEqual(['El problema real', 'Enlace']);
  });
  it('genera ids como Astro, únicos ante títulos repetidos', () => {
    const toc = getToc('## Información útil\n## Información útil');
    expect(toc.map((t) => t.id)).toEqual(['información-útil', 'información-útil-1']);
  });
});
