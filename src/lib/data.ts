export const portfolioData = {
  identity: {
    name: "Alejandro Vega",
    handle: "@alejandrovega-stackblend",
    initials: "AV",
    location: { es: "Bogotá, Colombia", en: "Bogotá, Colombia" },
    yearsExp: 4,
    education: { es: "Formado en SENA", en: "Educated at SENA" },
    title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    tagline: {
      es: "Especialista en automatización de procesos y arquitecturas escalables. Backend, datos y APIs que aguantan tráfico real, no demos.",
      en: "Specialist in process automation and scalable architectures. Backend, data and APIs that handle real traffic, not demos.",
    },
    status: {
      es: "Disponible para incorporación inmediata",
      en: "Available for immediate hire",
    },
    projectCount: 7,
    timezone: "GMT-5",
    contact: {
      linkedin: "https://www.linkedin.com/in/alejandrovega-stackblend/",
      github: "https://github.com/AlejandroVegaFullstackDev",
      email: "alejandromatssuno18@gmail.com",
    },
  },

  about: {
    es: [
      "Soy Desarrollador Full Stack con 4 años de experiencia liderando soluciones de alto impacto en empresas como Pulzo y Kiki Latam.",
      "Me especializo en diseñar e implementar sistemas eficientes, escalables y sostenibles, con enfoque en mejora continua, automatización y calidad del código.",
      "Resuelvo problemas complejos mediante automatización y uso estratégico de datos (BigQuery) para la toma de decisiones. Autodidacta, adaptable y orientado a resultados.",
    ],
    en: [
      "Full Stack Developer with 4 years of experience leading high-impact solutions at companies like Pulzo and Kiki Latam.",
      "I specialize in designing and implementing efficient, scalable and sustainable systems, with a focus on continuous improvement, automation and code quality.",
      "I solve complex problems through automation and strategic use of data (BigQuery) for decision-making. Self-taught, adaptable and results-oriented.",
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
      name: { es: "Automatización CUFE / DIAN", en: "CUFE / DIAN automation" },
      kicker: { es: "ETL fiscal · Python", en: "Tax ETL · Python" },
      summary: {
        es: "Bot que valida códigos CUFE de facturas electrónicas contra la DIAN, exporta resultados a BigQuery y notifica anomalías.",
        en: "Bot that validates CUFE codes from electronic invoices against DIAN, exports to BigQuery and flags anomalies.",
      },
      role: { es: "Desarrollador a cargo", en: "Lead developer" },
      year: "2024",
      stack: ["Python", "Selenium", "BigQuery", "GCP", "Cron"],
      metrics: [
        { k: { es: "facturas/día", en: "invoices/day" }, v: "12k" },
        { k: { es: "ahorro mensual", en: "monthly saving" }, v: "120h" },
        { k: { es: "precisión", en: "accuracy" }, v: "99.6%" },
      ],
    },
    {
      slug: "shipping-nestjs",
      n: "002",
      name: { es: "Sistema de envíos", en: "Shipping platform" },
      kicker: { es: "API logística · NestJS", en: "Logistics API · NestJS" },
      summary: {
        es: "API multi-operador para gestionar envíos: cotización, etiquetado, tracking y reconciliación contable.",
        en: "Multi-carrier API to manage shipments: quoting, labeling, tracking and accounting reconciliation.",
      },
      role: { es: "Tech lead backend", en: "Backend tech lead" },
      year: "2024",
      stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Docker"],
      metrics: [
        { k: { es: "operadores", en: "carriers" }, v: "7" },
        { k: { es: "envíos/mes", en: "shipments/mo" }, v: "45k" },
        { k: { es: "uptime", en: "uptime" }, v: "99.9%" },
      ],
    },
    {
      slug: "task-laravel",
      n: "003",
      name: { es: "Gestor de tareas Laravel", en: "Laravel task manager" },
      kicker: { es: "App interna · Laravel", en: "Internal app · Laravel" },
      summary: {
        es: "Plataforma de gestión interna con roles, vencimientos, comentarios, adjuntos y reporting por equipo.",
        en: "Internal management platform with roles, deadlines, comments, attachments and per-team reporting.",
      },
      role: { es: "Full stack solo", en: "Solo full stack" },
      year: "2023",
      stack: ["Laravel", "PHP", "MySQL", "Livewire"],
      metrics: [
        { k: { es: "usuarios", en: "users" }, v: "180" },
        { k: { es: "equipos", en: "teams" }, v: "12" },
      ],
    },
    {
      slug: "ga4-bigquery",
      n: "004",
      name: { es: "Reportería GA4 + BigQuery", en: "GA4 + BigQuery reporting" },
      kicker: { es: "Pipeline de datos", en: "Data pipeline" },
      summary: {
        es: "Modelo dimensional sobre datos crudos de GA4 en BigQuery. Dashboards ejecutivos en menos de 3 segundos.",
        en: "Dimensional model on raw GA4 data in BigQuery. Exec dashboards in under 3 seconds.",
      },
      role: { es: "Data engineer", en: "Data engineer" },
      year: "2023",
      stack: ["BigQuery", "SQL", "GA4", "Looker Studio"],
      metrics: [
        { k: { es: "eventos/día", en: "events/day" }, v: "8M" },
        { k: { es: "p95 query", en: "p95 query" }, v: "2.1s" },
      ],
    },
  ],

  deep: {
    "cufe-dian": {
      challenge: {
        es: "El equipo financiero validaba manualmente miles de CUFE contra el portal DIAN cada semana. Errores humanos, retrasos y pérdida de plata. Imposible escalar.",
        en: "The finance team manually validated thousands of CUFE codes against the DIAN portal each week. Human errors, delays and lost money. Impossible to scale.",
      },
      solution: {
        es: "Construí un bot en Python que orquesta validaciones, escribe a BigQuery, dispara alertas en Slack para anomalías y genera reportes diarios. Cron + retries + idempotencia.",
        en: "Built a Python bot that orchestrates validations, writes to BigQuery, fires Slack alerts on anomalies and generates daily reports. Cron + retries + idempotency.",
      },
      arch: ["Invoice CSV", "Python ETL", "DIAN API", "BigQuery", "Looker Studio"],
      code: `<span class="c"># validate_cufe.py — core loop</span>\n<span class="k">def</span> validate_batch(cufes):\n    results = []\n    <span class="k">for</span> cufe <span class="k">in</span> cufes:\n        ok, payload = dian.check(cufe, retries=<span class="s">3</span>)\n        results.append({\n            <span class="s">"cufe"</span>: cufe,\n            <span class="s">"valid"</span>: ok,\n            <span class="s">"checked_at"</span>: now(),\n            <span class="s">"raw"</span>: payload,\n        })\n    bq.write(<span class="s">"finance.cufe_audit"</span>, results)\n    <span class="k">return</span> results`,
      timeline: {
        es: [["Día 01","Auditoría del proceso manual + métricas base"],["Día 03","Reverse-engineer del flujo DIAN, autenticación SSL"],["Día 07","MVP que valida 100 facturas/min"],["Día 14","BigQuery + dashboards + alertas"],["Día 21","Hand-off, runbook y on-call"]],
        en: [["Day 01","Audit manual process + baseline metrics"],["Day 03","Reverse-engineer DIAN flow, SSL auth"],["Day 07","MVP validating 100 invoices/min"],["Day 14","BigQuery + dashboards + alerts"],["Day 21","Hand-off, runbook and on-call"]],
      },
      learnings: {
        es: [["Idempotencia","Validar dos veces no debe contar dos veces."],["Backoff","Las APIs públicas se caen. Reintenta con cabeza."],["Observabilidad","Si no lo mides, no existe. Logs > intuición."]],
        en: [["Idempotency","Validating twice shouldn't count twice."],["Backoff","Public APIs go down. Retry with discipline."],["Observability","If you don't measure, it doesn't exist. Logs > guts."]],
      },
    },
    "shipping-nestjs": {
      challenge: {
        es: "Cada operador logístico con su propia API, formato y reglas. El backoffice perdía horas conciliando. La empresa quería sumar 5 operadores más sin contratar a 3 personas.",
        en: "Each logistics carrier with its own API, format and rules. The backoffice lost hours reconciling. The company wanted to add 5 more carriers without hiring 3 more people.",
      },
      solution: {
        es: "Diseñé una API NestJS que abstrae a los operadores tras un contrato común: cotización, etiquetado, tracking y conciliación. Un adaptador por operador, colas para retries, eventos para webhooks.",
        en: "Designed a NestJS API that abstracts carriers behind a common contract: quoting, labeling, tracking and reconciliation. One adapter per carrier, queues for retries, events for webhooks.",
      },
      arch: ["Client", "NestJS API", "Adapter", "Carrier APIs", "PostgreSQL"],
      code: `<span class="c">// adapters/registry.ts — multi-carrier abstraction</span>\n<span class="k">export interface</span> CarrierAdapter {\n  quote(p: Parcel): Promise&lt;Quote[]&gt;;\n  label(s: Shipment): Promise&lt;Label&gt;;\n  track(id: <span class="k">string</span>): Promise&lt;TrackEvent[]&gt;;\n}\n\n<span class="k">export const</span> carriers: Record&lt;<span class="k">string</span>, CarrierAdapter&gt; = {\n  servientrega: <span class="k">new</span> ServientregaAdapter(),\n  envia:        <span class="k">new</span> EnviaAdapter(),\n  coordinadora: <span class="k">new</span> CoordinadoraAdapter(),\n};`,
      timeline: {
        es: [["Sem 01","Discovery con ops, mapeo de cada operador"],["Sem 02","Contrato único + arquitectura de adapters"],["Sem 04","Primer operador en prod, shadow traffic"],["Sem 06","Sistema de reintentos + queues"],["Sem 10","7 operadores activos, dashboards live"]],
        en: [["Wk 01","Discovery with ops, map each carrier"],["Wk 02","Unified contract + adapter architecture"],["Wk 04","First carrier in prod, shadow traffic"],["Wk 06","Retry system + queues"],["Wk 10","7 carriers live, dashboards online"]],
      },
      learnings: {
        es: [["Contratos","Define la interfaz antes que la implementación."],["Shadow traffic","Confirma comportamiento sin riesgo."],["Adapters","El patrón aburrido suele ser el correcto."]],
        en: [["Contracts","Define the interface before the implementation."],["Shadow traffic","Confirm behavior without risk."],["Adapters","The boring pattern is usually the right one."]],
      },
    },
    "task-laravel": {
      challenge: {
        es: "12 equipos coordinando vía Excel y WhatsApp. Tareas perdidas, duplicadas, sin SLA. Necesitaban algo simple pero serio.",
        en: "12 teams coordinating via Excel and WhatsApp. Lost tasks, duplicates, no SLA. They needed something simple but serious.",
      },
      solution: {
        es: "App Laravel + Livewire con roles, asignaciones, vencimientos y reporting. Foco en UX: pocos clicks, mucho atajo de teclado.",
        en: "Laravel + Livewire app with roles, assignments, deadlines and reporting. Focus on UX: few clicks, many keyboard shortcuts.",
      },
      arch: ["Browser", "Livewire", "Laravel", "MySQL", "Reports"],
      code: `<span class="c">// app/Models/Task.php</span>\n<span class="k">class</span> Task <span class="k">extends</span> Model {\n    <span class="k">protected</span> $casts = [\n        <span class="s">'due_at'</span>      =&gt; <span class="s">'datetime'</span>,\n        <span class="s">'completed_at'</span> =&gt; <span class="s">'datetime'</span>,\n    ];\n\n    <span class="k">public function</span> isOverdue(): bool {\n        <span class="k">return</span> $this-&gt;due_at &amp;&amp;\n               $this-&gt;due_at-&gt;isPast() &amp;&amp;\n               !$this-&gt;completed_at;\n    }\n}`,
      timeline: {
        es: [["Sem 01","Entrevistas con líderes de equipo"],["Sem 02","Wireframes + flujos clave"],["Sem 04","MVP con 3 equipos beta"],["Sem 06","Roles, permisos y reportes"],["Sem 08","Roll-out a 12 equipos"]],
        en: [["Wk 01","Team-lead interviews"],["Wk 02","Wireframes + key flows"],["Wk 04","MVP with 3 beta teams"],["Wk 06","Roles, permissions and reports"],["Wk 08","Roll-out to 12 teams"]],
      },
      learnings: {
        es: [["Atajos","Los power-users te aman si pones atajos."],["Onboarding","Vacío vs poblado: poblado siempre gana."],["Reports","Excel-export salva la migración."]],
        en: [["Shortcuts","Power-users love you if you ship shortcuts."],["Onboarding","Empty vs seeded: seeded always wins."],["Reports","Excel-export saves the migration."]],
      },
    },
    "ga4-bigquery": {
      challenge: {
        es: "Los datos crudos de GA4 en BigQuery son un mar caótico. Las consultas eran lentas, los reportes ejecutivos llegaban tarde y caros.",
        en: "Raw GA4 data in BigQuery is chaotic. Queries were slow, exec reports arrived late and expensive.",
      },
      solution: {
        es: "Modelo dimensional con tablas pre-agregadas, particiones por fecha y clustering por dimensiones críticas. Looker Studio dashboards con < 3s.",
        en: "Dimensional model with pre-aggregated tables, date partitioning and clustering on critical dimensions. Looker Studio dashboards under 3s.",
      },
      arch: ["GA4 raw", "Scheduled SQL", "Mart tables", "Looker Studio", "Slack"],
      code: `<span class="c">-- mart_sessions.sql — daily roll-up</span>\n<span class="k">CREATE OR REPLACE TABLE</span> mart.sessions\n<span class="k">PARTITION BY</span> date\n<span class="k">CLUSTER BY</span> source, medium <span class="k">AS</span>\n<span class="k">SELECT</span>\n  <span class="k">DATE</span>(event_timestamp) <span class="k">AS</span> date,\n  user_pseudo_id <span class="k">AS</span> user_id,\n  <span class="k">MIN</span>(traffic_source.source)  <span class="k">AS</span> source,\n  <span class="k">MIN</span>(traffic_source.medium)  <span class="k">AS</span> medium,\n  <span class="k">COUNT</span>(*) <span class="k">AS</span> events\n<span class="k">FROM</span> \`raw.events_*\`\n<span class="k">GROUP BY</span> date, user_id;`,
      timeline: {
        es: [["Sem 01","Auditoría del esquema crudo + perfilado"],["Sem 02","Modelo dimensional + naming"],["Sem 04","Mart con particiones + clustering"],["Sem 06","Looker Studio con drilldowns"],["Sem 08","Alertas en Slack y SLAs"]],
        en: [["Wk 01","Raw-schema audit + profiling"],["Wk 02","Dimensional model + naming"],["Wk 04","Mart with partitions + clustering"],["Wk 06","Looker Studio with drilldowns"],["Wk 08","Slack alerts and SLAs"]],
      },
      learnings: {
        es: [["Partition + cluster","El truco más barato y más caro de no usar."],["Mart > view","Tabla materializada gana siempre en costo."],["Naming","El nombre de la tabla es el primer doc."]],
        en: [["Partition + cluster","Cheapest trick, costliest to skip."],["Mart > view","Materialized table always wins on cost."],["Naming","Table name is the first doc."]],
      },
    },
  },
} as const;

export type Lang = "es" | "en";
export type Project = typeof portfolioData.projects[number];
