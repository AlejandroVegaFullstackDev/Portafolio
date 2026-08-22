export const portfolioData = {
  identity: {
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
    title: { es: "Desarrollador Full Stack Semi Senior", en: "Semi Senior Full Stack Developer" },
    tagline: {
      es: "Desarrollo productos web de punta a punta: frontend, backend, automatización, datos y plataformas internas que sí aguantan operación real.",
      en: "I build end-to-end web products: frontend, backend, automation, data and internal platforms for real operations.",
    },
    status: {
      es: "Disponible para incorporación inmediata",
      en: "Available for immediate hire",
    },
    projectCount: 12,
    timezone: "GMT-5",
    domain: "4ledmt.dev",
    contact: {
      linkedin: "https://www.linkedin.com/in/alejandrovega-stackblend/",
      github: "https://github.com/AlejandroVegaFullstackDev",
    },
  },

  // Cifras reales, todas trazables a un proyecto concreto.
  highlights: [
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
  ],

  about: {
    es: [
      "Soy Desarrollador Full Stack Semi Senior. Desde 2023 construyo soluciones web, APIs, automatizaciones y plataformas internas para equipos reales.",
      "Trabajo cómodo en todo el ciclo: frontend, backend, bases de datos, integraciones, despliegue y mejora continua. También disfruto mucho construir interfaces claras y usables.",
      "Me gusta resolver fricción operativa: procesos manuales, integraciones rotas, reportes lentos o sistemas que necesitan escalar sin perder claridad.",
    ],
    en: [
      "Semi Senior Full Stack Developer. Since 2023 I've been building web solutions, APIs, automations and internal platforms for real teams.",
      "I work comfortably across the full cycle: frontend, backend, databases, integrations, deployment and continuous improvement. I also really enjoy building clear, usable interfaces.",
      "I like solving operational friction: manual processes, brittle integrations, slow reports or systems that need to scale without losing clarity.",
    ],
  },

  stack: {
    languages: ["TypeScript", "Python", "PHP", "JavaScript", "SQL"],
    frameworks: ["NestJS", "Node.js", "React", "Angular", "Next.js", "Astro", "Laravel", "Flask", "Tailwind CSS"],
    databases: ["PostgreSQL", "MySQL", "BigQuery", "Redis"],
    cloud: ["GCP (Cloud Run, BigQuery)", "AWS", "Docker", "Linux", "CI/CD", "Vercel"],
    architectures: ["Clean Architecture", "Hexagonal", "Layered", "Microservices", "REST APIs"],
    patterns: ["Factory Method", "Repository", "Dependency Injection", "DTO", "Service Layer", "SOLID"],
    testing: ["pytest", "Jest", "PHPUnit", "GitHub Actions"],
    tools: ["Git", "GitHub", "GitLab", "Power Query / Power BI", "Selenium", "Scrum", "Kanban"],
  },

  // Sección del CV que no existía en el sitio.
  automation: {
    title: { es: "Automatización e IA aplicada", en: "Automation & applied AI" },
    items: {
      es: [
        "Rediseñé mi flujo de desarrollo alrededor de agentes de IA para exploración de código, refactorización y documentación técnica, con revisión humana y pruebas antes de cada entrega.",
        "Automatizo procesos internos y propios con Python y APIs de Trello, Notion y Gmail: creación de tareas, documentación y reportes recurrentes.",
        "Evalúo riesgos de seguridad en repositorios y dependencias con análisis asistido por IA antes de integrarlos a producción.",
      ],
      en: [
        "Rebuilt my development workflow around AI agents for code exploration, refactoring and technical documentation, with human review and tests before every delivery.",
        "I automate internal and personal processes with Python and the Trello, Notion and Gmail APIs: task creation, documentation and recurring reports.",
        "I assess security risks in repositories and dependencies with AI-assisted analysis before they reach production.",
      ],
    },
  },

  services: [
    {
      n: "01",
      title: { es: "Automatización de procesos", en: "Process automation" },
      body: {
        es: "Convierto procesos manuales en pipelines confiables: ETL, scrapers, workers, integraciones DIAN/SUNAT, jobs programados.",
        en: "I turn manual processes into reliable pipelines: ETL, scrapers, workers, tax-authority integrations, scheduled jobs.",
      },
      tags: ["Python", "Cron", "ETL", "BigQuery"],
    },
    {
      n: "02",
      title: { es: "APIs y backends a medida", en: "Custom APIs & backends" },
      body: {
        es: "Servicios REST/GraphQL en NestJS, Laravel o Node. Auth, colas, observabilidad y documentación lista para producción.",
        en: "REST/GraphQL services in NestJS, Laravel or Node. Auth, queues, observability and docs ready for production.",
      },
      tags: ["NestJS", "Laravel", "PostgreSQL"],
    },
    {
      n: "03",
      title: { es: "Aplicaciones full stack", en: "Full stack applications" },
      body: {
        es: "Productos completos con React/Angular en el front y Node/PHP/Python en el back. Diseño, build, deploy y mantenimiento.",
        en: "End-to-end products with React/Angular on the front and Node/PHP/Python on the back. Design, build, deploy and maintain.",
      },
      tags: ["React", "Angular", "TypeScript"],
    },
    {
      n: "04",
      title: { es: "Datos y reportería", en: "Data & reporting" },
      body: {
        es: "Modelos en BigQuery, dashboards GA4 y reportes ejecutivos.",
        en: "BigQuery models, GA4 dashboards and executive reports.",
      },
      tags: ["BigQuery", "GA4", "SQL"],
    },
  ],

  experience: [
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
      stack: ["NestJS", "Python", "React", "PostgreSQL", "GCP", "Redis", "Docker"],
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
  ],

  projects: [
    // ── Trabajo de producción ─────────────────────────────────────────────────
    {
      slug: "worker-gps",
      n: "001",
      name: { es: "Worker de sincronización GPS", en: "GPS sync worker" },
      kicker: { es: "Concurrencia y locks · Python", en: "Concurrency & locks · Python" },
      summary: {
        es: "Worker que sincroniza el estado de los dispositivos GPS de la flota contra la API del proveedor. Tenía un cuello de botella de latencia por peticiones HTTP en serie; lo reemplacé por ejecución concurrente con ThreadPoolExecutor, sesiones con keep-alive y un lock distribuido en Redis que impide que dos ejecuciones procesen el mismo lote.",
        en: "Worker that syncs the fleet's GPS device state against the provider's API. It had a latency bottleneck from serial HTTP requests; I replaced it with concurrent execution via ThreadPoolExecutor, keep-alive sessions and a distributed Redis lock that stops two runs from processing the same batch.",
      },
      role: { es: "Desarrollador backend", en: "Backend developer" },
      year: "2025",
      company: "Roda",
      github: null,
      stack: ["Python", "Redis", "Cloud Run", "GCP", "PostgreSQL"],
      metrics: [
        { k: { es: "concurrencia", en: "concurrency" }, v: "ThreadPool" },
        { k: { es: "exclusión", en: "mutual exclusion" }, v: "Redis lock" },
        { k: { es: "runtime", en: "runtime" }, v: "Cloud Run" },
      ],
    },
    {
      slug: "plataforma-interna",
      n: "002",
      name: { es: "Plataforma administrativa interna", en: "Internal admin platform" },
      kicker: { es: "Plataforma interna · NestJS", en: "Internal platform · NestJS" },
      summary: {
        es: "El componente de mayor volumen funcional de la plataforma administrativa interna de Roda: gestión de clientes, seguimiento de cartera y los flujos que el equipo de operación usa todos los días. Backend en NestJS, interfaz en React y PostgreSQL sobre GCP.",
        en: "The largest functional component of Roda's internal admin platform: customer management, portfolio follow-up and the flows the operations team uses every day. NestJS backend, React interface and PostgreSQL on GCP.",
      },
      role: { es: "Desarrollador principal", en: "Lead developer" },
      year: "2025",
      company: "Roda",
      github: null,
      stack: ["NestJS", "React", "PostgreSQL", "GCP", "TypeScript"],
      metrics: [
        { k: { es: "backend", en: "backend" }, v: "NestJS" },
        { k: { es: "datos", en: "data" }, v: "PostgreSQL" },
        { k: { es: "nube", en: "cloud" }, v: "GCP" },
      ],
    },
    {
      slug: "recuperacion-cartera",
      n: "003",
      name: { es: "Recuperación de cartera y activos", en: "Portfolio & asset recovery" },
      kicker: { es: "Operación de campo · NestJS", en: "Field operations · NestJS" },
      summary: {
        es: "Recuperación de vehículos y créditos, de punta a punta. Dos interfaces administrativas que sustituyeron un proceso que se llevaba entre hojas de cálculo y coordinación por chat con los equipos de campo.",
        en: "Vehicle and credit recovery, end to end. Two admin interfaces that replaced a process previously run across spreadsheets and chat coordination with the field teams.",
      },
      role: { es: "Desarrollador principal", en: "Lead developer" },
      year: "2025",
      company: "Roda",
      github: null,
      stack: ["NestJS", "React", "PostgreSQL", "GCP"],
      metrics: [
        { k: { es: "interfaces", en: "interfaces" }, v: "2" },
        { k: { es: "alcance", en: "scope" }, v: { es: "Punta a punta", en: "End to end" } },
        { k: { es: "reemplaza", en: "replaces" }, v: { es: "Proceso manual", en: "Manual process" } },
      ],
    },
    {
      slug: "vegareparaciones",
      n: "004",
      name: { es: "vegareparaciones.com", en: "vegareparaciones.com" },
      kicker: { es: "Sitio y SEO · Next.js", en: "Site & SEO · Next.js" },
      summary: {
        es: "Sitio completo en Next.js para un negocio de reparaciones en Bogotá: arquitectura de contenido orientada a conversión, SEO técnico y local con JSON-LD, Search Console y Google Business Profile, GA4 para iterar sobre el comportamiento real, y despliegues automatizados con dominio y DNS propios.",
        en: "A full Next.js site for a repairs business in Bogotá: conversion-oriented content architecture, technical and local SEO with JSON-LD, Search Console and Google Business Profile, GA4 to iterate on real behaviour, and automated deployments with its own domain and DNS.",
      },
      role: { es: "Full stack solo", en: "Solo full stack" },
      year: "2025",
      company: "VegaReparaciones",
      github: null,
      url: "https://vegareparaciones.com",
      stack: ["Next.js", "JSON-LD", "GA4", "CI/CD"],
      metrics: [
        { k: { es: "seo", en: "seo" }, v: "100" },
        { k: { es: "accesibilidad", en: "accessibility" }, v: "96" },
        { k: { es: "rendimiento", en: "performance" }, v: "90" },
      ],
    },
    {
      slug: "escaneo-masivo",
      n: "005",
      name: { es: "Escaneo masivo de guías", en: "Bulk waybill scanning" },
      kicker: { es: "Rendimiento · PostgreSQL", en: "Performance · PostgreSQL" },
      summary: {
        es: "Módulo de escaneo masivo con lectores de código para registrar condiciones de devolución (fraude, daño). Procesa más de 10.000 guías en segundos: rediseñé los procedimientos en PostgreSQL y moví el módulo a arquitectura hexagonal, con lo que el rendimiento del sistema subió ×10.",
        en: "Bulk scanning module with barcode readers to register return conditions (fraud, damage). It processes over 10,000 waybills in seconds: I redesigned the PostgreSQL procedures and moved the module to a hexagonal architecture, taking system throughput up ×10.",
      },
      role: { es: "Desarrollador a cargo", en: "Lead developer" },
      year: "2024",
      company: "Kiki LATAM",
      github: null,
      stack: ["NestJS", "PostgreSQL", "TypeScript", "Hexagonal"],
      metrics: [
        { k: { es: "guías por corrida", en: "waybills per run" }, v: "+10.000" },
        { k: { es: "rendimiento", en: "throughput" }, v: "×10" },
        { k: { es: "arquitectura", en: "architecture" }, v: "Hexagonal" },
      ],
    },
    {
      slug: "etl-bigquery",
      n: "006",
      name: { es: "ETL de audiencia a BigQuery", en: "Audience ETL into BigQuery" },
      kicker: { es: "Datos · Python", en: "Data · Python" },
      summary: {
        es: "Procesos ETL en Python que integran Universal Analytics y GA4 en BigQuery para uno de los medios digitales más grandes de Colombia. Centralizaron más de 5 años de datos históricos de tráfico y comportamiento de audiencia, y con ellos los reportes que antes tomaban horas.",
        en: "Python ETL processes bringing Universal Analytics and GA4 into BigQuery for one of Colombia's largest digital outlets. They centralized over 5 years of historical traffic and audience data, and with it the reports that used to take hours.",
      },
      role: { es: "Desarrollador a cargo", en: "Lead developer" },
      year: "2023",
      company: "Pulzo",
      github: null,
      stack: ["Python", "BigQuery", "GA4", "SQL"],
      metrics: [
        { k: { es: "histórico", en: "history" }, v: "+5 años" },
        { k: { es: "fuentes", en: "sources" }, v: "UA + GA4" },
        { k: { es: "destino", en: "sink" }, v: "BigQuery" },
      ],
    },

    // ── Código abierto ────────────────────────────────────────────────────────
    {
      slug: "cufe-dian",
      n: "007",
      name: { es: "CUFE Scraper DIAN", en: "CUFE DIAN Scraper" },
      kicker: { es: "Automatización fiscal · Python", en: "Tax automation · Python" },
      summary: {
        es: "Servicio Flask + Selenium que automatiza la consulta masiva de CUFEs en el catálogo DIAN. Extrae datos de emisor, receptor y eventos; los persiste en MySQL vía REST API. Dockerizado, con tests (pytest) y CI en GitHub Actions.",
        en: "Flask + Selenium service that automates bulk CUFE lookups in the DIAN catalog. Extracts issuer, receiver and event data; persists it in MySQL via REST API. Dockerized, with tests (pytest) and CI on GitHub Actions.",
      },
      role: { es: "Desarrollador a cargo", en: "Lead developer" },
      year: "2024",
      github: "https://github.com/AlejandroVegaFullstackDev/Dian-Cufe",
      stack: ["Python", "Flask", "Selenium", "MySQL", "Docker"],
      metrics: [
        { k: { es: "interfaz", en: "interface" }, v: "REST API" },
        { k: { es: "fuente", en: "source" }, v: "DIAN" },
        { k: { es: "runtime", en: "runtime" }, v: "Docker" },
      ],
    },
    {
      slug: "shipping-nestjs",
      n: "008",
      name: { es: "API de envíos NestJS", en: "NestJS Shipment API" },
      kicker: { es: "Backend · NestJS", en: "Backend · NestJS" },
      summary: {
        es: "API NestJS para gestión de envíos: registro, cálculo automático de tarifas por distancia e historial completo. Arquitectura hexagonal (domain → use cases → controllers), validación con ValidationPipe, tests con Jest y CI en GitHub Actions. Dockerizado.",
        en: "NestJS API for shipment management: registration, automatic tariff calculation by distance and full history. Hexagonal architecture (domain → use cases → controllers), input validation with ValidationPipe, Jest tests and CI on GitHub Actions. Dockerized.",
      },
      role: { es: "Desarrollador backend", en: "Backend developer" },
      year: "2024",
      github: "https://github.com/AlejandroVegaFullstackDev/shipment-system",
      stack: ["NestJS", "TypeScript", "Jest", "Docker"],
      metrics: [
        { k: { es: "interfaz", en: "interface" }, v: "REST API" },
        { k: { es: "tests", en: "tests" }, v: "Jest" },
        { k: { es: "patrón", en: "pattern" }, v: "Hexagonal" },
      ],
    },
    {
      slug: "task-laravel",
      n: "009",
      name: { es: "Task Manager Laravel", en: "Laravel Task Manager" },
      kicker: { es: "Full stack · Laravel", en: "Full stack · Laravel" },
      summary: {
        es: "API REST full stack con Laravel + PostgreSQL. CRUD de tareas, autenticación JWT (tymon/jwt-auth), arquitectura en capas (controllers → services → repositories → models), CI/CD con GitHub Actions y tests con PHPUnit.",
        en: "Full stack REST API with Laravel + PostgreSQL. Task CRUD, JWT auth (tymon/jwt-auth), layered architecture (controllers → services → repositories → models), CI/CD with GitHub Actions and PHPUnit tests.",
      },
      role: { es: "Full stack solo", en: "Solo full stack" },
      year: "2023",
      github: "https://github.com/AlejandroVegaFullstackDev/taskManager",
      stack: ["Laravel", "PHP", "PostgreSQL", "Docker", "PHPUnit"],
      metrics: [
        { k: { es: "auth", en: "auth" }, v: "JWT" },
        { k: { es: "tests", en: "tests" }, v: "PHPUnit" },
        { k: { es: "ci/cd", en: "ci/cd" }, v: "Actions" },
      ],
    },
    {
      slug: "roda-technical",
      n: "010",
      name: { es: "Microservicio e-Bike Autolock", en: "e-Bike Autolock Microservice" },
      kicker: { es: "Clean Architecture · Python", en: "Clean Architecture · Python" },
      summary: {
        es: "Microservicio para sistema de bloqueo automático de e-bikes. Clean Architecture en Python: domain, use cases, interfaces API y capa de infraestructura. Simulación GPS, triggers, hashing de contraseñas, Docker, tests de dominio (pytest) y CI.",
        en: "Microservice for an e-bike automatic locking system. Clean Architecture in Python: domain, use cases, API interfaces and infrastructure layer. GPS simulation, triggers, password hashing, Docker, domain tests (pytest) and CI.",
      },
      role: { es: "Desarrollador backend", en: "Backend developer" },
      year: "2025",
      github: "https://github.com/AlejandroVegaFullstackDev/roda-Technical",
      stack: ["Python", "Flask", "PostgreSQL", "Docker", "Clean Architecture"],
      metrics: [
        { k: { es: "arquitectura", en: "architecture" }, v: "Clean" },
        { k: { es: "tests", en: "tests" }, v: "pytest" },
        { k: { es: "runtime", en: "runtime" }, v: "Docker" },
      ],
    },
    {
      slug: "universal-analytics",
      n: "011",
      name: { es: "Extractor Universal Analytics", en: "Universal Analytics Extractor" },
      kicker: { es: "Data · Python", en: "Data · Python" },
      summary: {
        es: "Herramienta Python que extrae reportes de Universal Analytics (Reporting API v4) y los exporta a CSV/Excel. Arquitectura por capas (domain · usecases · controller · infrastructure · view), con tests (pytest) y CI en GitHub Actions.",
        en: "Python tool that extracts Universal Analytics reports (Reporting API v4) and exports them to CSV/Excel. Layered architecture (domain · usecases · controller · infrastructure · view), with tests (pytest) and CI on GitHub Actions.",
      },
      role: { es: "Desarrollador a cargo", en: "Lead developer" },
      year: "2024",
      github: "https://github.com/AlejandroVegaFullstackDev/UAnalyticsExtractInfo",
      stack: ["Python", "Google Analytics", "pandas", "openpyxl"],
      metrics: [
        { k: { es: "api", en: "api" }, v: "Reporting v4" },
        { k: { es: "salida", en: "output" }, v: "CSV/Excel" },
        { k: { es: "tests", en: "tests" }, v: "pytest" },
      ],
    },
    {
      slug: "ga4-factory",
      n: "012",
      name: { es: "Reportes GA4 · Factory Method", en: "GA4 Reports · Factory Method" },
      kicker: { es: "Patrón de diseño · Python", en: "Design pattern · Python" },
      summary: {
        es: "Generador de reportes de Google Analytics 4 (Data API v1beta) que exporta métricas diarias a CSV. Usa el patrón Factory Method para construir distintos tipos de reporte, con arquitectura por capas, tests (pytest) y CI.",
        en: "Google Analytics 4 report generator (Data API v1beta) that exports daily metrics to CSV. Uses the Factory Method pattern to build different report types, with layered architecture, tests (pytest) and CI.",
      },
      role: { es: "Desarrollador a cargo", en: "Lead developer" },
      year: "2024",
      github: "https://github.com/AlejandroVegaFullstackDev/GA4_Reports_FactoryMethod",
      stack: ["Python", "GA4 Data API", "pandas", "Factory Method"],
      metrics: [
        { k: { es: "patrón", en: "pattern" }, v: "Factory Method" },
        { k: { es: "api", en: "api" }, v: "GA4 v1beta" },
        { k: { es: "tests", en: "tests" }, v: "pytest" },
      ],
    },
  ],

  deep: {
    "worker-gps": {
      challenge: {
        es: "El worker consultaba la API del proveedor GPS dispositivo por dispositivo, en serie y abriendo una conexión nueva cada vez. Con la flota creciendo, el ciclo de sincronización se alargaba hasta solaparse consigo mismo: dos ejecuciones simultáneas escribiendo el mismo estado.",
        en: "The worker queried the GPS provider's API device by device, serially, opening a fresh connection each time. As the fleet grew, the sync cycle stretched until it overlapped itself: two simultaneous runs writing the same state.",
      },
      solution: {
        es: "Reescribí la fase de consulta con ThreadPoolExecutor para lanzar las peticiones en paralelo y reusé conexiones con sesiones keep-alive. Alrededor del ciclo completo puse un lock distribuido en Redis: una segunda ejecución encuentra el lock tomado y termina en vez de duplicar el trabajo.",
        en: "I rewrote the query phase with ThreadPoolExecutor to fire requests in parallel and reused connections through keep-alive sessions. Around the whole cycle I put a distributed Redis lock: a second run finds the lock held and exits instead of duplicating work.",
      },
      arch: ["Cloud Scheduler", "Cloud Run Job", "Redis lock", "API del proveedor GPS", "PostgreSQL"],
      learnings: {
        es: [
          ["El lock antes que la velocidad", "Paralelizar sin exclusión mutua solo consigue que las ejecuciones duplicadas choquen más rápido."],
          ["keep-alive importa", "Buena parte del tiempo por dispositivo se iba en el handshake TLS, no en la respuesta del proveedor."],
          ["Un job, no un servicio", "Una tarea periódica y sin estado encaja mejor en un Cloud Run Job que en un servicio siempre encendido."],
        ],
        en: [
          ["Lock before speed", "Parallelizing without mutual exclusion only makes duplicate runs collide faster."],
          ["keep-alive matters", "A good share of the per-device time went into the TLS handshake, not the provider's response."],
          ["A job, not a service", "A periodic, stateless task fits a Cloud Run Job better than an always-on service."],
        ],
      },
    },
    "plataforma-interna": {
      challenge: {
        es: "La operación interna vivía repartida entre herramientas sueltas: los datos del cliente en un sitio, el estado de la cartera en otro y la coordinación con campo en un tercero. Faltaba un lugar donde el equipo pudiera ver y mover todo el ciclo del cliente.",
        en: "Internal operations lived scattered across separate tools: customer data in one place, portfolio status in another, field coordination in a third. There was no single place where the team could see and move the whole customer cycle.",
      },
      solution: {
        es: "Construí el módulo central de la plataforma administrativa: API en NestJS con casos de uso separados de los controladores, interfaz en React para el equipo de operación y PostgreSQL como fuente de verdad, todo desplegado en GCP.",
        en: "I built the platform's central module: a NestJS API with use cases separated from controllers, a React interface for the operations team and PostgreSQL as the source of truth, all deployed on GCP.",
      },
      arch: ["React", "API NestJS", "Casos de uso", "PostgreSQL", "GCP"],
      learnings: {
        es: [
          ["Volumen funcional", "El módulo más grande no es el más difícil de escribir, sino el más difícil de mantener legible mientras crece."],
          ["Casos de uso aparte", "Separar los casos de uso del controlador es lo que permitió agregar flujos sin reescribir los existentes."],
          ["La operación manda", "Las decisiones de modelo salieron de ver cómo trabaja el equipo, no del diagrama que yo tenía en la cabeza."],
        ],
        en: [
          ["Functional volume", "The biggest module isn't the hardest to write, it's the hardest to keep readable as it grows."],
          ["Use cases apart", "Separating use cases from the controller is what let me add flows without rewriting existing ones."],
          ["Operations lead", "The model decisions came from watching how the team works, not from the diagram I had in my head."],
        ],
      },
    },
    "recuperacion-cartera": {
      challenge: {
        es: "La recuperación de vehículos y créditos se coordinaba entre hojas de cálculo y mensajes con los equipos de campo. No había trazabilidad de en qué punto estaba cada caso ni quién lo tenía.",
        en: "Vehicle and credit recovery was coordinated between spreadsheets and messages with the field teams. There was no traceability of where each case stood or who was holding it.",
      },
      solution: {
        es: "Desarrollé el módulo de punta a punta con dos interfaces administrativas: una para el seguimiento de casos y otra para la coordinación con campo. Cada caso tiene estado, responsable e historial, y el proceso manual dejó de existir.",
        en: "I built the module end to end with two admin interfaces: one for case tracking and one for field coordination. Every case has a state, an owner and a history, and the manual process went away.",
      },
      arch: ["React", "API NestJS", "Casos de uso", "PostgreSQL", "Equipos de campo"],
      learnings: {
        es: [
          ["Dos interfaces, un dominio", "Oficina y campo necesitan vistas distintas del mismo caso; el dominio compartido evita que se desincronicen."],
          ["El estado explícito", "Modelar el estado del caso como dato, y no como una convención en un comentario, es lo que dio la trazabilidad."],
          ["Reemplazar, no envolver", "Digitalizar la hoja de cálculo tal cual habría heredado sus vicios; valió la pena rediseñar el flujo."],
        ],
        en: [
          ["Two interfaces, one domain", "Office and field need different views of the same case; a shared domain keeps them from drifting apart."],
          ["Explicit state", "Modeling case state as data, rather than as a convention in a comment, is what produced the traceability."],
          ["Replace, don't wrap", "Digitizing the spreadsheet as-is would have inherited its flaws; redesigning the flow was worth it."],
        ],
      },
    },
    "vegareparaciones": {
      challenge: {
        es: "El negocio no existía para quien lo buscaba. Sin sitio propio, sin presencia en búsqueda local y sin forma de saber qué buscaban realmente los clientes antes de llamar.",
        en: "The business didn't exist for anyone searching for it. No site of its own, no local search presence and no way to know what customers were actually looking for before calling.",
      },
      solution: {
        es: "Construí el sitio en Next.js con la arquitectura de contenido pensada desde la intención de búsqueda. Sumé datos estructurados JSON-LD, Search Console y Google Business Profile para la parte local, y GA4 para iterar el contenido con el comportamiento real. Quedó en 100 de SEO, 100 de buenas prácticas, 96 de accesibilidad y 90 de rendimiento, con despliegues automatizados y DNS propio.",
        en: "I built the site in Next.js with the content architecture designed around search intent. I added JSON-LD structured data, Search Console and Google Business Profile for the local side, and GA4 to iterate content against real behaviour. It landed at 100 SEO, 100 best practices, 96 accessibility and 90 performance, with automated deployments and its own DNS.",
      },
      arch: ["Next.js", "JSON-LD", "Search Console", "GA4", "CI/CD + DNS"],
      learnings: {
        es: [
          ["El SEO local es datos", "Google Business Profile y los datos estructurados pesaron más que cualquier ajuste de copy."],
          ["Medir antes de escribir", "GA4 mostró qué servicios buscaba la gente de verdad, y el contenido se reordenó según eso."],
          ["90 de rendimiento", "Los 10 puntos que faltan son las imágenes del cliente; el resto del presupuesto ya está gastado bien."],
        ],
        en: [
          ["Local SEO is data", "Google Business Profile and structured data mattered more than any copy tweak."],
          ["Measure before writing", "GA4 showed which services people actually searched for, and the content was reordered around that."],
          ["90 on performance", "The missing 10 points are the client's images; the rest of the budget is already well spent."],
        ],
      },
    },
    "escaneo-masivo": {
      challenge: {
        es: "El registro de devoluciones se hacía guía por guía. Con lotes de miles, la operación se quedaba esperando al sistema, y las condiciones de devolución (fraude, daño) se anotaban aparte y después.",
        en: "Return registration was done waybill by waybill. With batches of thousands, operations sat waiting on the system, and return conditions (fraud, damage) were noted separately and after the fact.",
      },
      solution: {
        es: "Rediseñé los procedimientos en PostgreSQL para trabajar por lote en vez de por fila y moví el módulo a arquitectura hexagonal, con el dominio separado del acceso a datos. El escaneo con lectores entra directo y procesa más de 10.000 guías en segundos; el rendimiento del sistema subió ×10.",
        en: "I redesigned the PostgreSQL procedures to work per batch instead of per row and moved the module to a hexagonal architecture, with the domain separated from data access. Reader scanning feeds in directly and processes over 10,000 waybills in seconds; system throughput went up ×10.",
      },
      arch: ["Lector de códigos", "API NestJS", "Casos de uso", "Procedimientos PostgreSQL", "Reportes"],
      learnings: {
        es: [
          ["Por lote, no por fila", "El salto de rendimiento vino de cambiar la forma de la consulta, no de agregar máquina."],
          ["Hexagonal para poder medir", "Con el dominio aislado se podía probar la lógica de devolución sin levantar la base."],
          ["El hardware manda el ritmo", "El lector define la cadencia de entrada; el backend tenía que absorberla sin pedir pausas."],
        ],
        en: [
          ["Per batch, not per row", "The performance jump came from changing the shape of the query, not from adding hardware."],
          ["Hexagonal to be able to measure", "With the domain isolated, return logic could be tested without bringing up the database."],
          ["Hardware sets the pace", "The reader defines the input cadence; the backend had to absorb it without asking for pauses."],
        ],
      },
    },
    "etl-bigquery": {
      challenge: {
        es: "Los análisis de tráfico se armaban a mano, exportando de la interfaz de Analytics cada vez. El histórico estaba repartido entre Universal Analytics y GA4, y responder una pregunta de audiencia tomaba horas.",
        en: "Traffic analyses were assembled by hand, exporting from the Analytics UI every time. History was split between Universal Analytics and GA4, and answering an audience question took hours.",
      },
      solution: {
        es: "Escribí procesos ETL en Python que consultan ambas APIs y cargan el resultado en BigQuery con un modelo común. Con más de 5 años de histórico centralizado, los reportes pasaron a ser consultas SQL sobre una sola tabla.",
        en: "I wrote Python ETL processes that query both APIs and load the result into BigQuery under a common model. With over 5 years of history centralized, reports became SQL queries against a single table.",
      },
      arch: ["Universal Analytics", "GA4 Data API", "ETL Python", "BigQuery", "Reportes SQL"],
      learnings: {
        es: [
          ["Dos APIs, un modelo", "Lo caro no fue extraer, fue decidir cómo hacer comparables las métricas de UA y GA4."],
          ["El histórico es el activo", "Cinco años de datos valen más que cualquier dashboard que se construya encima."],
          ["Backfill una sola vez", "Cargar el histórico de golpe y dejar el incremental corriendo evita reprocesar para siempre."],
        ],
        en: [
          ["Two APIs, one model", "The expensive part wasn't extraction, it was deciding how to make UA and GA4 metrics comparable."],
          ["History is the asset", "Five years of data is worth more than any dashboard built on top of it."],
          ["Backfill once", "Loading history in one pass and leaving the incremental running avoids reprocessing forever."],
        ],
      },
    },

    "cufe-dian": {
      challenge: {
        es: "Consultar el portal DIAN manualmente es lento, repetitivo y propenso a errores. Necesitaba un servicio que recibiera un array de CUFEs y devolviera la información estructurada sin intervención humana.",
        en: "Manually querying the DIAN portal is slow, repetitive and error-prone. I needed a service that receives an array of CUFEs and returns structured data without human intervention.",
      },
      solution: {
        es: "Construí un servicio Flask con Selenium que automatiza la navegación en el catálogo DIAN. Recibe CUFEs vía POST, extrae emisor, receptor, eventos y enlace a representación gráfica, y guarda todo en MySQL.",
        en: "Built a Flask service with Selenium that automates navigation in the DIAN catalog. Receives CUFEs via POST, extracts issuer, receiver, events and graphic representation link, and saves everything in MySQL.",
      },
      arch: ["Array CUFEs", "Flask API", "Selenium", "Portal DIAN", "MySQL"],
      code: `<span class="c"># routes.py — endpoint principal</span>\n<span class="k">@app</span>.route(<span class="s">'/api/v1/consult_invoice_information'</span>, methods=[<span class="s">'POST'</span>])\n<span class="k">def</span> consult_invoice():\n    cufes = request.json.get(<span class="s">'cufes'</span>, [])\n    results = []\n    <span class="k">for</span> cufe <span class="k">in</span> cufes:\n        data = scraper.query(cufe)\n        db.save(data)\n        results.append(data)\n    <span class="k">return</span> jsonify(results)`,
      learnings: {
        es: [["Selenium frágil","El scraping depende del DOM. Un cambio en el portal rompe todo. Tests de regresión son clave."],["Rate limiting","El portal DIAN tiene límites. Delays entre requests salvan el servicio."],["Docker primero","Containerizar desde el día 1 evita el 'funciona en mi máquina'."]],
        en: [["Selenium is fragile","Scraping depends on the DOM. A portal change breaks everything. Regression tests are key."],["Rate limiting","The DIAN portal has limits. Delays between requests save the service."],["Docker first","Containerizing from day 1 avoids 'works on my machine'."]],
      },
    },
    "shipping-nestjs": {
      challenge: {
        es: "Quería construir una API de gestión de envíos con buenas prácticas de NestJS: módulos, controllers, services bien separados, cálculo automático de tarifas y un entorno reproducible con Docker.",
        en: "I wanted to build a shipment management API showcasing NestJS best practices: clean module/controller/service separation, automatic tariff calculation and a reproducible Docker environment.",
      },
      solution: {
        es: "API NestJS con arquitectura hexagonal que registra envíos, calcula la tarifa automáticamente según la distancia y expone el historial completo. Validación con ValidationPipe, tests con Jest y CI. Lista para producción con Docker.",
        en: "NestJS API with hexagonal architecture that registers shipments, automatically calculates the fee based on distance and exposes the full history. Input validation with ValidationPipe, Jest tests and CI. Production-ready with Docker.",
      },
      arch: ["Client", "Controller", "Use Cases", "Domain", "Docker"],
      code: `<span class="c">// create-shipment.usecase.ts — fee calculation</span>\n<span class="k">async</span> execute(request: CreateShipmentRequest): <span class="k">Promise</span>&lt;Shipment&gt; {\n  <span class="k">const</span> fee = <span class="k">this</span>.calculateShipmentFee(request.distance);\n  <span class="k">return</span> <span class="k">this</span>.shipmentRepository.create(\n    <span class="k">new</span> Shipment(<span class="k">null</span>, request.recipient, request.sender,\n      request.content, <span class="k">new</span> Date(), request.distance, fee),\n  );\n}\n\ncalculateShipmentFee(distance: <span class="k">number</span>): <span class="k">number</span> {\n  <span class="k">return</span> BASE_RATE + distance * RATE_PER_KM;\n}`,
      learnings: {
        es: [["Módulos NestJS","La modularidad de NestJS fuerza buenas prácticas desde el inicio."],["DTOs + class-validator","Validar en la entrada es más barato que manejar errores adentro."],["Docker desde cero","Partir con un Dockerfile limpio define el entorno para siempre."]],
        en: [["NestJS Modules","NestJS modularity enforces good practices from the start."],["DTOs + class-validator","Validating at the boundary is cheaper than handling errors inside."],["Docker from scratch","Starting with a clean Dockerfile defines the environment permanently."]],
      },
    },
    "task-laravel": {
      challenge: {
        es: "Construir un proyecto full stack en Laravel que demostrara arquitectura hexagonal real, autenticación JWT, CI/CD funcional y cobertura de tests — no solo un CRUD básico.",
        en: "Build a full stack Laravel project demonstrating real hexagonal architecture, JWT auth, functional CI/CD and test coverage — not just a basic CRUD.",
      },
      solution: {
        es: "API REST con arquitectura en capas (controllers → services → repositories → models), autenticación JWT via tymon/jwt-auth con expiración configurable, tests de feature e unitarios con PHPUnit, y pipeline CI/CD en GitHub Actions.",
        en: "REST API with layered architecture (controllers → services → repositories → models), JWT auth via tymon/jwt-auth with configurable expiration, feature and unit tests with PHPUnit, and CI/CD pipeline in GitHub Actions.",
      },
      arch: ["Client", "Laravel API", "JWT (tymon)", "Repositories", "PostgreSQL"],
      code: `<span class="c">// app/Models/Task.php</span>\n<span class="k">class</span> Task <span class="k">extends</span> Model {\n    <span class="k">protected</span> $casts = [\n        <span class="s">'due_at'</span>      =&gt; <span class="s">'datetime'</span>,\n        <span class="s">'completed_at'</span> =&gt; <span class="s">'datetime'</span>,\n    ];\n\n    <span class="k">public function</span> isOverdue(): bool {\n        <span class="k">return</span> $this-&gt;due_at\n            &amp;&amp; $this-&gt;due_at-&gt;isPast()\n            &amp;&amp; !$this-&gt;completed_at;\n    }\n}`,
      learnings: {
        es: [["Capas en Laravel","Separar servicios y repositorios de los modelos Eloquent hace los tests mucho más limpios."],["JWT con tymon","Para APIs stateless, los tokens JWT de tymon/jwt-auth son suficientes y simples."],["CI desde el inicio","Agregar GitHub Actions el día 1 evita la deuda técnica de tests tardíos."]],
        en: [["Layers in Laravel","Separating services and repositories from Eloquent models makes tests much cleaner."],["JWT with tymon","For stateless APIs, tymon/jwt-auth tokens are enough and simple."],["CI from day one","Adding GitHub Actions on day 1 avoids the tech debt of late testing."]],
      },
    },
    "roda-technical": {
      challenge: {
        es: "Un sistema de bloqueo automático de e-bikes necesita validar contraseñas, registrar eventos GPS y manejar triggers de bloqueo y desbloqueo, todo desacoplado y testeable sin hardware presente.",
        en: "An e-bike automatic locking system needs to validate passwords, log GPS events and handle lock/unlock triggers, all decoupled and testable with no hardware present.",
      },
      solution: {
        es: "Implementé Clean Architecture en Python: capa de dominio pura, casos de uso independientes de frameworks, interfaces Flask como capa de entrada, e infraestructura (DB, GPS) en la capa más externa. Docker para el entorno.",
        en: "Implemented Clean Architecture in Python: pure domain layer, framework-independent use cases, Flask interfaces as the entry layer, and infrastructure (DB, GPS) in the outermost layer. Docker for the environment.",
      },
      arch: ["Dispositivo e-Bike", "Flask API", "Use Cases", "Domain", "PostgreSQL"],
      code: `<span class="c"># domain/usecases/unlock_bike.py</span>\n<span class="k">class</span> UnlockBikeUseCase:\n    <span class="k">def</span> __init__(self, bike_repo, gps_service):\n        self.bike_repo  = bike_repo\n        self.gps_service = gps_service\n\n    <span class="k">def</span> execute(self, bike_id, password):\n        bike = self.bike_repo.find(bike_id)\n        <span class="k">if not</span> bike.verify_password(password):\n            <span class="k">raise</span> InvalidCredentials()\n        location = self.gps_service.get(bike_id)\n        bike.unlock(location)\n        <span class="k">return</span> self.bike_repo.save(bike)`,
      learnings: {
        es: [["Clean Architecture","Invertir la dependencia hace el dominio 100% testeable sin base de datos."],["GPS simulation","Simular hardware desde código desbloquea el desarrollo sin dispositivos físicos."],["Hashing en dominio","El hashing de contraseñas pertenece al dominio, no a la infraestructura."]],
        en: [["Clean Architecture","Inverting dependencies makes the domain 100% testable without a database."],["GPS simulation","Simulating hardware in code enables development without physical devices."],["Hashing in domain","Password hashing belongs to the domain, not the infrastructure."]],
      },
    },
    "universal-analytics": {
      challenge: {
        es: "Respaldar manualmente reportes de Universal Analytics es lento y repetitivo. Necesitaba extraer métricas por rango de fechas y exportarlas de forma estructurada, manteniendo el cliente de Google separado de la lógica.",
        en: "Manually backing up Universal Analytics reports is slow and repetitive. I needed to extract metrics by date range and export them in a structured way, keeping the Google client separate from the logic.",
      },
      solution: {
        es: "Herramienta en capas (domain · usecases · controller · infrastructure · view): el cliente de la Reporting API v4 vive en infraestructura, los casos de uso orquestan la consulta y la salida se exporta a CSV/Excel. Tests de las capas puras con pytest y CI.",
        en: "Layered tool (domain · usecases · controller · infrastructure · view): the Reporting API v4 client lives in infrastructure, the use cases orchestrate the query, and the output is exported to CSV/Excel. Pure-layer tests with pytest and CI.",
      },
      arch: ["Service Account", "Reporting API v4", "Use Cases", "Controller", "CSV/Excel"],
      code: `<span class="c"># usecases/analytics_usecase.py</span>\n<span class="k">class</span> AnalyticsUsecase:\n    <span class="k">def</span> __init__(self, analytics_client):\n        self.analytics_client = analytics_client\n\n    <span class="k">def</span> fetch_report(self, report):\n        <span class="c"># el caso de uso no conoce a Google: depende de la abstracción</span>\n        <span class="k">return</span> self.analytics_client.fetch_report(report)`,
      learnings: {
        es: [["Capas testeables","Separar el cliente de Google del dominio permite testear la lógica sin red ni credenciales."],["Secretos fuera del repo","Las credenciales y el venv jamás deben versionarse: .gitignore + plantilla .example."],["API en EOL","Universal Analytics fue descontinuado en 2024; el proyecto queda como referencia de integración."]],
        en: [["Testable layers","Separating the Google client from the domain lets you test the logic without network or credentials."],["Secrets out of the repo","Credentials and the venv must never be versioned: .gitignore + .example template."],["EOL API","Universal Analytics was discontinued in 2024; the project stands as an integration reference."]],
      },
    },
    "ga4-factory": {
      challenge: {
        es: "Quería generar varios tipos de reporte de GA4 sin duplicar código ni acoplar la creación de cada query a la lógica de ejecución. Un caso ideal para aplicar un patrón de diseño.",
        en: "I wanted to generate several GA4 report types without duplicating code or coupling each query's creation to the execution logic. An ideal case for a design pattern.",
      },
      solution: {
        es: "Apliqué el patrón Factory Method: cada tipo de reporte es un producto que sabe construir su query, y una factory resuelve la clase concreta por su identificador. Arquitectura por capas, cliente de la GA4 Data API v1beta aislado, tests con pytest y CI.",
        en: "Applied the Factory Method pattern: each report type is a product that builds its own query, and a factory resolves the concrete class by its identifier. Layered architecture, an isolated GA4 Data API v1beta client, pytest tests and CI.",
      },
      arch: ["Factory", "GA4Report (producto)", "Use Case", "GA4 Data API v1beta", "CSV"],
      code: `<span class="c"># domain/ga4_report_domain.py — Factory Method</span>\n<span class="k">class</span> GA4ReportFactory:\n    _registry = {\n        <span class="s">"activeUserspPerDay"</span>: ActiveUsersPerDayReport,\n        <span class="s">"users"</span>: UsersReport,\n        <span class="s">"page_views"</span>: PageViewsReport,\n    }\n\n    <span class="k">@staticmethod</span>\n    <span class="k">def</span> create_report(report_type, start_date, end_date):\n        report_cls = GA4ReportFactory._registry.get(report_type)\n        <span class="k">if</span> report_cls <span class="k">is None</span>:\n            <span class="k">raise</span> ValueError(<span class="s">"Invalid report type"</span>)\n        <span class="k">return</span> report_cls().create_query_report(start_date, end_date)`,
      learnings: {
        es: [["Factory Method","Agregar un reporte nuevo es solo crear una clase y registrarla: el resto del código no cambia."],["Desacoplar la API","Mover la excepción al dominio permite testear el caso de uso sin importar las dependencias de Google."],["requirements honesto","El proyecto no corría tras un install limpio: faltaban pandas y python-dotenv en requirements."]],
        en: [["Factory Method","Adding a new report is just creating a class and registering it: the rest of the code stays the same."],["Decoupling the API","Moving the exception to the domain lets you test the use case without importing Google's dependencies."],["Honest requirements","The project didn't run after a clean install: pandas and python-dotenv were missing from requirements."]],
      },
    },
  },
} as const;

export type Lang = "es" | "en";
export type Project = typeof portfolioData.projects[number];
