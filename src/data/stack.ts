// Tecnologías por categoría y bloque de automatización/IA.

export const stack = {
  languages: ["TypeScript", "Python", "PHP", "JavaScript", "SQL"],
  frameworks: ["NestJS", "Node.js", "React", "Angular", "Next.js", "Astro", "Laravel", "Flask", "Tailwind CSS"],
  databases: ["PostgreSQL", "MySQL", "BigQuery", "Redis"],
  cloud: ["GCP (Cloud Run, BigQuery)", "AWS", "Docker", "Linux", "CI/CD", "Vercel"],
  architectures: ["Clean Architecture", "Hexagonal", "Layered", "Microservices", "REST APIs"],
  patterns: ["Factory Method", "Repository", "Dependency Injection", "DTO", "Service Layer", "SOLID"],
  testing: ["pytest", "Jest", "PHPUnit", "GitHub Actions"],
  tools: ["Git", "GitHub", "GitLab", "Power Query / Power BI", "Selenium", "Scrum", "Kanban"],
} as const;

// Stack por área (lo que escanea un reclutador). `daily` marca lo que uso a diario.
export const daily = ['TypeScript', 'Python', 'NestJS', 'React', 'PostgreSQL'] as const;

export const stackGroups = [
  { key: 'frontend', icon: 'Monitor', label: { es: 'Frontend', en: 'Frontend' }, items: ['React', 'TypeScript', 'Next.js', 'Astro', 'Vite', 'Angular', 'Tailwind CSS'] },
  { key: 'backend', icon: 'Server', label: { es: 'Backend', en: 'Backend' }, items: ['Python', 'NestJS', 'FastAPI', 'Flask', 'Node.js', 'PHP / Laravel', 'REST APIs', 'RabbitMQ'] },
  { key: 'data', icon: 'Database', label: { es: 'Datos', en: 'Data' }, items: ['PostgreSQL', 'MySQL', 'BigQuery', 'Redis', 'TypeORM', 'GA4', 'Looker Studio'] },
  { key: 'cloud', icon: 'Cloud', label: { es: 'Cloud y DevOps', en: 'Cloud & DevOps' }, items: ['GCP (Cloud Run)', 'AWS', 'Docker', 'Docker Compose', 'GitHub Actions', 'Vercel', 'Linux'] },
  { key: 'ai', icon: 'Sparkles', label: { es: 'IA', en: 'AI' }, items: ['Claude API', 'OpenAI API', 'LLM structured output', 'AI coding agents', 'LLM automations'] },
  { key: 'testing', icon: 'FlaskConical', label: { es: 'Testing y calidad', en: 'Testing & quality' }, items: ['pytest', 'Jest', 'Vitest', 'PHPUnit', 'E2E tests', 'CI'] },
] as const;

// Sección del CV que no existía en el sitio.
export const automation = {
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
} as const;
