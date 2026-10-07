// Detalle extendido por proyecto (página /proyecto/[slug]), indexado por slug.

export const caseStudies = {
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
      es: "Construí el módulo central de la plataforma administrativa: API en Python (Flask / FastAPI) con casos de uso separados de los controladores, interfaz en React para el equipo de operación y PostgreSQL como fuente de verdad, todo desplegado en GCP.",
      en: "I built the platform's central module: a Python (Flask / FastAPI) API with use cases separated from controllers, a React interface for the operations team and PostgreSQL as the source of truth, all deployed on GCP.",
    },
    arch: ["React", "API Python", "Casos de uso", "PostgreSQL", "GCP"],
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
    arch: ["React", "API Python", "Casos de uso", "PostgreSQL", "Equipos de campo"],
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
} as const;
