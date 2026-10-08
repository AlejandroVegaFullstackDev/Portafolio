// Punto único de acceso a los datos del portafolio.
// Cada archivo de esta carpeta es una sección; aquí solo se arman.
import { identity, about } from './profile';
import { stack, stackGroups, daily, automation } from './stack';
import { experience } from './experience';
import { projects } from './projects';
import { caseStudies } from './case-studies';

export const portfolioData = {
  identity,
  about,
  stack,
  stackGroups,
  daily,
  automation,
  experience,
  projects,
  deep: caseStudies,
} as const;

export type Lang = 'es' | 'en';
export type Project = (typeof projects)[number];
