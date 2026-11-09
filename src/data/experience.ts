// Historial laboral (sección Experiencia). El primero es el más reciente.
// Mismos hechos que el CV y LinkedIn: la fuente es banco.md del repo ai-job-search.

export const experience = [
  {
    company: "Roda",
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    period: { es: "jun. 2025 — actualidad", en: "Jun 2025 — present" },
    note: { es: "Fintech de movilidad", en: "Mobility fintech" },
    bullets: {
      es: [
        "Construí con NestJS, Python y Redis la plataforma de rastreo GPS con la que operaciones sigue la flota en un mapa.",
        "Automaticé procesos de pagos, créditos y cartera con microservicios en FastAPI y Flask.",
        "Desarrollé en React el CRM y los paneles internos del equipo de operaciones, y el portal de clientes.",
        "Automaticé tareas repetitivas del equipo con las APIs de Trello, Notion y Gmail.",
        "Despliego los servicios con Docker en Cloud Run de GCP.",
        "Creé un asistente con Claude que ayuda a los PMs a redactar historias de usuario con el contexto técnico del producto.",
      ],
      en: [
        "Built the GPS tracking platform operations uses to follow the fleet on a map, with NestJS, Python and Redis.",
        "Automated payment, credit and collections processes with FastAPI and Flask microservices.",
        "Built the CRM and the operations team's internal dashboards in React, plus the customer portal.",
        "Automated the team's repetitive tasks with the Trello, Notion and Gmail APIs.",
        "I deploy the services with Docker on GCP Cloud Run.",
        "Built a Claude-based assistant that helps PMs write user stories with the product's technical context.",
      ],
    },
    stack: ["NestJS", "Python", "FastAPI", "Flask", "Redis", "React", "PostgreSQL", "GCP", "Docker"],
  },
  {
    company: "VegaReparaciones",
    role: { es: "Desarrollador web (freelance)", en: "Web developer (freelance)" },
    period: { es: "may. 2025 — sep. 2025", en: "May 2025 — Sep 2025" },
    note: { es: "Remoto", en: "Remote" },
    bullets: {
      es: [
        "Diseñé y desarrollé en Next.js el sitio del negocio, con SEO técnico, optimización de rendimiento y despliegue automático con CI/CD.",
        "En PageSpeed: 100 en SEO, 96 en accesibilidad y 90 en rendimiento.",
      ],
      en: [
        "Designed and built the business website in Next.js, with technical SEO, performance tuning and automatic deployment through CI/CD.",
        "On PageSpeed: 100 SEO, 96 accessibility and 90 performance.",
      ],
    },
    stack: ["Next.js", "SEO técnico", "CI/CD"],
  },
  {
    company: "Kiki LATAM",
    role: { es: "Ingeniero de Desarrollo Middle", en: "Mid-level Software Engineer" },
    period: { es: "may. 2024 — mar. 2025", en: "May 2024 — Mar 2025" },
    note: { es: "Logística / e-commerce", en: "Logistics / e-commerce" },
    bullets: {
      es: [
        "Desarrollé funcionalidades de la plataforma logística en React y NestJS.",
        "Automaticé con un procedimiento en PostgreSQL la generación masiva de guías de envío, que antes se hacía una por una.",
        "Integré la plataforma con transportadoras externas mediante APIs REST.",
        "Automaticé con un flujo asistido por IA la reprogramación de guías y el envío de reportes por Gmail.",
        "Apoyé al equipo móvil en la app de Flutter y trabajé con Scrum.",
      ],
      en: [
        "Built features for the logistics platform in React and NestJS.",
        "Automated bulk shipping-label generation, previously done one label at a time, with a PostgreSQL procedure.",
        "Integrated the platform with external carriers through REST APIs.",
        "Automated label rescheduling and Gmail reporting with an AI-assisted flow.",
        "Supported the mobile team on the Flutter app and worked in Scrum.",
      ],
    },
    stack: ["NestJS", "React", "PostgreSQL", "Flutter"],
  },
  {
    company: "Pulzo",
    role: { es: "Desarrollador Backend / Data Tracking", en: "Backend / Data Tracking Developer" },
    period: { es: "oct. 2022 — may. 2024", en: "Oct 2022 — May 2024" },
    note: { es: "Medio digital · ingresé como practicante del SENA", en: "Digital media · joined as a SENA intern" },
    bullets: {
      es: [
        "Empecé maquetando interfaces y desarrollando funciones del portal en PHP y Laravel.",
        "Llevé los datos de audiencia del sitio a BigQuery con procesos en Python y armé los dashboards del equipo comercial.",
        "Construí microservicios en Node.js y un front en Angular para que RR.HH. gestione los accesos del personal desde un solo sistema.",
        "Migré la analítica del sitio de Universal Analytics a GA4 sin perder el histórico.",
      ],
      en: [
        "Started out building interfaces and portal features in PHP and Laravel.",
        "Moved the site's audience data into BigQuery with Python processes and built the sales team's dashboards.",
        "Built Node.js microservices and an Angular front end so HR can manage staff access from a single system.",
        "Migrated the site's analytics from Universal Analytics to GA4 without losing the history.",
      ],
    },
    stack: ["Python", "Node.js", "Angular", "BigQuery", "Laravel"],
  },
] as const;
