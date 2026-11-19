// Otros proyectos de código abierto (ejemplos y herramientas). El orden de aparición lo arma ./index.ts.

export const openSource = [
  {
    slug: "cufe-dian",
    n: "010",
    name: { es: "CUFE Scraper DIAN", en: "CUFE DIAN Scraper" },
    kicker: { es: "Automatización fiscal · Python", en: "Tax automation · Python" },
    plain: {
      es: "Consultar facturas electrónicas en la DIAN una por una era lento. Este servicio lo hace en lote y guarda los resultados.",
      en: "Looking up e-invoices on the DIAN site one by one was slow. This service does it in bulk and stores the results.",
    },
    summary: {
      es: "Servicio Flask + Selenium que automatiza la consulta masiva de CUFEs en el catálogo DIAN. Extrae datos de emisor, receptor y eventos; los persiste en MySQL vía REST API. Dockerizado, con tests (pytest) y CI en GitHub Actions.",
      en: "Flask + Selenium service that automates bulk CUFE lookups in the DIAN catalog. Extracts issuer, receiver and event data; persists it in MySQL via REST API. Dockerized, with tests (pytest) and CI on GitHub Actions.",
    },
    role: { es: "Autor", en: "Author" },
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
    n: "011",
    name: { es: "API de envíos NestJS", en: "NestJS Shipment API" },
    kicker: { es: "Backend · NestJS", en: "Backend · NestJS" },
    plain: {
      es: "Una API para registrar envíos que calcula sola la tarifa según la distancia.",
      en: "An API to register shipments that calculates the fee from the distance on its own.",
    },
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
    n: "012",
    name: { es: "Task Manager Laravel", en: "Laravel Task Manager" },
    kicker: { es: "Full stack · Laravel", en: "Full stack · Laravel" },
    plain: {
      es: "Un gestor de tareas con usuarios y login, hecho para practicar una arquitectura ordenada y con pruebas.",
      en: "A task manager with users and login, built to practice a clean, tested architecture.",
    },
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
    n: "013",
    name: { es: "Microservicio e-Bike Autolock", en: "e-Bike Autolock Microservice" },
    kicker: { es: "Clean Architecture · Python", en: "Clean Architecture · Python" },
    plain: {
      es: "El sistema que bloquea y desbloquea bicicletas eléctricas según su ubicación y la contraseña del usuario.",
      en: "The system that locks and unlocks e-bikes based on their location and the user's password.",
    },
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
    n: "014",
    name: { es: "Extractor Universal Analytics", en: "Universal Analytics Extractor" },
    kicker: { es: "Data · Python", en: "Data · Python" },
    plain: {
      es: "Una herramienta para sacar reportes de Google Analytics a Excel sin hacerlo a mano.",
      en: "A tool to pull Google Analytics reports into Excel without doing it by hand.",
    },
    summary: {
      es: "Herramienta Python que extrae reportes de Universal Analytics (Reporting API v4) y los exporta a CSV/Excel. Arquitectura por capas (domain · usecases · controller · infrastructure · view), con tests (pytest) y CI en GitHub Actions.",
      en: "Python tool that extracts Universal Analytics reports (Reporting API v4) and exports them to CSV/Excel. Layered architecture (domain · usecases · controller · infrastructure · view), with tests (pytest) and CI on GitHub Actions.",
    },
    role: { es: "Autor", en: "Author" },
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
    n: "015",
    name: { es: "Reportes GA4 · Factory Method", en: "GA4 Reports · Factory Method" },
    kicker: { es: "Patrón de diseño · Python", en: "Design pattern · Python" },
    plain: {
      es: "Reportes diarios de Google Analytics 4 exportados automáticamente, fáciles de extender con nuevos tipos de reporte.",
      en: "Daily Google Analytics 4 reports exported automatically, easy to extend with new report types.",
    },
    summary: {
      es: "Generador de reportes de Google Analytics 4 (Data API v1beta) que exporta métricas diarias a CSV. Usa el patrón Factory Method para construir distintos tipos de reporte, con arquitectura por capas, tests (pytest) y CI.",
      en: "Google Analytics 4 report generator (Data API v1beta) that exports daily metrics to CSV. Uses the Factory Method pattern to build different report types, with layered architecture, tests (pytest) and CI.",
    },
    role: { es: "Autor", en: "Author" },
    year: "2024",
    github: "https://github.com/AlejandroVegaFullstackDev/GA4_Reports_FactoryMethod",
    stack: ["Python", "GA4 Data API", "pandas", "Factory Method"],
    metrics: [
      { k: { es: "patrón", en: "pattern" }, v: "Factory Method" },
      { k: { es: "api", en: "api" }, v: "GA4 v1beta" },
      { k: { es: "tests", en: "tests" }, v: "pytest" },
    ],
  },
] as const;
