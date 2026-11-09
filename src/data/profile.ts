// Quién soy: identidad, cifras del hero y texto de "Sobre mí".

export const identity = {
  name: "Alejandro Vega",
  handle: "@alejandrovega-stackblend",
  initials: "AV",
  location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
  since: "2022",
  education: {
    es: "SENA · Técnico en Programación de Software (2021–2022) · UNIMINUTO · Ingeniería de Sistemas (2025 – en curso)",
    en: "SENA · Software Programming Technician (2021–2022) · UNIMINUTO · Systems Engineering (2025 – ongoing)",
  },
  educationShort: { es: "SENA · UNIMINUTO", en: "SENA · UNIMINUTO" },
  educationSub: { es: "2021–22 · 2025 – en curso", en: "2021–22 · 2025 – ongoing" },
  title: { es: "Ingeniero de Software Backend", en: "Backend Software Engineer" },
  // Titular del CV y de LinkedIn: qué es, no una lista de tecnologías.
  headline: {
    es: "Ingeniero de Software Backend | Automatización e integraciones",
    en: "Backend Software Engineer | Automation & integrations",
  },
  tagline: {
    es: "Veo patrones en todo: en una canción, en un partido, en un problema. Programar es mi forma de ponerlos a trabajar.",
    en: "I see patterns in everything: in a song, in a match, in a problem. Programming is how I put them to work.",
  },
  status: {
    es: "Abierto a nuevas oportunidades",
    en: "Open to new opportunities",
  },
  projectCount: 15,
  timezone: "GMT-5",
  domain: "4ledmt.dev",
  contact: {
    linkedin: "https://www.linkedin.com/in/alejandrovega-stackblend/",
    github: "https://github.com/AlejandroVegaFullstackDev",
  },
} as const;

export const about = {
  es: [
    "Soy ingeniero de software backend con 4 años de experiencia en fintech, logística y medios. Me formé como técnico en programación en el SENA y hoy estudio Ingeniería de Sistemas.",
    "Me especializo en APIs, microservicios e integraciones, y en automatizar los procesos de operación del negocio. Elijo arquitectura y herramientas según lo que necesita el negocio y planeo el trabajo antes de escribir código.",
    "Uso IA en todo el ciclo de desarrollo, con agentes como Claude Code y Codex, siempre con revisión y tests antes de producción. Fuera del trabajo tengo proyectos propios: un sistema de soporte con LLMs, un agente para reuniones y un tutor de IA que vive en un repositorio.",
  ],
  en: [
    "I'm a backend software engineer with 4 years of experience in fintech, logistics and media. I trained as a programming technician at SENA and I'm now studying Systems Engineering.",
    "I specialize in APIs, microservices and integrations, and in automating the business's operational processes. I choose the architecture and tools based on what the business needs, and I plan the work before writing code.",
    "I use AI across the whole development cycle, with agents like Claude Code and Codex, always with review and tests before production. Outside of work I have my own projects: an LLM-powered support system, a meeting agent and an AI tutor that lives in a repository.",
  ],
} as const;
