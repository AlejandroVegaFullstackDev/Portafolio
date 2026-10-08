// Ranking del Snake en el navegador: global (servidor, /api/leaderboard) y local
// (este dispositivo, localStorage). El servidor repite la partida para validar el
// puntaje, así que aquí solo se registran la semilla, los giros y los ticks.
import type { Move } from './replay';

const DEVICE_KEY = 'av_device';
const LOCAL_KEY = 'av_snake_local';
const NAME_KEY = 'av_snake_name';

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

export class Ranking {
  enabled = false;
  private token: string | null = null;

  constructor(private globalList: HTMLElement, private localList: HTMLElement, private status: HTMLElement) {
    this.renderLocal();
  }

  get savedName() { return ls.get(NAME_KEY) ?? ''; }

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

  get ranked() { return this.token !== null; }

  /** Guarda en el ranking local y, si hay sesión, permite enviarlo al global. */
  recordLocal(score: number) {
    if (score < 1) return;
    const rows: LocalRow[] = JSON.parse(ls.get(LOCAL_KEY) ?? '[]');
    rows.push({ score, at: Date.now() });
    rows.sort((a, b) => b.score - a.score);
    ls.set(LOCAL_KEY, JSON.stringify(rows.slice(0, 5)));
    this.renderLocal();
  }

  async submit(name: string, moves: Move[], ticks: number): Promise<string> {
    if (!this.token) return '';
    ls.set(NAME_KEY, name);
    try {
      const r = await fetch('/api/leaderboard', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit', token: this.token, name, moves, ticks }),
      });
      const d = (await r.json()) as { rank?: number | null; error?: string };
      this.token = null; // un token = un envío
      if (!r.ok) return d.error === 'bad-name' ? 'name' : 'error';
      await this.load();
      return d.rank ? `#${d.rank}` : 'ok';
    } catch {
      return 'error';
    }
  }

  private renderGlobal(top: { name: string; score: number }[]) {
    this.status.hidden = this.enabled;
    this.globalList.innerHTML = top.length
      ? top.map((r, i) => `<li><span class="pos">${String(i + 1).padStart(2, '0')}</span><span class="who">${esc(r.name)}</span><span class="pts">${r.score}</span></li>`).join('')
      : '';
  }

  private renderLocal() {
    const rows: LocalRow[] = JSON.parse(ls.get(LOCAL_KEY) ?? '[]');
    const fmt = (t: number) => new Date(t).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' });
    this.localList.innerHTML = rows
      .map((r, i) => `<li><span class="pos">${String(i + 1).padStart(2, '0')}</span><span class="who">${fmt(r.at)}</span><span class="pts">${r.score}</span></li>`)
      .join('');
  }
}
