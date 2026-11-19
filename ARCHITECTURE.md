# Arquitectura

Astro 7 + Tailwind + GSAP, desplegado en Vercel desde `main`.
Regla de oro: **un archivo, una responsabilidad, menos de ~300 líneas.**

## Cómo está ordenado

| Carpeta | Qué va ahí |
|---|---|
| `src/pages/` | Rutas. Solo arman la página con componentes; `api/` son las funciones de servidor. |
| `src/components/` | Markup (`.astro`). Si un componente necesita JS propio, va **al lado** como `<nombre>.client.ts`. |
| `src/features/` | Lo que no es de un solo componente: el arranque del home, la consola de juegos y el blog. |
| `src/lib/` | Lógica sin markup: servidor, utilidades de build y lógica pura que comparten cliente y servidor. |
| `src/data/` | Contenido del portafolio en TypeScript (una sola fuente para la web y los tests). |
| `src/styles/` | Solo lo global de verdad: tokens, base y primitives. |

Sufijo `.client.ts` = corre en el navegador. Todo lo de `lib/` (salvo `lib/client/`) puede correr en el servidor.

## Mapa

```
src/
├─ pages/
│  ├─ index.astro                 Home: orden de las secciones; carga features/home/init.client.ts.
│  ├─ about.astro                 "Sobre mí" (página propia, solo español).
│  ├─ blog/index.astro            Lista de posts; carga features/blog/index.client.ts.
│  ├─ blog/[slug].astro           Un post; carga features/blog/post.client.ts.
│  ├─ proyecto/[slug].astro       Caso de proyecto (data/case-studies.ts).
│  └─ api/
│     ├─ now-playing.ts           Canción actual de Spotify. La pide components/layout/now-band.client.ts.
│     ├─ playlist-snake.ts        Canciones + previews para la consola. La pide features/arcade/snake/controller.ts.
│     ├─ preview.ts               Preview suelta (respaldo). La pide features/arcade/shared/preview-player.ts.
│     └─ leaderboard.ts           Ranking global (GET top, POST start/submit). La pide features/arcade/snake/ranking-client.ts.
├─ layouts/Layout.astro           <html>, fuentes, meta/OG, styles/global.css y el script inline de tema/idioma.
├─ components/
│  ├─ layout/                     Header, MobileMenu (+ mobile-menu.client.ts), BootScreen (+ boot.client.ts),
│  │                              NowBand (+ now-band.client.ts), SubpageBar (barra de /proyecto).
│  ├─ sections/                   Una por sección del home: Hero, About, Stack, Projects, Blog, Experience,
│  │                              PlaylistSnake (la consola), Contact. Hero, Experience y Contact tienen su .client.ts.
│  ├─ ui/                         SectionHeading; Coverflow (+ coverflow.client.ts + coverflow.css, lo usan Projects y Blog);
│  │                              PaperStack (+ paper-stack.client.ts, solo Blog); SecretTerminal (+ secret-terminal.client.ts).
│  ├─ arcade/                     BlocksBoard y DoomBoard: markup de las pestañas de la consola (los usa PlaylistSnake).
│  ├─ blog/                       PostHeader, PostSidebar (un post) y PostList (/blog).
│  ├─ project/CaseStudy.astro     Cuerpo del caso de proyecto.
│  ├─ SpotifyNow.astro            Widget flotante "sonando" (+ spotify-now.client.ts). Solo en el home.
│  └─ TweaksPanel.tsx             Panel de tema/acento/fuente/animación (React, client:only). Home y /proyecto.
├─ features/
│  ├─ home/
│  │  ├─ init.client.ts           Orquestador del home: qué se inicia y en qué orden. Empieza a leer por aquí.
│  │  ├─ effects/                 Efectos por atributo data-* (tabla abajo). Los llama init.client.ts;
│  │  │                           gyro y crt también los usan Hero, Contact, PaperStack y Coverflow.
│  │  └─ effects.css              Estilos de lo que crean esos efectos (global).
│  ├─ arcade/                     Consola "Cómete mi playlist" (sección PlaylistSnake).
│  │  ├─ tabs.ts                  Pestañas Snake · Bloques · Doom; arma cada juego al abrirlo.
│  │  ├─ snake/                   controller (orquesta), render (canvas), input, effects, ui, score-form,
│  │  │                           ranking-client (habla con /api/leaderboard), devil-sprite (dibujo de la serpiente).
│  │  ├─ blocks/controller.ts     Juego de bloques (motor en lib/arcade/blocks).
│  │  ├─ doom/controller.ts       Doom en WebAssembly (public/games/, lo copia tools/copy-doom.mjs).
│  │  ├─ shared/                  Lo que comparten los tres juegos: contracts.ts (ArcadeShared, GameHandle),
│  │  │                           preview-player (audio), vinyl-deck (tocadiscos), game-focus (modo juego).
│  │  └─ arcade.css               Estilos de toda la consola. Lo importa PlaylistSnake.astro.
│  └─ blog/                       index.client.ts (/blog), post.client.ts (un post), prose.css (Markdown, global).
├─ lib/
│  ├─ client/                     Solo navegador, lo usan casi todos los .client.ts:
│  │  ├─ language.ts              Idioma: getLang, botón ES/EN, tr('es', 'en').
│  │  └─ motion.ts                Política de movimiento: off/lite/full, canAnimate(), canAffordHeavy().
│  ├─ arcade/                     Lógica pura de los juegos (sin DOM). La usan el cliente, el servidor y los tests:
│  │  ├─ snake/engine.ts          Motor del Snake y la constante BOARD (lado del tablero).
│  │  ├─ snake/replay.ts          Repite una partida para validar el puntaje (lib/leaderboard/service.ts).
│  │  ├─ blocks/engine.ts         Motor del juego de bloques.
│  │  ├─ random.ts                PRNG determinista (mulberry32): misma semilla en cliente y servidor.
│  │  └─ track.ts                 El tipo Track: la canción, de /api/playlist-snake a la consola.
│  ├─ leaderboard/                Ranking seguro: crypto (tokens), redis (Upstash/TCP), names (filtro), service.
│  ├─ http.ts                     json(): la respuesta de todas las rutas /api.
│  ├─ spotify.ts                  Token y GET de Spotify (now-playing, playlist-snake).
│  ├─ deezer.ts                   Busca previews de 30 s (playlist-snake, preview).
│  ├─ blog.ts                     getSortedPosts() + re-export de text.ts (home, /blog, SecretTerminal).
│  ├─ text.ts                     Fechas, tiempo de lectura e índice de un post.
│  └─ ticker.ts                   Frases del ticker del header, a partir de data/.
├─ data/
│  ├─ index.ts                    Junta todo en `portfolioData` y exporta el tipo Project.
│  ├─ profile.ts, stack.ts, experience.ts, case-studies.ts
│  └─ projects/                   index.ts (orden final) ← featured.ts, production.ts, open-source.ts.
├─ content/blog/*.md              Posts (colección definida en content/config.ts, re-exportada por content.config.ts).
├─ styles/
│  ├─ global.css                  Entrada (la importa Layout.astro). También importa effects.css, coverflow.css
│  │                              y prose.css desde su carpeta, para que queden antes de las utilidades de Tailwind.
│  ├─ tokens.css                  Colores, fuentes y variantes del panel de tweaks.
│  ├─ base.css                    Documento, idioma (.lang-es / .lang-en), fondos.
│  └─ primitives.css              Piezas que usan varias secciones: botones, etiquetas, terminal, enlaces.
└─ env.d.ts                       Tipos de las variables de entorno.
tests/                            Vitest: data, text, deezer, snake, blocks, leaderboard (+ service, tcp) y
                                  home.smoke (empaqueta features/home/init.client.ts y lo corre sobre dist/ en jsdom).
tools/                            copy-doom.mjs (predev/prebuild), spotify-token.mjs, og-image.py (public/og.png).
vercel.json                       Cabeceras: CSP (con hashes de los scripts inline de Layout y BootScreen), caché.
```

