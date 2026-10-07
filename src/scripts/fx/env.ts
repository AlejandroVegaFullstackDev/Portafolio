// Entorno de efectos: decide cuánto movimiento puede pagar este dispositivo.
// Un solo lugar para la política (SRP); cada efecto solo pregunta.

export type FxLevel = 'off' | 'lite' | 'full';

const root = () => document.documentElement;

export const isFinePointer = () => window.matchMedia('(pointer: fine)').matches;
export const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 'off' = sin animación, 'lite' = sin efectos caros (blur, giroscopio, skew), 'full' = todo. */
export function fxLevel(): FxLevel {
  if (prefersReduced() || root().getAttribute('data-tweak-anim') === 'off') return 'off';
  if (root().getAttribute('data-fx') === 'lite' || root().getAttribute('data-tweak-anim') === 'low') return 'lite';
  return 'full';
}

export const canAnimate = () => fxLevel() !== 'off';
export const canAffordHeavy = () => fxLevel() === 'full';

/**
 * Modo ahorro automático. Pistas baratas primero (ahorro de datos, poca RAM);
 * si no deciden, mide FPS reales durante ~700 ms. Por debajo de 40 fps pasa a 'lite'.
 */
export function detectPerformance(): Promise<FxLevel> {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)) {
    root().setAttribute('data-fx', 'lite');
    return Promise.resolve(fxLevel());
  }
  return new Promise((resolve) => {
    let frames = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      frames++;
      if (t - t0 < 700) return requestAnimationFrame(tick);
      const fps = (frames * 1000) / (t - t0);
      if (fps < 40) root().setAttribute('data-fx', 'lite');
      resolve(fxLevel());
    };
    requestAnimationFrame(tick);
  });
}
