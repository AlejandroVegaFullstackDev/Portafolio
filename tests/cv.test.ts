import { describe, expect, it } from 'vitest';
import { buildCv } from '../src/lib/cv';

const pages = (pdf: string) => (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;

describe('CV en PDF', () => {
  for (const lang of ['es', 'en'] as const) {
    it(`genera un PDF válido de una página (${lang})`, async () => {
      const buf = Buffer.from(await buildCv(lang));
      const raw = buf.toString('latin1');
      expect(raw.startsWith('%PDF-')).toBe(true);
      expect(pages(raw)).toBe(1);
    });
  }
});
