export const portfolioData = {
  identity: {
    name: "Alejandro Vega",
    handle: "@alejandrovega-stackblend",
    initials: "AV",
    location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
    yearsExp: 4,
    education: { es: "SENA 1.5 años y 3 años en UNIMINUTO", en: "1.5 years at SENA and 3 years at UNIMINUTO" },
    title: { es: "Desarrollador Full Stack Semi Senior", en: "Semi Senior Full Stack Developer" },
    tagline: {
      es: "Desarrollo productos web de punta a punta: frontend, backend, automatización, datos y plataformas internas que sí aguantan operación real.",
      en: "I build end-to-end web products: frontend, backend, automation, data and internal platforms for real operations.",
    },
    status: {
      es: "Disponible para incorporación inmediata",
      en: "Available for immediate hire",
    },
    projectCount: 6,
    timezone: "GMT-5",
    contact: {
      linkedin: "https://www.linkedin.com/in/alejandrovega-stackblend/",
      github: "https://github.com/AlejandroVegaFullstackDev",
    },
  },

  about: {
    es: [
      "Soy Desarrollador Full Stack Semi Senior con 4 años de experiencia construyendo soluciones web, APIs, automatizaciones y plataformas internas para equipos reales.",
      "Trabajo cómodo en todo el ciclo: frontend, backend, bases de datos, integraciones, despliegue y mejora continua. También disfruto mucho construir interfaces claras y usables.",
      "Me gusta resolver fricción operativa: procesos manuales, integraciones rotas, reportes lentos o sistemas que necesitan escalar sin perder claridad.",
    ],
    en: [
      "Semi Senior Full Stack Developer with 4 years of experience building web solutions, APIs, automations and internal platforms for real teams.",
      "I work comfortably across the full cycle: frontend, backend, databases, integrations, deployment and continuous improvement. I also really enjoy building clear, usable interfaces.",
      "I like solving operational friction: manual processes, brittle integrations, slow reports or systems that need to scale without losing clarity.",
    ],
  },

  stack: {
    languages: ["PHP", "Python", "JavaScript", "TypeScript", "SQL"],
    frameworks: ["NestJS", "Node.js", "Laravel", "React", "Angular", "Express", "Flask"],
    databases: ["MySQL", "PostgreSQL", "BigQuery", "Redis", "SQLite", "SQLAlchemy", "Eloquent"],
    cloud: ["AWS", "Google Cloud", "GCP", "Docker", "Docker Compose", "Vercel"],
    architectures: ["Clean Architecture", "Hexagonal", "Layered", "Microservices", "MVC", "REST APIs"],
    patterns: ["Factory Method", "Repository", "Dependency Injection", "DTO", "Service Layer", "SOLID"],
    testing: ["PHPUnit", "pytest", "Jest", "GitHub Actions", "CI/CD"],
    tools: ["Git", "GitHub", "GitLab", "Bitbucket", "Selenium", "Scrum", "Kanban"],
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
        es: "Modelos en BigQuery, dashboards GA4 y reportes ejecutivos. Decisiones con datos, no con corazonadas.",
        en: "BigQuery models, GA4 dashboards and exec reports. Decisions with data, not gut feelings.",
      },
      tags: ["BigQuery", "GA4", "SQL"],
    },
  ],

  experience: [
    {
      company: "Roda",
      role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
      period: { es: "Actualidad", en: "Present" },
      body: {
        es: "Desarrollo de productos internos y plataformas de operación. Foco en escalabilidad y automatización.",
        en: "Internal products and operations platforms. Focus on scalability and automation.",
      },
      stack: ["NestJS", "React", "PostgreSQL", "AWS"],
    },
    {
      company: "Kiki Latam",
      role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
      period: { es: "2023 — 2024", en: "2023 — 2024" },
      body: {
        es: "Sistema de envíos y backoffice. APIs en NestJS, integraciones de pago y operadores logísticos.",
        en: "Shipping system and backoffice. NestJS APIs, payment integrations and logistics operators.",
      },
      stack: ["NestJS", "TypeScript", "MySQL", "GCP"],
    },
    {
      company: "Pulzo",
      role: { es: "Desarrollador Backend", en: "Backend Developer" },
      period: { es: "2022 — 2023", en: "2022 — 2023" },
      body: {
        es: "Pipelines de datos para uno de los medios digitales más grandes de Colombia. Reportería en BigQuery + GA4.",
        en: "Data pipelines for one of Colombia's largest digital media outlets. Reporting in BigQuery + GA4.",
      },
      stack: ["Python", "PHP", "BigQuery", "GA4"],
    },
  ],

  projects: [
    {
      slug: "cufe-dian",
      n: "001",
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
      n: "002",
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
      n: "003",
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
      n: "004",
      name: { es: "Microservicio e-Bike Autolock", en: "e-Bike Autolock Microservice" },
      kicker: { es: "Clean Architecture · Python", en: "Clean Architecture · Python" },
      summary: {
        es: "Microservicio para sistema de bloqueo automático de e-bikes en Roda. Clean Architecture en Python: domain, use cases, interfaces API y capa de infraestructura. Simulación GPS, triggers, hashing de contraseñas, Docker, tests de dominio (pytest) y CI.",
        en: "Microservice for e-bike automatic locking system at Roda. Clean Architecture in Python: domain, use cases, API interfaces and infrastructure layer. GPS simulation, triggers, password hashing, Docker, domain tests (pytest) and CI.",
      },
      role: { es: "Desarrollador backend", en: "Backend developer" },
      year: "2025",
      github: "https://github.com/AlejandroVegaFullstackDev/roda-Technical",
      stack: ["Python", "Flask", "PostgreSQL", "Docker", "Clean Architecture"],
      metrics: [
        { k: { es: "arquitectura", en: "architecture" }, v: "Clean" },
        { k: { es: "empresa", en: "company" }, v: "Roda" },
        { k: { es: "runtime", en: "runtime" }, v: "Docker" },
      ],
    },
    {
      slug: "universal-analytics",
      n: "005",
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
      n: "006",
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
      timeline: {
        es: [["Día 01","Análisis del portal DIAN y flujo de consulta"],["Día 03","Selenium navegando el catálogo DIAN"],["Día 07","Extracción de emisor, receptor y eventos"],["Día 10","Endpoint REST + persistencia MySQL"],["Día 14","Dockerización y pruebas de carga"]],
        en: [["Day 01","Analysis of DIAN portal and query flow"],["Day 03","Selenium navigating the DIAN catalog"],["Day 07","Extraction of issuer, receiver and events"],["Day 10","REST endpoint + MySQL persistence"],["Day 14","Dockerization and load testing"]],
      },
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
      timeline: {
        es: [["Día 01","Setup NestJS + estructura modular"],["Día 03","Endpoint registro de envíos + cálculo de tarifa"],["Día 05","Historial completo + validaciones DTO"],["Día 07","Docker + variables de entorno"],["Día 09","Limpieza, documentación y README"]],
        en: [["Day 01","NestJS setup + modular structure"],["Day 03","Shipment registration endpoint + tariff calculation"],["Day 05","Full history + DTO validations"],["Day 07","Docker + environment variables"],["Day 09","Cleanup, docs and README"]],
      },
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
      timeline: {
        es: [["Día 01","Setup Laravel + PostgreSQL + Docker"],["Día 03","Capa de servicios + repositorios"],["Día 06","Auth JWT con tymon/jwt-auth"],["Día 09","Tests PHPUnit de feature e unitarios"],["Día 12","CI/CD GitHub Actions + README"]],
        en: [["Day 01","Laravel + PostgreSQL + Docker setup"],["Day 03","Service layer + repositories"],["Day 06","JWT auth with tymon/jwt-auth"],["Day 09","PHPUnit feature and unit tests"],["Day 12","CI/CD GitHub Actions + README"]],
      },
      learnings: {
        es: [["Capas en Laravel","Separar servicios y repositorios de los modelos Eloquent hace los tests mucho más limpios."],["JWT con tymon","Para APIs stateless, los tokens JWT de tymon/jwt-auth son suficientes y simples."],["CI desde el inicio","Agregar GitHub Actions el día 1 evita la deuda técnica de tests tardíos."]],
        en: [["Layers in Laravel","Separating services and repositories from Eloquent models makes tests much cleaner."],["JWT with tymon","For stateless APIs, tymon/jwt-auth tokens are enough and simple."],["CI from day one","Adding GitHub Actions on day 1 avoids the tech debt of late testing."]],
      },
    },
    "roda-technical": {
      challenge: {
        es: "Roda necesitaba un microservicio para controlar el autolock de e-bikes: validar contraseñas, registrar eventos GPS, manejar triggers de bloqueo/desbloqueo y mantener todo desacoplado y testeable.",
        en: "Roda needed a microservice to control e-bike autolock: validate passwords, log GPS events, handle lock/unlock triggers and keep everything decoupled and testable.",
      },
      solution: {
        es: "Implementé Clean Architecture en Python: capa de dominio pura, casos de uso independientes de frameworks, interfaces Flask como capa de entrada, e infraestructura (DB, GPS) en la capa más externa. Docker para el entorno.",
        en: "Implemented Clean Architecture in Python: pure domain layer, framework-independent use cases, Flask interfaces as the entry layer, and infrastructure (DB, GPS) in the outermost layer. Docker for the environment.",
      },
      arch: ["Dispositivo e-Bike", "Flask API", "Use Cases", "Domain", "PostgreSQL"],
      code: `<span class="c"># domain/usecases/unlock_bike.py</span>\n<span class="k">class</span> UnlockBikeUseCase:\n    <span class="k">def</span> __init__(self, bike_repo, gps_service):\n        self.bike_repo  = bike_repo\n        self.gps_service = gps_service\n\n    <span class="k">def</span> execute(self, bike_id, password):\n        bike = self.bike_repo.find(bike_id)\n        <span class="k">if not</span> bike.verify_password(password):\n            <span class="k">raise</span> InvalidCredentials()\n        location = self.gps_service.get(bike_id)\n        bike.unlock(location)\n        <span class="k">return</span> self.bike_repo.save(bike)`,
      timeline: {
        es: [["Sem 01","Diseño de arquitectura + entidades de dominio"],["Sem 02","Casos de uso: lock, unlock, registro GPS"],["Sem 03","Interfaces Flask + validaciones"],["Sem 04","Infraestructura DB + simulación GPS"],["Sem 05","Docker + migraciones + seguridad (hashing)"]],
        en: [["Wk 01","Architecture design + domain entities"],["Wk 02","Use cases: lock, unlock, GPS logging"],["Wk 03","Flask interfaces + validations"],["Wk 04","DB infrastructure + GPS simulation"],["Wk 05","Docker + migrations + security (hashing)"]],
      },
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
      timeline: {
        es: [["Día 01","Diseño por capas + entidad AnalyticsReport"],["Día 03","Cliente Reporting API v4 con service account"],["Día 05","Casos de uso + exportación a CSV/Excel"],["Día 07","Tests con pytest + CI en GitHub Actions"],["Día 08","Limpieza (venv fuera del repo) + README"]],
        en: [["Day 01","Layered design + AnalyticsReport entity"],["Day 03","Reporting API v4 client with service account"],["Day 05","Use cases + CSV/Excel export"],["Day 07","pytest tests + CI on GitHub Actions"],["Day 08","Cleanup (venv out of the repo) + README"]],
      },
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
      timeline: {
        es: [["Día 01","Modelado del Factory Method + productos de reporte"],["Día 03","Cliente GA4 Data API v1beta (service account)"],["Día 05","Caso de uso + exportación diaria a CSV"],["Día 07","Tests (factory + caso de uso) con pytest + CI"],["Día 08","Limpieza (venv fuera) + deps faltantes + README"]],
        en: [["Day 01","Factory Method modeling + report products"],["Day 03","GA4 Data API v1beta client (service account)"],["Day 05","Use case + daily CSV export"],["Day 07","Tests (factory + use case) with pytest + CI"],["Day 08","Cleanup (venv out) + missing deps + README"]],
      },
      learnings: {
        es: [["Factory Method","Agregar un reporte nuevo es solo crear una clase y registrarla: el resto del código no cambia."],["Desacoplar la API","Mover la excepción al dominio permite testear el caso de uso sin importar las dependencias de Google."],["requirements honesto","El proyecto no corría tras un install limpio: faltaban pandas y python-dotenv en requirements."]],
        en: [["Factory Method","Adding a new report is just creating a class and registering it: the rest of the code stays the same."],["Decoupling the API","Moving the exception to the domain lets you test the use case without importing Google's dependencies."],["Honest requirements","The project didn't run after a clean install: pandas and python-dotenv were missing from requirements."]],
      },
    },
  },
} as const;

export type Lang = "es" | "en";
export type Project = typeof portfolioData.projects[number];
