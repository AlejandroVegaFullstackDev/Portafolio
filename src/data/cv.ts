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
    es: 'Desarrollador Full Stack con 4 años construyendo productos en fintech, logística y medios. Trabajo de punta a punta: frontend en React, microservicios en Python y Node, integraciones con APIs de terceros y datos en PostgreSQL y BigQuery. Me enfoco en automatizar procesos manuales y en que los sistemas aguanten volumen real: pasé la generación de +10.000 guías logísticas de horas a segundos e integré el rastreo GPS de una flota de +500 vehículos.',
    en: 'Full Stack Developer with 4 years building products in fintech, logistics and media. I work end to end: React on the frontend, Python and Node microservices, third-party API integrations, and data in PostgreSQL and BigQuery. I focus on automating manual processes and on systems that handle real volume: I took the generation of 10,000+ shipping labels from hours to seconds and integrated GPS tracking for a fleet of 500+ vehicles.',
  },
  experience: [
    {
      org: 'Roda',
      role: { es: 'Full Stack Developer', en: 'Full Stack Developer' },
      meta: { es: 'Fintech de movilidad (vehículos eléctricos y a gasolina) · Jun 2025 – actual', en: 'Mobility fintech (electric and gas vehicles) · Jun 2025 – present' },
      bullets: [
        { es: 'Construí el backend y la integración de la **plataforma inicial de rastreo GPS**: conexión con el operador GPS, procesamiento de datos y API para visualizar en mapa **+500 vehículos** de la flota.', en: 'Built the backend and integration of the **initial GPS tracking platform**: connection to the GPS operator, data processing and an API to map **500+ fleet vehicles**.' },
        { es: 'Desarrollé microservicios en **Python (FastAPI / Flask)** para **pagos, créditos y cartera**. Automaticé procesos que eran manuales y **reduje errores y descuadres** en la aplicación de pagos.', en: 'Developed **Python (FastAPI / Flask)** microservices for **payments, credit and collections**. Automated manual processes and **reduced errors and mismatches** in payment application.' },
        { es: 'Construí funcionalidades de **CRM** y paneles internos en **React + Vite** para operaciones, además de vistas para clientes.', en: 'Built **CRM** features and internal dashboards in **React + Vite** for operations, plus customer-facing views.' },
        { es: 'Automaticé flujos internos con las APIs de Trello, Notion y Gmail. Ahorran **entre 5 y 20 horas semanales** al equipo.', en: 'Automated internal workflows with the Trello, Notion and Gmail APIs, saving the team **5 to 20 hours a week**.' },
      ],
    },
    {
      org: 'VegaReparaciones',
      role: { es: 'Full Stack Developer (freelance)', en: 'Full Stack Developer (freelance)' },
      meta: { es: '2025', en: '2025' },
      bullets: [
        { es: 'Diseñé y desarrollé el sitio web del cliente con puntajes de Lighthouse de **SEO 100, accesibilidad 96 y rendimiento 90**.', en: "Designed and built the client's website with Lighthouse scores of **SEO 100, accessibility 96 and performance 90**." },
      ],
    },
    {
      org: 'Kiki LATAM',
      role: { es: 'Desarrollador Middle', en: 'Mid-level Developer' },
      meta: { es: 'Logística / e-commerce · 2024 – 2025', en: 'Logistics / e-commerce · 2024 – 2025' },
      bullets: [
        { es: 'Rediseñé la generación masiva de guías logísticas, que antes se hacía **a mano, una por una**. Moví la carga a un **stored procedure en PostgreSQL** invocado desde **NestJS** y optimicé las consultas: **+10.000 guías en segundos** en vez de horas (**mejora de ×10 o más**).', en: 'Redesigned bulk shipping-label generation, previously done **by hand, one at a time**. Moved the load to a **PostgreSQL stored procedure** called from **NestJS** and optimized the queries: **10,000+ labels in seconds** instead of hours (**10× or better**).' },
        { es: 'Desarrollé **APIs REST** en NestJS / Node.js, integraciones con **transportadoras** externas y pantallas de frontend para la operación.', en: 'Developed **REST APIs** in NestJS / Node.js, integrations with external **carriers** and frontend screens for operations.' },
      ],
    },
    {
      org: 'Pulzo',
      role: { es: 'Desarrollador Backend Data Tracking Jr. (ingresé como practicante)', en: 'Junior Backend Data Tracking Developer (joined as an intern)' },
      meta: { es: 'Medio digital · 2023 – 2024 · ascendido de practicante a desarrollador en 6 meses', en: 'Digital media · 2023 – 2024 · promoted from intern to developer in 6 months' },
      bullets: [
        { es: 'Centralicé **más de 5 años de datos de Google Analytics** (UA y GA4) en **BigQuery** con pipelines en **Python**, y creé desde cero los **dashboards en Looker Studio** del equipo comercial y los directivos.', en: 'Centralized **5+ years of Google Analytics data** (UA and GA4) in **BigQuery** with **Python** pipelines, and built the **Looker Studio dashboards** for the sales team and leadership from scratch.' },
        { es: 'Ejecuté la **migración de UA a GA4 sin perder el histórico** e implementé el **tracking de eventos** del sitio.', en: 'Ran the **UA to GA4 migration without losing history** and implemented the site\'s **event tracking**.' },
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
