// Dibujo del tablero del Snake en canvas. Da profundidad sin WebGL: cada carátula
// proyecta sombra (parece una ficha levantada), la comida flota y la cabeza brilla.
import type { SnakeState } from './snakeEngine';

export interface Palette { accent: string; line: string; panel: string }

export function readPalette(root: HTMLElement): Palette {
  const cs = getComputedStyle(root);
  const v = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
  return { accent: v('--accent', '#ff003c'), line: v('--line', '#1c1c24'), panel: v('--panel', '#0f0f14') };
}

type Img = HTMLImageElement | null | undefined;
const ready = (img: Img): img is HTMLImageElement => !!img && img.complete && img.naturalWidth > 0;

export function drawBoard(ctx: CanvasRenderingContext2D, game: SnakeState, covers: Img[], cell: number, size: number, flash: number, p: Palette) {
  const px = cell * size;
  const t = performance.now();
  ctx.clearRect(0, 0, px, px);

  // Rejilla
  ctx.strokeStyle = p.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 1; i < size; i++) {
    ctx.moveTo(i * cell + 0.5, 0); ctx.lineTo(i * cell + 0.5, px);
    ctx.moveTo(0, i * cell + 0.5); ctx.lineTo(px, i * cell + 0.5);
  }
  ctx.stroke();

  const tile = (img: Img, x: number, y: number, pad: number, fallback: string, lift = 0) => {
    const tx = x * cell + pad, ty = y * cell + pad - lift, s = cell - pad * 2;
    if (ready(img)) ctx.drawImage(img, tx, ty, s, s);
    else { ctx.fillStyle = fallback; ctx.fillRect(tx, ty, s, s); }
  };
  const depth = Math.max(2, cell * 0.12);

  // Comida: flota sobre su sombra, con un aro que respira.
  const f = game.food;
  const bob = (Math.sin(t / 260) + 1) * cell * 0.08 + depth;
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.beginPath();
  ctx.ellipse(f.x * cell + cell / 2, f.y * cell + cell * 0.86, cell * 0.38 - bob * 0.15, cell * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  const ring = 1 + Math.sin(t / 180) * 1.5;
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(f.x * cell + 1 - ring, f.y * cell + 1 - ring - bob, cell - 2 + ring * 2, cell - 2 + ring * 2);
  tile(covers[f.item], f.x, f.y, 2, p.accent, bob);

  // Cuerpo: primero todas las sombras (para que no tapen a la ficha vecina), luego las carátulas.
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  for (const c of game.snake) ctx.fillRect(c.x * cell + 1 + depth * 0.6, c.y * cell + 1 + depth, cell - 2, cell - 2);
  game.snake.forEach((c, i) => {
    if (i === 0) return;
    const eatenIdx = game.eaten[game.eaten.length - i];
    tile(eatenIdx !== undefined ? covers[eatenIdx] : null, c.x, c.y, 1, p.panel);
    // Brillo superior: canto de la ficha.
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(c.x * cell + 1, c.y * cell + 1, cell - 2, Math.max(1, cell * 0.08));
    ctx.strokeStyle = p.accent;
    ctx.lineWidth = 1;
    ctx.strokeRect(c.x * cell + 1.5, c.y * cell + 1.5, cell - 3, cell - 3);
  });

  // Cabeza con resplandor
  const h = game.snake[0];
  ctx.save();
  ctx.shadowColor = p.accent;
  ctx.shadowBlur = cell * (flash > 0 ? 1.2 : 0.6);
  ctx.fillStyle = flash > 0 ? '#ffffff' : p.accent;
  ctx.fillRect(h.x * cell + 1, h.y * cell + 1, cell - 2, cell - 2);
  ctx.restore();
  ctx.fillStyle = '#000';
  const e = Math.max(2, cell / 7);
  const ex = game.dir === 'left' ? 0.28 : game.dir === 'right' ? 0.72 : 0.3;
  const ey = game.dir === 'up' ? 0.28 : game.dir === 'down' ? 0.72 : 0.3;
  const eye = (fx: number, fy: number) => ctx.fillRect(h.x * cell + cell * fx - e / 2, h.y * cell + cell * fy - e / 2, e, e);
  if (game.dir === 'up' || game.dir === 'down') { eye(0.3, ey); eye(0.7, ey); }
  else { eye(ex, 0.3); eye(ex, 0.7); }
}
