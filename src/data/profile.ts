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
    es: "Veo patrones en todo: en una canción, en un partido, en un problema. Programar es mi forma de ponerlos a trabajar.",
    en: "I see patterns in everything: in a song, in a match, in a problem. Programming is how I put them to work.",
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
    "Programo desde 2021 y trabajo en la industria desde 2023, en fintech, logística y medios digitales.",
    "Fuera del trabajo también tengo proyectos propios: un tutor de IA que vive en un repositorio, un sistema de soporte con LLMs y este blog.",
    "Lo que más me importa al construir algo: entender primero el problema de negocio y encontrar la forma más simple de resolverlo.",
  ],
  en: [
    "I've been coding since 2021 and working in the industry since 2023, across fintech, logistics and digital media.",
    "Outside of work I have my own projects too: an AI tutor that lives in a repository, an LLM-powered support system and this blog.",
    "What matters most to me when building something: understanding the business problem first and finding the simplest way to solve it.",
  ],
} as const;
