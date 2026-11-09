// Integridad del contenido: lo que un reclutador ve tiene que ser consistente y verificable.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { portfolioData as D } from '../src/data';

const allText = JSON.stringify(D);

describe('datos del portafolio', () => {
  it('los slugs de proyecto son únicos', () => {
    const slugs = D.projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('hay al menos 6 proyectos para el carrusel de destacados', () => {
    expect(D.projects.length).toBeGreaterThanOrEqual(6);
  });

  it('cada caso de estudio corresponde a un proyecto existente', () => {
    const slugs = new Set(D.projects.map((p) => p.slug));
    Object.keys(D.deep).forEach((k) => expect(slugs, `case-study sin proyecto: ${k}`).toContain(k));
  });

  it('todo texto bilingüe tiene español e inglés', () => {
    const check = (o: unknown, path: string): void => {
      if (!o || typeof o !== 'object') return;
      const rec = o as Record<string, unknown>;
      if ('es' in rec && 'en' in rec) {
        expect(rec.es, `${path}.es vacío`).toBeTruthy();
        expect(rec.en, `${path}.en vacío`).toBeTruthy();
      }
      Object.entries(rec).forEach(([k, v]) => check(v, `${path}.${k}`));
    };
    check(D, 'D');
  });

  it('el stack por áreas no repite tecnologías entre áreas', () => {
    const items = D.stackGroups.flatMap((g) => g.items);
    expect(new Set(items).size).toBe(items.length);
  });

  it('todo lo marcado como uso diario aparece en alguna área', () => {
    const items = new Set<string>(D.stackGroups.flatMap((g) => g.items));
    D.daily.forEach((t) => expect(items, t).toContain(t));
  });
});

describe('honestidad (regresiones que ya se corrigieron)', () => {
  it('no vuelve la cifra ×10, que no se puede sustentar', () => {
    expect(allText).not.toMatch(/×\s?10|10×|x10/);
  });

  it('el título no promete un nivel (Senior) que el CV no dice', () => {
    expect(D.identity.title.es).not.toMatch(/senior/i);
    expect(D.identity.title.en).not.toMatch(/senior/i);
  });

  it('sin cifras infladas ni "de punta a punta"', () => {
    expect(allText).not.toMatch(/10 veces|horas a segundos|hours to seconds|punta a punta|end to end/i);
  });

  it('el titular es el mismo del CV y de LinkedIn', () => {
    expect(D.identity.headline.es).toBe('Ingeniero de Software Backend | Automatización e integraciones');
  });
});

describe('CV descargable', () => {
  // Los PDF salen de cv-por-posicion (repo ai-job-search), en su versión pública sin
  // correo ni teléfono: un PDF público se scrapea.
  for (const lang of ['es', 'en']) {
    it(`existe /alejandro-vega-cv-${lang}.pdf y es un PDF`, () => {
      const buf = readFileSync(new URL(`../public/alejandro-vega-cv-${lang}.pdf`, import.meta.url));
      expect(buf.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    });
  }
});
