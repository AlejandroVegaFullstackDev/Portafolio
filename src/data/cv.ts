// Contenido del CV en PDF (pages/alejandro-vega-cv-[lang].pdf.ts). Es el CV ATS de
// Alejandro, versión pública: sin correo ni teléfono (un PDF público se scrapea).
// **texto** se imprime en negrita.

type L = { es: string; en: string };

interface CvJob { org: string; role: L; meta: L; bullets: L[] }

export const cv = {
  headline: {
    es: 'Full Stack Developer · React · Python (FastAPI / Flask) · NestJS · PostgreSQL · BigQuery',
    en: 'Full Stack Developer · React · Python (FastAPI / Flask) · NestJS · PostgreSQL · BigQuery',
  },
  location: { es: 'Bogotá, Colombia (GMT-5) · Remoto / híbrido', en: 'Bogotá, Colombia (GMT-5) · Remote / hybrid' },
  profile: {
    es: 'Desarrollador Full Stack en la industria desde 2023 (programando desde 2021), en fintech, logística y medios. Me encargo de funcionalidades de punta a punta, desde el diseño hasta producción, y trabajo cerca de negocio: entiendo el problema antes de escribir código y propongo la forma más simple de resolverlo. Mi foco es quitar trabajo manual: pasé la generación de +10.000 guías de envío de horas a segundos, construí el rastreo GPS de una flota de ~500 vehículos y automatizaciones que le ahorran al equipo entre 5 y 20 horas por semana.',
    en: 'Full Stack Developer in the industry since 2023 (coding since 2021), across fintech, logistics and media. I own features end to end, from design to production, and I work close to the business: I understand the problem before writing code and propose the simplest way to solve it. My focus is removing manual work: I took the generation of 10,000+ shipping labels from hours to seconds, built GPS tracking for a ~500-vehicle fleet, and automations that save the team 5 to 20 hours a week.',
  },
  experience: [
    {
      org: 'Roda',
      role: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
      meta: { es: 'Fintech de movilidad (vehículos eléctricos y a gasolina) · Jun 2025 – actual', en: 'Mobility fintech (electric and gas vehicles) · Jun 2025 – present' },
      bullets: [
        { es: 'Diseñé y lideré la **plataforma inicial de rastreo GPS**: hoy operaciones ve en un mapa la ubicación de los **~500 vehículos** de la flota. (Integración con el operador GPS, procesamiento de datos y API.)', en: 'Designed and led the **initial GPS tracking platform**: operations now sees the **~500 fleet vehicles** on a map. (GPS operator integration, data processing and API.)' },
        { es: 'Automaticé procesos de **pagos, créditos y cartera** que se hacían a mano, con **menos errores y descuadres** al aplicar pagos. (Microservicios en Python: FastAPI / Flask.)', en: 'Automated manual **payments, credit and collections** processes, with **fewer errors and mismatches** when applying payments. (Python microservices: FastAPI / Flask.)' },
        { es: 'Construí el **CRM** y los paneles internos con los que trabaja operaciones, además de vistas para clientes. (React + Vite.)', en: 'Built the **CRM** and internal dashboards operations works with, plus customer-facing views. (React + Vite.)' },
        { es: 'Automaticé tareas repetitivas del equipo, que ahora ahorran **entre 5 y 20 horas por semana**. (APIs de Trello, Notion y Gmail.)', en: 'Automated the team\'s repetitive tasks, now saving **5 to 20 hours a week**. (Trello, Notion and Gmail APIs.)' },
        { es: 'Creé una herramienta con IA y contexto técnico y de negocio que ayuda a los **PMs a redactar historias de usuario**.', en: 'Built an AI tool, grounded in technical and business context, that helps **PMs write user stories**.' },
      ],
    },
    {
      org: 'VegaReparaciones',
      role: { es: 'Full Stack Developer (freelance)', en: 'Full Stack Developer (freelance)' },
      meta: { es: '2025', en: '2025' },
      bullets: [
        { es: 'Diseñé y desarrollé el sitio del negocio para que lo encuentren en Google: puntajes de Google PageSpeed de **SEO 100, accesibilidad 96 y rendimiento 90**. (Next.js.)', en: 'Designed and built the business website so customers find it on Google: Google PageSpeed scores of **SEO 100, accessibility 96 and performance 90**. (Next.js.)' },
      ],
    },
    {
      org: 'Kiki LATAM',
      role: { es: 'Desarrollador Middle', en: 'Mid-level Developer' },
      meta: { es: 'Logística / e-commerce · 2024 – 2025', en: 'Logistics / e-commerce · 2024 – 2025' },
      bullets: [
        { es: 'La generación de guías de envío se hacía **a mano, una por una, y tomaba horas**. La convertí en un proceso de **segundos para +10.000 guías**, y operaciones dejó de hacerlo manualmente. (Stored procedure en PostgreSQL invocado desde NestJS.)', en: 'Shipping labels were generated **by hand, one at a time, taking hours**. I turned it into a **seconds-long process for 10,000+ labels**, and operations stopped doing it manually. (PostgreSQL stored procedure called from NestJS.)' },
        { es: 'Conecté la plataforma con **transportadoras externas** y construí pantallas para la operación. (APIs REST en NestJS / Node.js.)', en: 'Connected the platform with **external carriers** and built screens for operations. (REST APIs in NestJS / Node.js.)' },
        { es: 'Armé **grafos de la arquitectura de microservicios** para que el equipo entendiera dependencias y flujos entre servicios.', en: 'Built **graphs of the microservice architecture** so the team could understand dependencies and flows between services.' },
      ],
    },
    {
      org: 'Pulzo',
      role: { es: 'Desarrollador Backend Data Tracking Jr. (ingresé como practicante)', en: 'Junior Backend Data Tracking Developer (joined as an intern)' },
      meta: { es: 'Medio digital · 2023 – 2024 · ascendido de practicante a desarrollador en 6 meses', en: 'Digital media · 2023 – 2024 · promoted from intern to developer in 6 months' },
      bullets: [
        { es: 'Junté **más de 5 años de datos de audiencia** en un solo lugar y creé desde cero los **dashboards que usan el equipo comercial y los directivos**. (Python, BigQuery, Looker Studio.)', en: 'Brought **5+ years of audience data** into one place and built the **dashboards the sales team and leadership use** from scratch. (Python, BigQuery, Looker Studio.)' },
        { es: 'Migré la analítica del sitio a la nueva versión de Google (**UA a GA4**) **sin perder el histórico**, e implementé la medición de eventos.', en: 'Migrated the site analytics to Google\'s new version (**UA to GA4**) **without losing history**, and implemented event tracking.' },
      ],
    },
  ] satisfies CvJob[],
  projects: [
    {
      name: 'Support Triage',
      link: 'github.com/AlejandroVegaFullstackDev/support-triage',
      meta: { es: 'Open source · 2026', en: 'Open source · 2026' },
      bullets: [
        { es: 'Sistema de soporte orientado a eventos: API en **NestJS + PostgreSQL**, agente de triage en **FastAPI** y panel en **React**, comunicados por **RabbitMQ** con colas de dead-letter.', en: 'Event-driven support system: **NestJS + PostgreSQL** API, **FastAPI** triage agent and **React** panel, connected through **RabbitMQ** with dead-letter queues.' },
        { es: 'Integración de **LLMs (Claude / OpenAI) con salida estructurada** y fallback a un clasificador local. **CI en GitHub Actions** con tests y prueba end-to-end en Docker Compose; decisiones documentadas en ADRs.', en: '**LLM integration (Claude / OpenAI) with structured output** and a local classifier fallback. **CI on GitHub Actions** with tests and an end-to-end run in Docker Compose; decisions documented as ADRs.' },
      ],
    },
  ],
  skills: [
    { k: { es: 'Frontend', en: 'Frontend' }, v: { es: 'React, Vite, Angular, Astro, TypeScript, JavaScript, HTML, CSS', en: 'React, Vite, Angular, Astro, TypeScript, JavaScript, HTML, CSS' } },
    { k: { es: 'Backend', en: 'Backend' }, v: { es: 'Python (FastAPI, Flask), Node.js (NestJS), APIs REST, microservicios, RabbitMQ, integraciones con terceros', en: 'Python (FastAPI, Flask), Node.js (NestJS), REST APIs, microservices, RabbitMQ, third-party integrations' } },
    { k: { es: 'Datos', en: 'Data' }, v: { es: 'PostgreSQL (stored procedures, optimización), TypeORM, SQL, BigQuery, GA4, Looker Studio', en: 'PostgreSQL (stored procedures, optimization), TypeORM, SQL, BigQuery, GA4, Looker Studio' } },
    { k: { es: 'Cloud y DevOps', en: 'Cloud & DevOps' }, v: { es: 'Docker, Docker Compose, GitHub Actions (CI), tests automatizados (Pytest, Jest), GCP (BigQuery), AWS (cómputo), Git', en: 'Docker, Docker Compose, GitHub Actions (CI), automated tests (Pytest, Jest), GCP (BigQuery), AWS (compute), Git' } },
    { k: { es: 'IA y automatización', en: 'AI & automation' }, v: { es: 'integración de LLMs (Claude, OpenAI) con salida estructurada, desarrollo asistido con agentes de IA, APIs de Trello, Notion y Gmail', en: 'LLM integration (Claude, OpenAI) with structured output, AI-agent-assisted development, Trello, Notion and Gmail APIs' } },
  ],
  education: [
    { es: '**Ingeniería de Sistemas**, UNIMINUTO (en curso) · **Técnico en Programación**, SENA (2021 – 2022)', en: '**Systems Engineering**, UNIMINUTO (in progress) · **Programming Technician**, SENA (2021 – 2022)' },
    { es: '**Idiomas** — Español nativo · Inglés intermedio (B1): lectura y escritura técnica.', en: '**Languages** — Spanish (native) · English intermediate (B1): technical reading and writing.' },
  ],
};
