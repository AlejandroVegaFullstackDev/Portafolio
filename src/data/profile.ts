// Quién soy: identidad, cifras del hero y texto de "Sobre mí".

export const identity = {
  name: "Alejandro Vega",
  handle: "@alejandrovega-stackblend",
  initials: "AV",
  location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
  since: "2023",
  education: {
    es: "SENA · Técnico en Programación de Software (2021–2022) · UNIMINUTO · Ingeniería de Software (2025 – en curso)",
    en: "SENA · Software Programming Technician (2021–2022) · UNIMINUTO · Software Engineering (2025 – ongoing)",
  },
  educationShort: { es: "SENA · UNIMINUTO", en: "SENA · UNIMINUTO" },
  educationSub: { es: "2021–22 · 2025 – en curso", en: "2021–22 · 2025 – ongoing" },
  title: { es: "Desarrollador Full Stack Senior", en: "Senior Full Stack Developer" },
  tagline: {
    es: "Desarrollo productos web de punta a punta: frontend, backend, automatización, datos y plataformas internas que sí aguantan operación real.",
    en: "I build end-to-end web products: frontend, backend, automation, data and internal platforms for real operations.",
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
    label: { es: "guías en segundos · Kiki LATAM", en: "waybills in seconds · Kiki LATAM" },
  },
  {
    value: 10, prefix: "×", suffix: "",
    label: { es: "rendimiento del sistema logístico", en: "logistics system throughput" },
  },
  {
    value: 5, prefix: "+", suffix: "",
    label: { es: "años de datos centralizados · Pulzo", en: "years of data centralized · Pulzo" },
  },
] as const;

export const about = {
  es: [
    "Soy Desarrollador Full Stack Senior. Desde 2023 construyo soluciones web, APIs, automatizaciones y plataformas internas para equipos reales.",
    "Trabajo cómodo en todo el ciclo: frontend, backend, bases de datos, integraciones, despliegue y mejora continua. También disfruto mucho construir interfaces claras y usables.",
    "Me gusta resolver fricción operativa: procesos manuales, integraciones rotas, reportes lentos o sistemas que necesitan escalar sin perder claridad.",
  ],
  en: [
    "Senior Full Stack Developer. Since 2023 I've been building web solutions, APIs, automations and internal platforms for real teams.",
    "I work comfortably across the full cycle: frontend, backend, databases, integrations, deployment and continuous improvement. I also really enjoy building clear, usable interfaces.",
    "I like solving operational friction: manual processes, brittle integrations, slow reports or systems that need to scale without losing clarity.",
  ],
} as const;
