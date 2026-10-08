// Generador pseudoaleatorio determinista (mulberry32). Con la misma semilla produce la
// misma secuencia en el navegador y en el servidor: así el servidor puede repetir una
// partida y calcular el puntaje real (anti-trampa del ranking).
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
