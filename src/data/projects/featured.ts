// Proyectos propios de código abierto: los tres destacados del carrusel del home.
// El orden de aparición lo arma ./index.ts.

export const featured = [
  {
    slug: "support-triage",
    n: "001",
    name: { es: "Support Triage", en: "Support Triage" },
    kicker: { es: "Microservicios + LLMs · Open source", en: "Microservices + LLMs · Open source" },
    plain: {
      es: "Un sistema de soporte que lee cada ticket, lo clasifica y sugiere una respuesta con IA. Si la IA falla, sigue funcionando con un clasificador propio.",
      en: "A support system that reads each ticket, classifies it and suggests a reply with AI. If the AI fails, it keeps working with its own classifier.",
    },
    summary: {
      es: "Sistema de soporte orientado a eventos: una API en NestJS guarda los tickets en PostgreSQL y los publica en RabbitMQ; un agente en FastAPI los clasifica (categoría, prioridad y respuesta sugerida) con Claude u OpenAI usando salida estructurada, y cae a un clasificador local si el LLM falla. Panel en React, colas de dead-letter, CI con una prueba del stack completo en Docker Compose y decisiones documentadas en ADRs.",
      en: "Event-driven support system: a NestJS API stores tickets in PostgreSQL and publishes them to RabbitMQ; a FastAPI agent classifies them (category, priority and suggested reply) with Claude or OpenAI using structured output, falling back to a local classifier when the LLM fails. React panel, dead-letter queues, CI with a full-stack run in Docker Compose, and decisions documented as ADRs.",
    },
    role: { es: "Autor", en: "Author" },
    year: "2026",
    company: "Open source",
    github: "https://github.com/AlejandroVegaFullstackDev/support-triage",
    stack: ["NestJS", "FastAPI", "RabbitMQ", "React", "PostgreSQL", "Claude API", "Docker"],
    metrics: [
      { k: { es: "servicios", en: "services" }, v: "3" },
      { k: { es: "proveedor LLM", en: "LLM provider" }, v: "Claude | OpenAI | local" },
      { k: { es: "CI", en: "CI" }, v: "GitHub Actions" },
    ],
  },
  {
    slug: "meet-agent",
    n: "002",
    name: { es: "Meet Agent", en: "Meet Agent" },
    kicker: { es: "Escritorio + IA · C# / .NET · Open source", en: "Desktop + AI · C# / .NET · Open source" },
    plain: {
      es: "Notas de tus reuniones que se quedan en tu equipo. Graba o transcribe solo si los participantes dicen que sí, y tu propia IA arma el acta.",
      en: "Notes from your meetings that stay on your computer. It records or transcribes only if participants say yes, and your own AI writes the minutes.",
    },
    summary: {
      es: "App de escritorio en C# / .NET con Avalonia para Windows y Linux: captura el micrófono y el audio del sistema, con consentimiento explícito de los participantes antes de guardar nada. Empezó transcribiendo en local con Whisper; hoy también lee los subtítulos de Google Meet con una extensión del navegador, guarda todo en SQLite y deja que la IA del usuario (Claude, Codex u otra) haga resúmenes y responda preguntas por MCP. Arquitectura hexagonal y decisiones documentadas en ADRs.",
      en: "Desktop app in C# / .NET with Avalonia for Windows and Linux: it captures the microphone and system audio, with explicit consent from participants before anything is saved. It started out transcribing locally with Whisper; it now also reads Google Meet captions through a browser extension, stores everything in SQLite and lets the user's own AI (Claude, Codex or another) summarize and answer questions over MCP. Hexagonal architecture and decisions documented as ADRs.",
    },
    role: { es: "Autor", en: "Author" },
    year: "2026",
    company: "Open source",
    github: "https://github.com/AlejandroVegaFullstackDev/meet-agent",
    stack: ["C#", ".NET", "Avalonia", "Whisper", "SQLite", "MCP"],
    metrics: [
      { k: { es: "plataformas", en: "platforms" }, v: "Windows · Linux" },
      { k: { es: "privacidad", en: "privacy" }, v: { es: "Consentimiento", en: "Consent" } },
      { k: { es: "IA", en: "AI" }, v: "MCP" },
    ],
  },
  {
    slug: "ai-skill-coach",
    n: "003",
    name: { es: "AI Skill Coach", en: "AI Skill Coach" },
    kicker: { es: "Tutor con agentes de IA · Open source", en: "AI-agent tutor · Open source" },
    plain: {
      es: "Un tutor que vive en un repositorio y recuerda lo que ya sabes: mide tu nivel con evidencia y no te vuelve a enseñar lo que dominas. Sirve para cualquier habilidad; yo lo uso para inglés y guitarra.",
      en: "A tutor that lives in a repository and remembers what you already know: it measures your level with evidence and doesn't teach you again what you've mastered. It works for any skill; I use it for English and guitar.",
    },
    summary: {
      es: "Marco de trabajo para aprender cualquier habilidad con un agente de código como Claude Code. Comandos que hacen un paso cada uno (perfil, test de nivel, plan, sesión, repaso) y un archivo de progreso que persiste entre sesiones. El material sale de tus PDFs y de la web, con la fuente citada: un ejercicio sin fuente no se acepta. También funciona sin terminal, desde ChatGPT, Claude o Gemini. Licencia MIT; en el blog cuento por qué lo construí.",
      en: "A framework for learning any skill with a coding agent such as Claude Code. Commands that each do one step (profile, level test, plan, session, review) and a progress file that persists between sessions. Material comes from your PDFs and the web, with the source cited: an exercise without a source is rejected. It also works without a terminal, from ChatGPT, Claude or Gemini. MIT licensed; on the blog I explain why I built it.",
    },
    role: { es: "Autor", en: "Author" },
    year: "2026",
    company: "Open source",
    github: "https://github.com/AlejandroVegaFullstackDev/ai-skill-coach",
    post: "/blog/por-que-construi-mi-propio-tutor",
    stack: ["Claude Code", "Agentes de IA", "Markdown", "MIT"],
    metrics: [
      { k: { es: "memoria", en: "memory" }, v: "progreso.md" },
      { k: { es: "material", en: "material" }, v: { es: "Con fuente", en: "Sourced" } },
      { k: { es: "funciona en", en: "runs in" }, v: { es: "Terminal o chat", en: "Terminal or chat" } },
    ],
  },
] as const;
