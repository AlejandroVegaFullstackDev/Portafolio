// Ranking del Snake en el navegador: global (servidor, /api/leaderboard) y local
// (este dispositivo, localStorage). El servidor repite la partida para validar el
// puntaje, así que aquí solo se registran la semilla, los giros y los ticks.
// El nombre se pide una sola vez por dispositivo; después se anota solo.
import type { Move } from './replay';

const DEVICE_KEY = 'av_device';
const LOCAL_KEY = 'av_snake_local';
const NAME_KEY = 'av_snake_name';
const NAME_RE = /^[\p{L}\p{N} _.\-]{2,16}$/u;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const ls = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin storage */ } },
};

function deviceId() {
  let id = ls.get(DEVICE_KEY);
  if (!id) {
    id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
    ls.set(DEVICE_KEY, id);
  }
  return id;
}

interface LocalRow { score: number; at: number }
export type SubmitResult = { ok: true; rank: number | null } | { ok: false; reason: 'name' | 'error' };

export const validName = (n: string) => NAME_RE.test(n.trim());

export class Ranking {
  enabled = false;
  private token: string | null = null;
  onName: (name: string) => void = () => {};

  constructor(private globalList: HTMLElement, private localList: HTMLElement, private offEl: HTMLElement) {
    this.renderLocal();
  }

  get name() { return ls.get(NAME_KEY) ?? ''; }
  set name(v: string) { ls.set(NAME_KEY, v.trim()); this.onName(v.trim()); }

  async load() {
    try {
      const r = await fetch('/api/leaderboard');
      const d = (await r.json()) as { enabled: boolean; top?: { name: string; score: number }[] };
      this.enabled = !!d.enabled;
      this.renderGlobal(d.top ?? []);
    } catch {
      this.enabled = false;
      this.renderGlobal([]);
    }
  }

  /** Pide una semilla firmada. Si el ranking no está disponible, la partida es libre. */
  async begin(): Promise<number | null> {
    this.token = null;
    if (!this.enabled) return null;
    try {
      const r = await fetch('/api/leaderboard', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', device: deviceId() }),
      });
      if (!r.ok) return null;
      const d = (await r.json()) as { seed: number; token: string };
      this.token = d.token;
      return d.seed;
    } catch {
      return null;
    }
  }

  /** ¿Esta partida puede ir al ranking global? */
  get ranked() { return this.token !== null; }

  /** Guarda en el ranking del dispositivo. Devuelve la posición (1-5) o null si no entró. */
  recordLocal(score: number): number | null {
    if (score < 1) return null;
    const rows: LocalRow[] = JSON.parse(ls.get(LOCAL_KEY) ?? '[]');
    const row = { score, at: Date.now() };
    rows.push(row);
    rows.sort((a, b) => b.score - a.score || b.at - a.at);
    const top = rows.slice(0, 5);
    ls.set(LOCAL_KEY, JSON.stringify(top));
    this.renderLocal(row.at);
    const i = top.indexOf(row);
    return i < 0 ? null : i + 1;
  }

  async submit(name: string, moves: Move[], ticks: number): Promise<SubmitResult> {
    if (!this.token) return { ok: false, reason: 'error' };
    try {
      const r = await fetch('/api/leaderboard', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit', token: this.token, name, moves, ticks }),
      });
      const d = (await r.json()) as { rank?: number | null; error?: string };
      if (!r.ok) {
        if (d.error === 'bad-name') return { ok: false, reason: 'name' }; // el token sigue sirviendo
        this.token = null;
        return { ok: false, reason: 'error' };
      }
      this.token = null; // un token = un envío
      this.name = name;
      await this.load();
      return { ok: true, rank: d.rank ?? null };
    } catch {
      return { ok: false, reason: 'error' };
    }
  }

  private renderGlobal(top: { name: string; score: number }[]) {
    this.offEl.hidden = this.enabled;
    const me = this.name.toLowerCase();
    this.globalList.innerHTML = top
      .map((r, i) => `<li${me && r.name.toLowerCase() === me ? ' class="me"' : ''}><span class="pos">${String(i + 1).padStart(2, '0')}</span><span class="who">${esc(r.name)}</span><span class="pts">${r.score}</span></li>`)
      .join('');
  }

  private renderLocal(highlight?: number) {
    const rows: LocalRow[] = JSON.parse(ls.get(LOCAL_KEY) ?? '[]');
    const fmt = (t: number) => new Date(t).toLocaleDateString(document.documentElement.getAttribute('data-lang') === 'en' ? 'en-US' : 'es-CO', { day: '2-digit', month: 'short' });
    this.localList.innerHTML = rows
      .map((r, i) => `<li${r.at === highlight ? ' class="me"' : ''}><span class="pos">${String(i + 1).padStart(2, '0')}</span><span class="who">${fmt(r.at)}</span><span class="pts">${r.score}</span></li>`)
      .join('');
  }
}
