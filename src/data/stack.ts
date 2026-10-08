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

// "Cómo uso la IA": en sus palabras. Lo pequeño se delega a agentes para dejar la
// concentración para lo grande. Nada de verbos de CV.
export const automation = {
  title: { es: "Cómo uso la IA", en: "How I use AI" },
  lede: {
    es: "Le delego a la IA lo que me quita foco, para que mi cabeza quede libre para lo que de verdad la necesita.",
    en: "I hand AI whatever steals my focus, so my head stays free for what actually needs it.",
  },
  items: [
    {
      t: { es: "Lo pequeño, a un agente", en: "Small stuff goes to an agent" },
      d: {
        es: "Investigar un bug, rastrear un error que no tiene sentido o crear las tareas de un requerimiento. Un agente lo hace mientras yo sigo en lo mío.",
        en: "Digging into a bug, tracing an error that makes no sense or creating the tasks for a requirement. An agent does it while I keep going.",
      },
    },
    {
      t: { es: "Lo grande, conmigo", en: "Big stuff stays with me" },
      d: {
        es: "Cuando llega un requerimiento o una solicitud grande necesito concentración, no que me interrumpan cosas que se pueden delegar.",
        en: "When a big requirement or request lands I need focus, not interruptions from things that could be delegated.",
      },
    },
    {
      t: { es: "Skills, agentes y RAG", en: "Skills, agents and RAG" },
      d: {
        es: "Armo skills y agentes con el contexto del negocio y experimento con RAG para que respondan con información real. Si algo me quita tiempo, intento automatizarlo.",
        en: "I build skills and agents with business context and experiment with RAG so they answer with real information. If something eats my time, I try to automate it.",
      },
    },
  ],
} as const;
