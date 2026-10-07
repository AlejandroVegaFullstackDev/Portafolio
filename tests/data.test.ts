// Integridad del contenido: lo que un reclutador ve tiene que ser consistente y verificable.
import { describe, expect, it } from 'vitest';
import { portfolioData as D } from '../src/data';
import { cv } from '../src/data/cv';

const allText = JSON.stringify({ D, cv });

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
    check(cv, 'cv');
  });

  it('el stack por niveles no repite tecnologías entre niveles', () => {
    const items = D.stackTiers.flatMap((t) => t.items);
    expect(new Set(items).size).toBe(items.length);
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

  it('el CV público no expone correo ni teléfono', () => {
    const cvText = JSON.stringify(cv);
    expect(cvText).not.toMatch(/@[a-z0-9-]+\.[a-z]{2,}/i);
    expect(cvText).not.toMatch(/\+57|\b3\d{2}\s?\d{3}\s?\d{4}\b/);
  });
});
