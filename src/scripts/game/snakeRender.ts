// Dibujo del tablero del Snake en canvas. Da profundidad sin WebGL: cada carátula
// proyecta sombra (parece una ficha levantada), la comida flota y la serpiente es un diablito.
import type { SnakeState } from './snakeEngine';
import { drawDevilHead, drawDevilTail } from './devil';

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

  // Cola de diablo y cabeza de diablito (devil.ts).
  const n = game.snake.length;
  if (n > 1) drawDevilTail(ctx, game.snake[n - 1], game.snake[n - 2], cell, p.accent);
  drawDevilHead(ctx, game.snake[0], cell, game.dir, p.accent, flash > 0);
}
