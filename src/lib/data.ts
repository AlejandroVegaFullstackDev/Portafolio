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
    projectCount: 4,
    timezone: "GMT-5",
    contact: {
      linkedin: "https://www.linkedin.com/in/alejandrovega-stackblend/",
      github: "https://github.com/AlejandroVegaFullstackDev",
      email: "alejandromatssuno18@gmail.com",
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
    frameworks: ["NestJS", "Node.js", "Laravel", "React", "Angular", "Express"],
    databases: ["MySQL", "PostgreSQL", "BigQuery", "Redis"],
    cloud: ["AWS", "Google Cloud", "GCP", "Docker"],
    tools: ["GitHub", "GitLab", "Bitbucket", "Scrum", "Kanban"],
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
        es: "Servicio Flask + Selenium que automatiza la consulta masiva de CUFEs en el catálogo DIAN. Extrae datos de emisor, receptor y eventos; los persiste en MySQL vía REST API. Dockerizado.",
        en: "Flask + Selenium service that automates bulk CUFE lookups in the DIAN catalog. Extracts issuer, receiver and event data; persists it in MySQL via REST API. Dockerized.",
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
        es: "API NestJS para gestión de envíos: registro, cálculo automático de tarifas por distancia e historial completo. Arquitectura modular (controllers → services → models) + Docker.",
        en: "NestJS API for shipment management: registration, automatic tariff calculation by distance and full history. Modular architecture (controllers → services → models) + Docker.",
      },
      role: { es: "Desarrollador backend", en: "Backend developer" },
      year: "2024",
      github: "https://github.com/AlejandroVegaFullstackDev/shipment-system",
      stack: ["NestJS", "TypeScript", "JavaScript", "Docker"],
      metrics: [
        { k: { es: "interfaz", en: "interface" }, v: "REST API" },
        { k: { es: "runtime", en: "runtime" }, v: "Docker" },
        { k: { es: "patrón", en: "pattern" }, v: "Modular" },
      ],
    },
    {
      slug: "task-laravel",
      n: "003",
      name: { es: "Task Manager Laravel", en: "Laravel Task Manager" },
      kicker: { es: "Full stack · Laravel", en: "Full stack · Laravel" },
      summary: {
        es: "API REST full stack con Laravel + PostgreSQL. CRUD de tareas, autenticación JWT (Sanctum), arquitectura hexagonal (controllers → services → repositories → models), CI/CD con GitHub Actions y cobertura PHPUnit.",
        en: "Full stack REST API with Laravel + PostgreSQL. Task CRUD, JWT auth (Sanctum), hexagonal architecture (controllers → services → repositories → models), CI/CD with GitHub Actions and PHPUnit coverage.",
      },
      role: { es: "Full stack solo", en: "Solo full stack" },
      year: "2023",
      github: "https://github.com/AlejandroVegaFullstackDev/taskManager",
      stack: ["Laravel", "PHP", "PostgreSQL", "Docker", "PHPUnit"],
      metrics: [
        { k: { es: "auth", en: "auth" }, v: "Sanctum" },
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
        es: "Microservicio para sistema de bloqueo automático de e-bikes en Roda. Clean Architecture en Python: domain, use cases, interfaces API y capa de infraestructura. Simulación GPS, triggers, hashing de contraseñas y Docker.",
        en: "Microservice for e-bike automatic locking system at Roda. Clean Architecture in Python: domain, use cases, API interfaces and infrastructure layer. GPS simulation, triggers, password hashing and Docker.",
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
        es: "API NestJS modular que registra envíos, calcula la tarifa automáticamente según la distancia y expone el historial completo. 100% libre de datos sensibles, listo para producción con Docker.",
        en: "Modular NestJS API that registers shipments, automatically calculates tariffs based on distance and exposes the full history. 100% free of sensitive data, production-ready with Docker.",
      },
      arch: ["Client", "NestJS API", "Services", "Models", "Docker"],
      code: `<span class="c">// shipments.service.ts — tariff calculation</span>\n<span class="k">async</span> createShipment(dto: CreateShipmentDto) {\n  <span class="k">const</span> tariff = <span class="k">this</span>.calculateTariff(dto.distance);\n  <span class="k">return</span> <span class="k">this</span>.shipmentsRepo.save({\n    ...dto,\n    tariff,\n    createdAt: <span class="k">new</span> Date(),\n  });\n}\n\ncalculateTariff(distance: <span class="k">number</span>): <span class="k">number</span> {\n  <span class="k">return</span> distance * RATE_PER_KM;\n}`,
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
        es: "API REST con arquitectura hexagonal (controllers → services → repositories → models), autenticación JWT via Sanctum con expiración configurable, tests unitarios e integración con PHPUnit, y pipeline CI/CD en GitHub Actions.",
        en: "REST API with hexagonal architecture (controllers → services → repositories → models), JWT auth via Sanctum with configurable expiration, unit and integration tests with PHPUnit, and CI/CD pipeline in GitHub Actions.",
      },
      arch: ["Client", "Laravel API", "Sanctum JWT", "Repositories", "PostgreSQL"],
      code: `<span class="c">// app/Models/Task.php</span>\n<span class="k">class</span> Task <span class="k">extends</span> Model {\n    <span class="k">protected</span> $casts = [\n        <span class="s">'due_at'</span>      =&gt; <span class="s">'datetime'</span>,\n        <span class="s">'completed_at'</span> =&gt; <span class="s">'datetime'</span>,\n    ];\n\n    <span class="k">public function</span> isOverdue(): bool {\n        <span class="k">return</span> $this-&gt;due_at\n            &amp;&amp; $this-&gt;due_at-&gt;isPast()\n            &amp;&amp; !$this-&gt;completed_at;\n    }\n}`,
      timeline: {
        es: [["Día 01","Setup Laravel + PostgreSQL + Docker"],["Día 03","Arquitectura hexagonal + repositorios"],["Día 06","Auth JWT con Sanctum"],["Día 09","Tests PHPUnit unitarios e integración"],["Día 12","CI/CD GitHub Actions + README"]],
        en: [["Day 01","Laravel + PostgreSQL + Docker setup"],["Day 03","Hexagonal architecture + repositories"],["Day 06","JWT auth with Sanctum"],["Day 09","PHPUnit unit and integration tests"],["Day 12","CI/CD GitHub Actions + README"]],
      },
      learnings: {
        es: [["Hexagonal en Laravel","Separar repositorios de modelos Eloquent hace los tests mucho más limpios."],["Sanctum vs Passport","Para APIs stateless, Sanctum tokens es suficiente y más simple."],["CI desde el inicio","Agregar GitHub Actions el día 1 evita la deuda técnica de tests tardíos."]],
        en: [["Hexagonal in Laravel","Separating repositories from Eloquent models makes tests much cleaner."],["Sanctum vs Passport","For stateless APIs, Sanctum tokens is enough and simpler."],["CI from day one","Adding GitHub Actions on day 1 avoids the tech debt of late testing."]],
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
  },
} as const;

export type Lang = "es" | "en";
export type Project = typeof portfolioData.projects[number];
