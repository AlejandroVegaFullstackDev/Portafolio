# 4ledmt.dev — Portafolio de Alejandro Vega

[![CI](https://github.com/AlejandroVegaFullstackDev/Portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AlejandroVegaFullstackDev/Portafolio/actions/workflows/ci.yml)

Portafolio y blog de **Alejandro Vega**, Full Stack Developer en Bogotá.
En producción: **[4ledmt.dev](https://4ledmt.dev)**.

**Stack:** Astro 7 · TypeScript · Tailwind · GSAP · Vercel. Contenido en Markdown y TypeScript, sin CMS.

## Qué hay adentro

- **Home cinemático, pero escaneable.** Proyectos y Blog son carruseles horizontales pinneados y cortos (GSAP ScrollTrigger + `containerAnimation`). Todo lo demás es contenido estático que se lee aunque no cargue el JavaScript.
- **Renderizado en servidor.** Experiencia, proyectos, stack y posts salen en el HTML, en español e inglés, y el cambio de idioma es solo CSS: es mejor para SEO y no parpadea. Por JS solo llega lo que está vivo: la canción de Spotify, la playlist y el ranking de la consola de juegos.
- **CV en PDF** (`/alejandro-vega-cv-{es,en}.pdf`, en `public/`): es el CV base de backend que genera la skill `cv-por-posicion` del repo ai-job-search, con foto, en su versión pública: con correo (el mismo del sitio) y sin teléfono. Para actualizarlo se regenera allá y se copia aquí.
- **Movimiento responsable.** `src/lib/client/motion.ts` decide entre `off`, `lite` o `full` según `prefers-reduced-motion`, el panel de ajustes y los FPS medidos al cargar (modo ahorro automático).
- **Rendimiento.** Fuentes self-hosted (`@fontsource-variable`), imágenes con `astro:assets` (WebP y `srcset`), y las fuentes alternativas del panel solo se descargan si se eligen.

## Decisiones

| Decisión | Por qué |
|---|---|
| Un componente por sección, con su CSS scoped | Alta cohesión: si borras la sección, sus estilos se van con ella. Lo compartido vive en `src/styles/`. |
| Contenido en `src/data/*.ts` | Una sola fuente de verdad para la web y el CV, tipada y con tests. |
| Un efecto por archivo en `src/features/home/effects/` | SRP: cada efecto se activa con un atributo `data-*` y consulta la misma política de movimiento. |
| El JS de un componente vive a su lado (`<nombre>.client.ts`) | Se encuentra por dónde está: componente, script y estilos juntos. |
| Lógica pura de los juegos en `src/lib/arcade/` | El servidor repite las partidas del ranking con el mismo motor que el navegador, sin depender de código de cliente. |
| Sin cifras que no se puedan sustentar | Hay un test que impide que vuelvan métricas retiradas, o un título que el CV no respalda. |

La guía de "dónde cambio qué" está en **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Desarrollo

La versión de Node.js usada en CI y Vercel es 24.

```bash
npm ci
npm run dev       # http://localhost:4321
npm run verify    # astro check + build + tests (lo mismo que corre CI)
```

| Script | Qué hace |
|---|---|
| `npm run check` | Tipos de TypeScript y Astro |
| `npm test` | Vitest: integridad de datos, CV en PDF, motores de los juegos, ranking y smoke test del home construido (desktop y móvil, con jsdom; requiere `npm run build` antes) |
| `npm run og` | Regenera `public/og.png`, la imagen al compartir el link (requiere `npm ci` y `pip install pillow fonttools brotli`) |

## CI

GitHub Actions corre tipos, build y tests en cada push y PR. Lighthouse CI audita
`/`, `/blog/` y un caso de proyecto, y solo informa: no bloquea el merge.
