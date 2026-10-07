// Render del CV en PDF a partir de src/data/cv.ts. Pensado para leerse (jerarquía,
// acento de marca, una página) pero con texto real en orden de lectura, para que
// también funcione si un reclutador lo sube a un ATS.
import PDFDocument from 'pdfkit';
import { cv } from '../data/cv';
import { portfolioData as D } from '../data';

type Lang = 'es' | 'en';

const T = {
  es: { profile: 'Perfil', experience: 'Experiencia', projects: 'Proyectos', skills: 'Habilidades técnicas', education: 'Educación e idiomas', web: 'Portafolio' },
  en: { profile: 'Profile', experience: 'Experience', projects: 'Projects', skills: 'Technical skills', education: 'Education & languages', web: 'Portfolio' },
};

const INK = '#16161a';
const MUTED = '#5c5c66';
const ACCENT = '#c4002e';
const RULE = '#d9d9de';
const M = 46; // margen lateral

// Las fuentes estándar de PDF usan WinAnsi: se reemplaza lo que no existe ahí.
const clean = (s: string) => s.replace(/→/g, '->').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x00-\xFF—–·×•…€]/g, '');

export function buildCv(lang: Lang): Promise<ArrayBuffer> {
  const t = T[lang];
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 36, bottom: 30, left: M, right: M },
    info: { Title: `${D.identity.name} — CV`, Author: D.identity.name, Subject: cv.headline[lang] },
  });
  const chunks: Buffer[] = [];
  doc.on('data', (c: Buffer) => chunks.push(c));
  const done = new Promise<ArrayBuffer>((resolve) => doc.on('end', () => {
    const b = Buffer.concat(chunks);
    resolve(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer);
  }));
  const W = doc.page.width - M * 2;

  /** Escribe un párrafo donde **x** va en negrita, empezando en (x, y). */
  const rich = (s: string, size: number, x: number, w: number, opts: PDFKit.Mixins.TextOptions = {}, color = INK) => {
    const parts = clean(s).split(/(\*\*[^*]+\*\*)/).filter(Boolean);
    parts.forEach((p, i) => {
      const bold = p.startsWith('**');
      doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(size).fillColor(color);
      const o = { width: w, ...opts, continued: i < parts.length - 1 };
      const txt = bold ? p.slice(2, -2) : p;
      if (i === 0) doc.text(txt, x, doc.y, o);
      else doc.text(txt, o);
    });
  };

  const section = (title: string) => {
    doc.moveDown(0.42);
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(ACCENT).text(clean(title.toUpperCase()), M, doc.y, { width: W });
    const y = doc.y + 1.5;
    doc.moveTo(M, y).lineTo(M + W, y).lineWidth(0.6).strokeColor(RULE).stroke();
    doc.y = y + 5;
  };

  const bullet = (s: string) => {
    const y = doc.y;
    doc.font('Helvetica').fontSize(8.8).fillColor(ACCENT).text('•', M + 4, y, { lineBreak: false });
    doc.y = y;
    rich(s, 8.8, M + 14, W - 14, { lineGap: 0.6, paragraphGap: 1.2 });
    doc.x = M;
  };

  // ── Encabezado ──
  doc.rect(0, 0, doc.page.width, 4).fill(ACCENT);
  doc.font('Helvetica-Bold').fontSize(23).fillColor(INK).text(D.identity.name, M, 34, { width: W });
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(ACCENT).text(clean(cv.headline[lang]), { width: W });
  doc.moveDown(0.25);
  doc.font('Helvetica').fontSize(8.8).fillColor(MUTED).text(clean(cv.location[lang]), { width: W });
  const links: [string, string][] = [
    [`${t.web}: ${D.identity.domain}`, `https://${D.identity.domain}`],
    ['LinkedIn', D.identity.contact.linkedin],
    ['GitHub', D.identity.contact.github],
  ];
  links.forEach(([label, url], i) => {
    doc.font('Helvetica').fontSize(8.8).fillColor(INK).text(label, { link: url, underline: false, continued: i < links.length - 1 });
    if (i < links.length - 1) doc.fillColor(MUTED).text('  ·  ', { continued: true });
  });

  // ── Perfil ──
  section(t.profile);
  rich(cv.profile[lang], 9.2, M, W, { lineGap: 1.2 });

  // ── Experiencia ──
  section(t.experience);
  cv.experience.forEach((job, i) => {
    if (i > 0) doc.moveDown(0.35);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(`${job.org} — `, M, doc.y, { continued: true, width: W });
    doc.font('Helvetica-Bold').fillColor(INK).text(clean(job.role[lang]));
    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text(clean(job.meta[lang]), { width: W });
    doc.moveDown(0.15);
    job.bullets.forEach((b) => bullet(b[lang]));
  });

  // ── Proyectos ──
  section(t.projects);
  cv.projects.forEach((p) => {
    doc.font('Helvetica-Bold').fontSize(10).fillColor(INK).text(`${p.name} — `, M, doc.y, { continued: true, width: W });
    doc.font('Helvetica').fillColor(ACCENT).text(p.link, { link: `https://${p.link}` });
    doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(MUTED).text(clean(p.meta[lang]), { width: W });
    doc.moveDown(0.15);
    p.bullets.forEach((b) => bullet(b[lang]));
  });

  // ── Habilidades ──
  section(t.skills);
  cv.skills.forEach((s) => bullet(`**${s.k[lang]}:** ${s.v[lang]}`));

  // ── Educación ──
  section(t.education);
  cv.education.forEach((e) => bullet(e[lang]));

  doc.end();
  return done;
}
