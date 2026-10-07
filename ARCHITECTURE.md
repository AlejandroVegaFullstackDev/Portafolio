# Arquitectura

Astro 5 + Tailwind + GSAP, desplegado en Vercel desde `main`.
Regla de oro: **un archivo, una responsabilidad, menos de ~300 líneas.**

```
src/
├─ pages/                 Rutas. Solo arman la página con componentes.
│  ├─ index.astro         Home (~50 líneas): orden de las secciones.
│  ├─ alejandro-vega-cv-[lang].pdf.ts   CV en PDF generado en el build.
│  ├─ about.astro, blog/, proyecto/, api/now-playing.ts
├─ layouts/Layout.astro   <html>, fuentes, meta e importa styles/global.css (una sola vez).
├─ components/
│  ├─ layout/             Header, MobileMenu, BootScreen, NowBand.
│  ├─ sections/           Una por sección del home: Hero, About, Stack, Projects, Blog, Experience, Contact.
│  ├─ ui/                 Piezas reutilizables: SectionHeading, Coverflow, PaperStack, SecretTerminal.
│  ├─ blog/, project/     Partes de las páginas de post y de caso de proyecto.
│  └─ SpotifyNow.astro, TweaksPanel.tsx
├─ scripts/
│  ├─ home.ts             Orquestador: qué se inicia y en qué orden. Empieza a leer por aquí.
│  ├─ core/               Infraestructura: idioma (i18n), pantalla de arranque, menú móvil.
│  ├─ sections/           Interacción propia de una sección (hero, blog, experience, contact, nowBand).
│  └─ fx/                 Efectos reutilizables, uno por archivo (ver tabla).
├─ data/                  Contenido del portafolio. index.ts los junta en `portfolioData`.
├─ lib/                   Utilidades: blog.ts (posts), text.ts (fechas, lectura, índice), cv.ts (render del PDF), ticker.ts.
├─ content/blog/          Posts en Markdown.
├─ styles/                global.css (entrada) → tokens, base, components, effects, coverflow, prose.
tests/                    Vitest: datos, helpers, CV y smoke del home.
tools/og-image.py         Genera public/og.png.
```

## Dónde cambio…

| Quiero…                              | Archivo                                   |
|--------------------------------------|-------------------------------------------|
| Un texto, cifra, proyecto o empleo   | `src/data/*.ts`                           |
| El CV en PDF                         | `src/data/cv.ts` (contenido), `src/lib/cv.ts` (diseño) |
| Un post                              | `src/content/blog/*.md`                   |
| El orden de las secciones del home   | `src/pages/index.astro`                   |
| El diseño de una sección             | `src/components/sections/<Sección>.astro` (su CSS va dentro) |
| Colores, fuentes                     | `src/styles/tokens.css`                   |
| Cuándo arranca un efecto             | `src/scripts/home.ts`                     |

## Efectos (`scripts/fx/`)

| Archivo            | Qué hace                                                                 | Se activa con          |
|--------------------|--------------------------------------------------------------------------|------------------------|
| `env.ts`           | Política de movimiento: `off` / `lite` / `full`. Modo ahorro automático.  | —                      |
| `coverflow.ts`     | Carrusel horizontal pinneado en 3D (Proyectos y Blog).                   | `[data-coverflow]`     |
| `typewriter.ts`    | Titulares que se tipean con cursor.                                      | `[data-type]`          |
| `scramble.ts`      | Etiquetas `// 0N _ X` que se descifran.                                  | `[data-scramble]`      |
| `wipe.ts`          | Revelado diagonal de sección + cascada de ítems.                         | `[data-wipe]`, `[data-stagger-item]` |
| `odometer.ts`      | Cifras como contador mecánico 3D.                                        | `[data-counter]`       |
| `crt.ts`           | Imagen que se enciende como monitor viejo.                               | `[data-crt]`           |
| `gyro.ts`          | Giroscopio compartido (pide permiso en iOS).                             | `[data-gyro-btn]`      |
| `lens.ts`          | Cursor lente + botones magnéticos (solo mouse).                          | `[data-lens]`, `[data-magnetic]` |
| `secretTerminal.ts`| Easter egg: escribir `sudo` o 5 toques al logo.                          | —                      |
| `chrome.ts`        | Ticker, barra de progreso, halo del cursor.                              | `[data-marquee]`       |

Todos respetan `prefers-reduced-motion` y el panel de tweaks vía `env.ts`:
`canAnimate()` (algo de movimiento) y `canAffordHeavy()` (blur, giroscopio, skew).

## Recetas

**Agregar una sección:** crea `components/sections/Nueva.astro` (markup + `<style>`),
ponla en `pages/index.astro`. Si necesita JS, crea `scripts/sections/nueva.ts` con un
`initNueva()` y llámalo en `home.ts` respetando el orden de la página.

**Reusar un efecto:** casi siempre basta con el atributo `data-*` de la tabla.

**Agregar un efecto:** `scripts/fx/nuevo.ts` que exporte `initNuevo()`, consulte
`env.ts` antes de animar y se llame desde `home.ts`. Sus estilos van en `styles/effects.css`.

**ScrollTrigger y secciones pinneadas:** crea los triggers en el orden de la página;
`home.ts` llama a `ScrollTrigger.sort()` al final para recalcular posiciones.

## Estilos: ¿`<style>` en el componente o en `styles/`?

- **En el componente** (scoped, por defecto): lo que solo usa esa sección o página.
- **En `src/styles/`** (global): tokens, base, piezas compartidas entre componentes
  (`components.css`, `coverflow.css`), efectos que crea el JS (`effects.css`) y todo lo que
  estiliza contenido de Markdown (`prose.css`), porque el HTML de un post no recibe el scope.
- Si un `<style>` scoped no aplica a algo que inyecta JS o Markdown, es porque ese HTML no lleva
  el atributo de scope: muévelo a `styles/` o usa `:global()`.
