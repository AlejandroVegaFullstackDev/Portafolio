// /alejandro-vega-cv-es.pdf y /alejandro-vega-cv-en.pdf, generados en el build.
import type { APIRoute, GetStaticPaths } from 'astro';
import { buildCv } from '../lib/cv';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = () => [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang === 'en' ? 'en' : 'es';
  const pdf = await buildCv(lang);
  return new Response(pdf, { headers: { 'Content-Type': 'application/pdf' } });
};
