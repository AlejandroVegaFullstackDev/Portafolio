// Smoke test del home construido: carga dist/ en jsdom, ejecuta scripts/home.ts y
// verifica que todo arranque sin errores, en perfil desktop (mouse) y móvil (táctil).
// Requiere `npm run build` antes.
import { existsSync, readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { beforeAll, describe, expect, it } from 'vitest';

const HTML = 'dist/client/index.html';
const hasBuild = existsSync(HTML);
let bundle = '';

beforeAll(async () => {
  if (!hasBuild) return;
  const out = await build({ entryPoints: ['src/scripts/home.ts'], bundle: true, format: 'iife', write: false, logLevel: 'silent' });
  bundle = out.outputFiles[0].text;
});

async function boot(pointer: 'fine' | 'coarse') {
  const dom = new JSDOM(readFileSync(HTML, 'utf8'), { runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://4ledmt.dev/' });
  const w = dom.window as unknown as Window & typeof globalThis & { eval: (s: string) => void };
  const errors: string[] = [];
  w.addEventListener('error', (e) => errors.push(String((e as ErrorEvent).error?.stack ?? (e as ErrorEvent).message)));
  w.matchMedia = ((q: string) => ({
    matches: q.includes('pointer: fine') ? pointer === 'fine' : q.includes('hover: hover') ? pointer === 'fine' : q.includes('hover: none') ? pointer !== 'fine' : false,
    media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false,
  })) as typeof w.matchMedia;
  w.fetch = (() => Promise.resolve({ ok: false, json: () => Promise.resolve({}) })) as unknown as typeof fetch;
  w.scrollTo = (() => {}) as typeof w.scrollTo;
  try { w.eval(bundle); } catch (e) { errors.push(String((e as Error).stack)); }
  await new Promise((r) => setTimeout(r, 3500)); // arranque + detección de FPS
  return { d: w.document, w, errors };
}

describe.skipIf(!hasBuild)('home (smoke)', () => {
  for (const pointer of ['fine', 'coarse'] as const) {
    it(`arranca sin errores (${pointer === 'fine' ? 'desktop' : 'móvil'})`, async () => {
      const { d, w, errors } = await boot(pointer);
      expect(errors).toEqual([]);
      expect(d.querySelectorAll('#heroName .hc').length).toBeGreaterThan(5);
      expect(d.querySelectorAll('.odo-reel').length).toBeGreaterThan(0);
      ['projects', 'blog'].forEach((id) => expect(d.getElementById(id)?.classList.contains('is-pinned')).toBe(true));

      // Interacciones clave
      const click = (el: Element | null) => el?.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
      click(d.getElementById('mobileMenuBtn'));
      expect(d.getElementById('mobileMenu')?.hidden).toBe(false);
      for (let i = 0; i < 5; i++) click(d.getElementById('logoBtn'));
      expect(d.getElementById('secretTerm')?.hidden).toBe(false);
      click(d.getElementById('langToggle'));
      expect(d.documentElement.getAttribute('data-lang')).toBe('en');
    }, 20_000);
  }

  it('enlaza al CV en ambos idiomas y no publica correo', () => {
    const html = readFileSync(HTML, 'utf8');
    expect(html).toContain('/alejandro-vega-cv-es.pdf');
    expect(html).toContain('/alejandro-vega-cv-en.pdf');
    expect(html).not.toMatch(/mailto:|@gmail\.com/);
  });

  it('tiene vista previa para compartir (og:image) y datos estructurados', () => {
    const html = readFileSync(HTML, 'utf8');
    expect(html).toMatch(/<meta property="og:image" content="https:\/\/4ledmt\.dev\/og\.png"/);
    expect(html).toContain('"@type":"Person"');
  });
});
