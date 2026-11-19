// Proyectos del portafolio, en el orden en que se muestran: primero los propios de código
// abierto (los tres destacados del carrusel), después el trabajo de producción y luego el resto.
// Cada grupo vive en su archivo para que ninguno pase de ~300 líneas.
import { featured } from './featured';
import { production } from './production';
import { openSource } from './open-source';

export const projects = [...featured, ...production, ...openSource] as const;
