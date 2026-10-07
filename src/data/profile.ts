// Quién soy: identidad, cifras del hero y texto de "Sobre mí".

export const identity = {
  name: "Alejandro Vega",
  handle: "@alejandrovega-stackblend",
  initials: "AV",
  location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
  since: "2023",
  education: {
    es: "SENA · Técnico en Programación de Software (2021–2022) · UNIMINUTO · Ingeniería de Sistemas (2025 – en curso)",
    en: "SENA · Software Programming Technician (2021–2022) · UNIMINUTO · Systems Engineering (2025 – ongoing)",
  },
  educationShort: { es: "SENA · UNIMINUTO", en: "SENA · UNIMINUTO" },
  educationSub: { es: "2021–22 · 2025 – en curso", en: "2021–22 · 2025 – ongoing" },
  title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  tagline: {
    es: "Desarrollo productos web de punta a punta: frontend, backend, automatización, datos y plataformas internas. Hoy en Roda, fintech de movilidad eléctrica.",
    en: "I build end-to-end web products: frontend, backend, automation, data and internal platforms. Currently at Roda, an electric-mobility fintech.",
  },
  status: {
    es: "Disponible para incorporación inmediata",
    en: "Available for immediate hire",
  },
  projectCount: 13,
  timezone: "GMT-5",
  domain: "4ledmt.dev",
  contact: {
    linkedin: "https://www.linkedin.com/in/alejandrovega-stackblend/",
    github: "https://github.com/AlejandroVegaFullstackDev",
  },
} as const;

// Cifras reales, todas trazables a un proyecto concreto.
export const highlights = [
  {
    value: 10000, prefix: "+", suffix: "",
    label: { es: "guías de envío en segundos, antes horas", en: "shipping labels in seconds, used to take hours" },
  },
  {
    value: 500, prefix: "~", suffix: "",
    label: { es: "vehículos de la flota con rastreo GPS", en: "fleet vehicles with GPS tracking" },
  },
  {
    value: 20, prefix: "5–", suffix: " h",
    label: { es: "por semana ahorradas con automatizaciones", en: "per week saved through automations" },
  },
] as const;

export const about = {
  es: [
    "Soy desarrollador full stack. Programo desde 2021 y trabajo en la industria desde 2023; hoy en Roda.",
    "Me gusta programar, resolver problemas y encontrar patrones, dentro y fuera del código. Por eso también tengo proyectos propios: un tutor de IA que vive en un repositorio, un sistema de soporte con LLMs y este blog.",
    "En el trabajo diseño y llevo funcionalidades de punta a punta, y trabajo cerca de negocio: antes de escribir código busco entender el problema y propongo la forma más simple de resolverlo.",
  ],
  en: [
    "I'm a full stack developer. I've been coding since 2021 and working in the industry since 2023; currently at Roda.",
    "I like programming, solving problems and finding patterns, in code and outside of it. That's why I also have my own projects: an AI tutor that lives in a repository, an LLM-powered support system and this blog.",
    "At work I design and carry features end to end, and I work close to the business: before writing code I try to understand the problem and propose the simplest way to solve it.",
  ],
} as const;
