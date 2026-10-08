# 4ledmt.dev — Portafolio de Alejandro Vega

[![CI](https://github.com/AlejandroVegaFullstackDev/Portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/AlejandroVegaFullstackDev/Portafolio/actions/workflows/ci.yml)

Portafolio y blog de **Alejandro Vega**, Full Stack Developer en Bogotá.
En producción: **[4ledmt.dev](https://4ledmt.dev)**.

**Stack:** Astro 5 · TypeScript · Tailwind · GSAP · Vercel. Contenido en Markdown y TypeScript, sin CMS.

## Qué hay adentro

- **Home cinemático, pero escaneable.** El Blog es un carrusel horizontal pinneado (GSAP ScrollTrigger + `containerAnimation`); Proyectos es una grilla de tres destacados con su caso de estudio. Todo lo demás es contenido estático que se lee aunque no cargue el JavaScript.
- **Renderizado en servidor.** Experiencia, proyectos, stack y posts salen en el HTML, en español e inglés, y el cambio de idioma es solo CSS. Nada de contenido inyectado por JS: es mejor para SEO y no parpadea.
- **CV en PDF generado en el build** (`/alejandro-vega-cv-{es,en}.pdf`) desde `src/data/cv.ts`. Tiene texto real en orden de lectura, legible por ATS, y no publica correo ni teléfono.
- **Movimiento responsable.** `scripts/fx/env.ts` decide entre `off`, `lite` o `full` según `prefers-reduced-motion`, el panel de ajustes y los FPS medidos al cargar (modo ahorro automático).
- **Rendimiento.** Fuentes self-hosted (`@fontsource-variable`), imágenes con `astro:assets` (WebP y `srcset`), y las fuentes alternativas del panel solo se descargan si se eligen.

## Decisiones

| Decisión | Por qué |
|---|---|
| Un componente por sección, con su CSS scoped | Alta cohesión: si borras la sección, sus estilos se van con ella. Lo compartido vive en `src/styles/`. |
| Contenido en `src/data/*.ts` | Una sola fuente de verdad para la web y el CV, tipada y con tests. |
| Un efecto por archivo en `scripts/fx/` | SRP: cada efecto se activa con un atributo `data-*` y consulta la misma política de movimiento. |
| Sin cifras que no se puedan sustentar | Hay un test que impide que vuelvan métricas retiradas, o un título que el CV no respalda. |

La guía de "dónde cambio qué" está en **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Desarrollo

```bash
npm ci
npm run dev       # http://localhost:4321
npm run verify    # astro check + build + tests (lo mismo que corre CI)
```

| Script | Qué hace |
|---|---|
| `npm run check` | Tipos de TypeScript y Astro |
| `npm test` | Vitest: integridad de datos, CV en PDF y smoke test del home construido (desktop y móvil, con jsdom) |
| `npm run og` | Regenera `public/og.png`, la imagen al compartir el link (requiere Python + Pillow) |

## CI

GitHub Actions corre tipos, build y tests en cada push y PR. Lighthouse CI audita
`/`, `/blog/` y un caso de proyecto, y solo informa: no bloquea el merge.