## Dónde cambio…

| Quiero…                              | Archivo                                   |
|--------------------------------------|-------------------------------------------|
| Un texto, cifra, proyecto o empleo   | `src/data/*.ts` (proyectos: `src/data/projects/`) |
| El CV en PDF                         | `public/alejandro-vega-cv-{es,en}.pdf` (se generan con cv-por-posicion en ai-job-search) |
| Un post                              | `src/content/blog/*.md`                   |
| El orden de las secciones del home   | `src/pages/index.astro`                   |
| El diseño de una sección             | `src/components/sections/<Sección>.astro` (su CSS va dentro) |
| La animación de una sección          | `src/components/sections/<sección>.client.ts` |
| Colores, fuentes                     | `src/styles/tokens.css`                   |
| Cuándo arranca un efecto             | `src/features/home/init.client.ts`        |
| Reglas del Snake o de Bloques        | `src/lib/arcade/` (y sus tests)           |
| La consola de juegos (UI)            | `src/features/arcade/`                    |

## Efectos (`features/home/effects/`)

| Archivo            | Qué hace                                                                 | Se activa con          |
|--------------------|--------------------------------------------------------------------------|------------------------|
| `typewriter.ts`    | Titulares que se tipean con cursor.                                      | `[data-type]`          |
| `scramble.ts`      | Etiquetas `// 0N _ X` que se descifran.                                  | `[data-scramble]`      |
| `wipe.ts`          | Revelado diagonal de sección + cascada de ítems.                         | `[data-wipe]`, `[data-stagger-item]` |
| `crt.ts`           | Imagen que se enciende como monitor viejo.                               | `[data-crt]`           |
| `gyro.ts`          | Giroscopio compartido (pide permiso en iOS).                             | `[data-gyro-btn]`      |
| `lens.ts`          | Cursor lente + botones magnéticos (solo mouse).                          | `[data-lens]`, `[data-magnetic]` |
| `chrome.ts`        | Ticker, barra de progreso, halo del cursor.                              | `[data-marquee]`       |

