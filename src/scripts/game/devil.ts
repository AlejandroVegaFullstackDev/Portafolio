// La serpiente es un diablito: cabeza con cuernos, ojos amarillos que miran hacia donde
// va, cejas fruncidas, sonrisa con colmillos y cola terminada en punta de flecha.
// Todo en canvas, en coordenadas relativas a la celda (s = tamaño de la celda).
import type { Dir } from './snakeEngine';

type Cell = { x: number; y: number };
const LOOK: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

export function drawDevilHead(ctx: CanvasRenderingContext2D, h: Cell, s: number, dir: Dir, accent: string, flash: boolean) {
  const ox = h.x * s, oy = h.y * s;
  const X = (f: number) => ox + f * s, Y = (f: number) => oy + f * s;
  const lw = (f: number) => Math.max(1, f * s);

  // Cuernos (detrás de la cabeza; las puntas sobresalen hacia arriba).
  const horn = (side: 1 | -1) => {
    const c = (f: number) => (side === 1 ? f : 1 - f);
    ctx.beginPath();
    ctx.moveTo(X(c(0.14)), Y(0.32));
    ctx.quadraticCurveTo(X(c(-0.06)), Y(0.02), X(c(0.02)), Y(-0.34));
    ctx.quadraticCurveTo(X(c(0.22)), Y(-0.02), X(c(0.42)), Y(0.16));
    ctx.closePath();
    const g = ctx.createLinearGradient(0, Y(-0.34), 0, Y(0.3));
    g.addColorStop(0, '#fff4d6');
    g.addColorStop(0.35, '#f2c14e');
    g.addColorStop(1, '#7a0018');
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = lw(0.04);
    ctx.strokeStyle = '#2a0008';
    ctx.stroke();
  };
  horn(1); horn(-1);

  // Cara
  ctx.save();
  ctx.shadowColor = accent;
  ctx.shadowBlur = s * (flash ? 1.3 : 0.7);
  const face = ctx.createRadialGradient(X(0.45), Y(0.38), s * 0.05, X(0.5), Y(0.55), s * 0.7);
  face.addColorStop(0, flash ? '#ffffff' : '#ff4d6d');
  face.addColorStop(1, flash ? '#ffd0d8' : '#9e0022');
  ctx.fillStyle = face;
  ctx.beginPath();
  // roundRect no existe en Safari < 16: ahí la cara queda cuadrada en vez de romper el juego.
  if (typeof ctx.roundRect === 'function') ctx.roundRect(X(0.04), Y(0.08), s * 0.92, s * 0.88, s * 0.3);
  else ctx.rect(X(0.04), Y(0.08), s * 0.92, s * 0.88);
  ctx.fill();
  ctx.restore();
  ctx.lineWidth = lw(0.04);
  ctx.strokeStyle = '#2a0008';
  ctx.stroke();

  // Ojos amarillos rasgados, con pupila de gato que mira hacia donde va.
  const [lx, ly] = LOOK[dir];
  const eye = (cx: number, tilt: number) => {
    ctx.save();
    ctx.translate(X(cx), Y(0.5));
    ctx.rotate(tilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.15, s * 0.09, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#fcee0a';
    ctx.shadowColor = '#fcee0a';
    ctx.shadowBlur = s * 0.3;
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#120004';
    ctx.beginPath();
    ctx.ellipse(X(cx + lx * 0.05), Y(0.5 + ly * 0.03), s * 0.03, s * 0.075, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  eye(0.3, 0.38);
  eye(0.7, -0.38);

  // Cejas fruncidas
  ctx.strokeStyle = '#120004';
  ctx.lineCap = 'round';
  ctx.lineWidth = lw(0.08);
  ctx.beginPath();
  ctx.moveTo(X(0.13), Y(0.31)); ctx.lineTo(X(0.44), Y(0.43));
  ctx.moveTo(X(0.87), Y(0.31)); ctx.lineTo(X(0.56), Y(0.43));
  ctx.stroke();

  // Sonrisa con colmillos
  ctx.fillStyle = '#120004';
  ctx.beginPath();
  ctx.moveTo(X(0.22), Y(0.68));
  ctx.quadraticCurveTo(X(0.5), Y(0.98), X(0.78), Y(0.68));
  ctx.quadraticCurveTo(X(0.5), Y(0.8), X(0.22), Y(0.68));
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  const fang = (cx: number) => {
    ctx.beginPath();
    ctx.moveTo(X(cx - 0.055), Y(0.735));
    ctx.lineTo(X(cx + 0.055), Y(0.735));
    ctx.lineTo(X(cx), Y(0.86));
    ctx.closePath();
    ctx.fill();
  };
  fang(0.38); fang(0.62);
  ctx.lineCap = 'butt';
}

/** Punta de flecha al final de la cola, apuntando hacia afuera. */
export function drawDevilTail(ctx: CanvasRenderingContext2D, tail: Cell, before: Cell, s: number, accent: string) {
  const dx = tail.x - before.x, dy = tail.y - before.y;
  if (Math.abs(dx) + Math.abs(dy) !== 1) return;
  ctx.save();
  ctx.translate((tail.x + 0.5 + dx * 0.5) * s, (tail.y + 0.5 + dy * 0.5) * s);
  ctx.rotate(Math.atan2(dy, dx));
  ctx.beginPath();
  ctx.moveTo(s * 0.42, 0);
  ctx.lineTo(s * 0.02, -s * 0.24);
  ctx.lineTo(s * 0.12, 0);
  ctx.lineTo(s * 0.02, s * 0.24);
  ctx.closePath();
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = s * 0.4;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.lineWidth = Math.max(1, s * 0.04);
  ctx.strokeStyle = '#2a0008';
  ctx.stroke();
  ctx.restore();
}
