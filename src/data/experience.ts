// Historial laboral (sección Experiencia). El primero es el más reciente.

export const experience = [
  {
    company: "Roda",
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    period: { es: "jun. 2025 — actualidad", en: "Jun 2025 — present" },
    note: { es: "Movilidad eléctrica y crédito", en: "Electric mobility & credit" },
    bullets: {
      es: [
        "Módulo de mayor volumen funcional de la plataforma administrativa interna: gestión de clientes y seguimiento de cartera.",
        "Portal de Clientes y módulo de logística y rastreo de flota, con la sincronización de dispositivos GPS contra la API del proveedor externo.",
        "Worker de sincronización GPS: cambié las peticiones HTTP seriales por ejecución concurrente con ThreadPoolExecutor, sesiones con keep-alive y un lock distribuido en Redis que elimina ejecuciones duplicadas entre workers.",
        "Módulo de recuperación de vehículos y créditos, de punta a punta, con dos interfaces administrativas.",
        "Cloud Run Job para monitoreo continuo de dispositivos GPS, backlog automatizado con Python y la API de Trello, y documentación de servicios en Notion segmentada por audiencia.",
      ],
      en: [
        "Largest functional module of the internal admin platform: customer management and portfolio follow-up.",
        "Customer Portal plus the logistics and fleet-tracking module, syncing GPS devices against the external provider's API.",
        "GPS sync worker: I replaced serial HTTP requests with concurrent execution via ThreadPoolExecutor, keep-alive sessions and a distributed Redis lock that stops workers from duplicating a run.",
        "End-to-end vehicle and credit recovery module, with two admin interfaces.",
        "Cloud Run Job for continuous GPS device monitoring, backlog automation with Python and the Trello API, and service documentation in Notion split by audience.",
      ],
    },
    stack: ["Python", "Flask", "FastAPI", "React", "PostgreSQL", "GCP", "Redis", "Docker"],
  },
  {
    company: "VegaReparaciones",
    role: { es: "Desarrollador web freelance", en: "Freelance web developer" },
    period: { es: "may. 2025 — sep. 2025", en: "May 2025 — Sep 2025" },
    note: { es: "Remoto", en: "Remote" },
    bullets: {
      es: [
        "Sitio completo de vegareparaciones.com en Next.js, con la arquitectura de contenido orientada a conversión.",
        "SEO técnico y local: datos estructurados JSON-LD, Search Console y Google Business Profile, más GA4 para iterar el contenido según el comportamiento real de los clientes. En producción: 100 en SEO, 100 en buenas prácticas, 96 en accesibilidad y 90 en rendimiento.",
        "Despliegues automatizados y gestión de dominio y DNS, con entregas continuas sin intervención manual.",
      ],
      en: [
        "Built vegareparaciones.com end to end in Next.js, with a content architecture aimed at conversion.",
        "Technical and local SEO: JSON-LD structured data, Search Console and Google Business Profile, plus GA4 to iterate content from real customer behaviour. In production: 100 SEO, 100 best practices, 96 accessibility, 90 performance.",
        "Automated deployments and domain/DNS management, leaving the site shipping continuously with no manual steps.",
      ],
    },
    stack: ["Next.js", "SEO técnico", "GA4", "CI/CD"],
  },
  {
    company: "Kiki LATAM",
    role: { es: "Ingeniero de desarrollo middle full stack", en: "Middle full stack engineer" },
    period: { es: "may. 2024 — mar. 2025", en: "May 2024 — Mar 2025" },
    note: { es: "Logística", en: "Logistics" },
    bullets: {
      es: [
        "Automaticé la reprogramación de guías con un flujo asistido por IA que detectaba los casos elegibles, actualizaba las entregas y repartía reportes en Excel por Gmail.",
        "Módulo de escaneo masivo de códigos: más de 10.000 guías en segundos. Rediseñé los procedimientos en PostgreSQL bajo arquitectura hexagonal y el rendimiento del sistema subió ×10.",
        "Funcionalidades end-to-end de la plataforma logística en React y NestJS, apoyo a la app móvil en Flutter y adopción de Scrum en el equipo de tecnología.",
      ],
      en: [
        "Automated waybill rescheduling with an AI-assisted flow that spotted eligible cases, updated deliveries and sent Excel reports over Gmail.",
        "Bulk code-scanning module: over 10,000 waybills in seconds. I redesigned the PostgreSQL procedures under a hexagonal architecture and system throughput went up ×10.",
        "End-to-end features for the logistics platform in React and NestJS, support for the Flutter mobile app and Scrum adoption across the tech team.",
      ],
    },
    stack: ["NestJS", "React", "PostgreSQL", "Flutter"],
  },
  {
    company: "Pulzo",
    role: { es: "Desarrollador Backend / Data Tracking", en: "Backend / Data Tracking Developer" },
    period: { es: "abr. 2023 — may. 2024", en: "Apr 2023 — May 2024" },
    note: { es: "Antes practicante de software", en: "Previously software intern" },
    bullets: {
      es: [
        "Procesos ETL en Python para integrar Universal Analytics y GA4 en BigQuery, con más de 5 años de datos históricos de audiencia centralizados.",
        "Microservicios en Node.js con front en Angular para unificar la gestión de accesos del personal en CMS, Gmail y otras plataformas.",
        "Portal web en Laravel y PHP, soporte a sitios WordPress y etiquetado con Google Tag Manager.",
      ],
      en: [
        "Python ETL processes to bring Universal Analytics and GA4 into BigQuery, centralizing over 5 years of historical audience data.",
        "Node.js microservices with an Angular front end to unify staff access management across the CMS, Gmail and other platforms.",
        "Web portal in Laravel and PHP, support for WordPress sites and tagging with Google Tag Manager.",
      ],
    },
    stack: ["Python", "Node.js", "Angular", "BigQuery", "Laravel"],
  },
] as const;