El carrusel (`components/ui/coverflow.client.ts`, `[data-coverflow]`) y la terminal secreta
(`components/ui/secret-terminal.client.ts`, escribir `sudo` o 5 toques al logo) viven con su componente.

Todos respetan `prefers-reduced-motion` y el panel de tweaks vía `lib/client/motion.ts`:
`canAnimate()` (algo de movimiento) y `canAffordHeavy()` (blur, giroscopio, skew).

## Recetas

**Agregar una sección:** crea `components/sections/Nueva.astro` (markup + `<style>`) y ponla en
`pages/index.astro`. Si necesita JS, crea al lado `nueva.client.ts` con un `initNueva()` y llámalo
en `features/home/init.client.ts` respetando el orden de la página.

**Reusar un efecto:** casi siempre basta con el atributo `data-*` de la tabla.

**Agregar un efecto:** `features/home/effects/nuevo.ts` que exporte `initNuevo()`, consulte
`lib/client/motion.ts` antes de animar y se llame desde `init.client.ts`. Sus estilos van en
`features/home/effects.css`.

**Agregar un juego a la consola:** markup en `components/arcade/`, controlador en
`features/arcade/<juego>/controller.ts` que reciba `ArcadeShared` y devuelva un `GameHandle`
(`shared/contracts.ts`), y su entrada en `tabs.ts`. La lógica pura va en `lib/arcade/<juego>/`.

**ScrollTrigger y secciones pinneadas:** crea los triggers en el orden de la página;
`init.client.ts` llama a `ScrollTrigger.sort()` al final para recalcular posiciones.

## Estilos: ¿`<style>` en el componente o global?

- **En el componente** (scoped, por defecto): lo que solo usa ese componente o página.
- **Global, en `src/styles/`**: tokens, base y `primitives.css` (piezas que comparten varias secciones).
- **Global, pero junto a su feature**: `features/home/effects.css` (HTML que crea el JS),
  `components/ui/coverflow.css` y `features/blog/prose.css` (HTML del Markdown, que no recibe el scope).
  Se importan desde `styles/global.css` para que queden antes de las utilidades de Tailwind.
- La consola importa `features/arcade/arcade.css` desde `PlaylistSnake.astro`.
- Si un `<style>` scoped no aplica a algo que inyecta JS o Markdown, es porque ese HTML no lleva
  el atributo de scope: usa `:global()` o una de las hojas globales de arriba.

## CSP

`vercel.json` lista los hashes SHA-256 de los únicos scripts inline (`Layout.astro` y `BootScreen.astro`).
Si cambias su contenido, recalcula los hashes desde el HTML generado en `dist/client/`.
