// Frases del ticker del header (se derivan de los datos para no duplicar cifras).
import { portfolioData as D } from '../data';

export function buildTicker(latestPostTitle?: string) {
  const topStack = [D.stack.frameworks[0], D.stack.languages[1], D.stack.databases[2]].map((s) => s.toUpperCase()).join(' · ');
  const companies = D.experience.map((e) => e.company.toUpperCase()).join(' · ');
  return [
    { icon: '▲', text: `LOC: ${D.identity.location.en.split(',')[0].toUpperCase()} 04°38'N 74°05'W / ${D.identity.timezone}` },
    ...(latestPostTitle ? [{ icon: '✎', text: `NUEVO EN EL BLOG: ${latestPostTitle.toUpperCase()}` }] : []),
    { icon: '●', text: 'RODA / ACTIVO DESDE JUN 2025' },
    { icon: '▼', text: 'KIKI LATAM: +10.000 GUÍAS EN SEGUNDOS · ×10' },
    { icon: '●', text: `STACK: ${topStack}` },
    { icon: '▲', text: 'VEGAREPARACIONES: SEO 100 · A11Y 96 · PERF 90' },
    { icon: '●', text: 'FOR HIRE: REMOTE / HYBRID' },
    { icon: '▼', text: companies },
    { icon: '●', text: 'PULZO: +5 AÑOS DE DATOS CENTRALIZADOS' },
  ];
}
