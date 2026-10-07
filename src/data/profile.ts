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
    "Soy Desarrollador Full Stack. Programo desde 2021 (SENA) y trabajo en la industria desde 2023, construyendo APIs, automatizaciones y plataformas internas.",
    "Diseño y lidero funcionalidades de punta a punta, desde la arquitectura hasta producción, y trabajo cerca de negocio: propongo alternativas cuando hay una forma más simple o barata de resolver el problema.",
    "Me gusta resolver fricción operativa: procesos manuales, integraciones rotas, reportes lentos o sistemas que necesitan escalar sin perder claridad.",
  ],
  en: [
    "Full Stack Developer. I've been coding since 2021 (SENA) and working in the industry since 2023, building APIs, automations and internal platforms.",
    "I design and lead features end to end, from architecture to production, and I work close to the business: I propose alternatives when there is a simpler or cheaper way to solve the problem.",
    "I like solving operational friction: manual processes, brittle integrations, slow reports or systems that need to scale without losing clarity.",
  ],
} as const;
