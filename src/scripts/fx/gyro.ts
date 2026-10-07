// Giroscopio compartido: una sola escucha de deviceorientation, muchos suscriptores.
// iOS exige pedir permiso desde un toque; los botones [data-gyro-btn] lo hacen.

import { canAffordHeavy, isFinePointer } from './env';

type Listener = (nx: number, ny: number) => void;

const listeners = new Set<Listener>();
let started = false;
let beta0: number | null = null;

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

function onOrientation(e: DeviceOrientationEvent) {
  if (e.gamma == null || e.beta == null) return;
  if (beta0 === null) beta0 = e.beta; // la primera lectura cuenta como "derecho"
  const nx = clamp(e.gamma / 25);
  const ny = clamp((e.beta - beta0) / 25);
  listeners.forEach((fn) => fn(nx, ny));
}

function start() {
  if (started) return;
  started = true;
  window.addEventListener('deviceorientation', onOrientation, { passive: true });
  document.querySelectorAll<HTMLElement>('[data-gyro-btn]').forEach((b) => (b.hidden = true));
}

type DOEWithPermission = { requestPermission?: () => Promise<'granted' | 'denied'> };

/** Prepara el giroscopio (solo táctil + modo full). Devuelve si está disponible. */
export function initGyro(): boolean {
  if (isFinePointer() || !canAffordHeavy() || !('DeviceOrientationEvent' in window)) return false;
  const DOE = DeviceOrientationEvent as unknown as DOEWithPermission;
  if (typeof DOE.requestPermission === 'function') {
    document.querySelectorAll<HTMLElement>('[data-gyro-btn]').forEach((btn) => {
      btn.hidden = false;
      btn.addEventListener('click', async () => {
        try {
          if ((await DOE.requestPermission!()) === 'granted') start();
        } catch { /* sin permiso: sin giroscopio */ }
        document.querySelectorAll<HTMLElement>('[data-gyro-btn]').forEach((b) => (b.hidden = true));
      });
    });
  } else {
    start();
  }
  return true;
}

export function onTilt(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
