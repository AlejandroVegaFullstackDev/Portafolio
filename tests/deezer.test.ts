import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanTitle, findPreview, findPreviews } from '../src/lib/deezer';

afterEach(() => vi.unstubAllGlobals());

describe('cleanTitle', () => {
  it('quita sufijos que estorban la búsqueda', () => {
    expect(cleanTitle('Rooster (2022 Remaster)')).toBe('Rooster');
    expect(cleanTitle('Nutshell - Unplugged')).toBe('Nutshell');
    expect(cleanTitle('Love, Hate, Love')).toBe('Love, Hate, Love');
  });
});

describe('findPreview', () => {
  it('usa el primer artista y cae a búsqueda libre si la exacta no encuentra', async () => {
    const calls: string[] = [];
    vi.stubGlobal('fetch', async (u: string) => {
      calls.push(decodeURIComponent(u));
      const hit = calls.length === 2 ? [{ preview: 'https://cdn/p.mp3' }] : [];
      return { ok: true, json: async () => ({ data: hit }) };
    });
    expect(await findPreview('Alice In Chains, Otro', 'Rooster (2022 Remaster)')).toBe('https://cdn/p.mp3');
    expect(calls[0]).toContain('artist:"Alice In Chains" track:"Rooster"');
  });

  it('devuelve null si Deezer falla', async () => {
    vi.stubGlobal('fetch', async () => { throw new Error('down'); });
    expect(await findPreview('X', 'Y')).toBeNull();
  });
});

describe('findPreviews', () => {
  it('respeta el límite de concurrencia y el orden', async () => {
    let inFlight = 0, peak = 0;
    vi.stubGlobal('fetch', async (u: string) => {
      inFlight++; peak = Math.max(peak, inFlight);
      await new Promise((r) => setTimeout(r, 5));
      inFlight--;
      const t = decodeURIComponent(u).match(/track:"([^"]+)"/)?.[1];
      return { ok: true, json: async () => ({ data: [{ preview: `p-${t}` }] }) };
    });
    const items = Array.from({ length: 10 }, (_, i) => ({ artist: 'A', title: `T${i}` }));
    const out = await findPreviews(items, 3);
    expect(peak).toBeLessThanOrEqual(3);
    expect(out).toEqual(items.map((i) => `p-${i.title}`));
  });
});
