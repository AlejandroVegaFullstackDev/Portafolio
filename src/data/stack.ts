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

// Stack por nivel de uso: es lo primero que escanea un reclutador.
export const stackTiers = [
  {
    key: 'daily',
    label: { es: 'Uso a diario', en: 'Daily' },
    items: ['TypeScript', 'Python', 'NestJS', 'React', 'PostgreSQL'],
  },
  {
    key: 'prod',
    label: { es: 'En producción', en: 'In production' },
    items: ['FastAPI', 'Flask', 'Node.js', 'Redis', 'BigQuery', 'GCP (Cloud Run)', 'Docker', 'GitHub Actions', 'Next.js', 'Astro', 'Tailwind CSS'],
  },
  {
    key: 'past',
    label: { es: 'He trabajado con', en: 'Worked with' },
    items: ['PHP', 'Laravel', 'Angular', 'MySQL', 'AWS', 'Selenium', 'Power BI'],
  },
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
