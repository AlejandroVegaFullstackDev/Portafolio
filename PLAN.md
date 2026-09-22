# PLAN — Arreglar la tipografía y la jerarquía del blog

Para el agente que lo ejecute. Trabaja en `C:\Users\USER\proyectos\portafolio`.

Repo Astro 5 + Content Collections, desplegado en Vercel desde `main`. Hay dos posts en
`src/content/blog/`.

---

## Contexto: qué pasa y por qué

El post se ve como un muro de texto plano. No se distingue un título de un párrafo, no hay
separación entre párrafos, los enlaces no destacan.

**No es un problema de diseño, es un bug.** Está diagnosticado y verificado:

`src/pages/blog/[slug].astro` define todos los estilos de lectura dentro de un bloque `<style>`
del propio componente. En Astro esos estilos son **scoped**: el compilador les añade un atributo.

```
CSS generado:    .prose[data-astro-cid-4sn4zg3r] h2[data-astro-cid-4sn4zg3r] { ... }
HTML de <Content />:  <h2 id="el-problema-no-es-la-falta-de-informacion">...</h2>
```

El HTML que produce el Markdown **no lleva el atributo**, así que ningún selector
`.prose <algo>` coincide. Se pierden: `h2`, `h3`, márgenes de `p`, `a`, `ul`/`ol`/`li`, `strong`,
`blockquote`, `pre`, `code`, `img`, `hr`.

Lo único que sobrevive es la regla `.prose` a secas —color, `line-height`, `font-size`— porque
ese `<article class="prose">` sí está en la plantilla y sí recibe el atributo. Eso explica
exactamente lo que se ve.

**Verificado así** (reproducir antes de tocar nada, para ver el fallo con tus ojos):

```bash
npm run build
F=dist/client/blog/por-que-construi-mi-propio-tutor/index.html
grep -o '<h2[^>]*>' "$F" | head -3                       # sin data-astro-cid
grep -rho '\.prose[^{]*h2[^{]*{' dist/client/_astro/*.css # con data-astro-cid
```

---

## Tarea 1 — Arreglar el scope (bloqueante, hazla primero)

**Es el 80% del problema y se arregla en un sitio.**

Mueve **todo el bloque `.prose ...`** de `src/pages/blog/[slug].astro` a
`src/styles/global.css`, al final, bajo un comentario `/* ── Prose: contenido de Markdown ── */`.

No lo envuelvas en `:global()` dentro del componente ni uses `<style is:global>`: esos estilos
los va a querer también `/blog` y cualquier página futura con Markdown. En `global.css` viven una
vez y valen para todas.

Deja en el `<style>` del componente lo que **sí** está en la plantilla: `#read-bar`, `.post-nav*`,
`.post-header`, `.post-h1`, `.post-desc`, `.post-meta-row`, `.post-divider*`, `.post-layout`,
`.post-sidebar`, `.sidebar-*`, `.post-footer`, `.footer-link`. Eso funciona bien y no se toca.

**Criterio de aceptación:** tras `npm run build`, el CSS de `.prose h2` ya no lleva
`[data-astro-cid-...]`, y al abrir el post los `##` se ven grandes, en negrita y con la barra roja
a la izquierda.

---

## Tarea 2 — Legibilidad del cuerpo

Una vez aplicados los estilos, hay que ajustarlos. Los valores actuales se pensaron sin poder
verlos aplicados nunca.

En el bloque `.prose` ya movido a `global.css`:

| Qué | Ahora | A |
|---|---|---|
| `font-size` | `1.05rem` | `1.125rem` |
| `line-height` | `1.82` | `1.7` |
| color del cuerpo | `var(--ink-2)` | `var(--ink)` en tema oscuro |
| ancho de línea | sin límite | `max-width: 68ch` en `.prose` |

**El color es lo más importante.** `--ink-2` (`#b9b9c4`) sobre `--bg` (`#050507`) es gris sobre
negro: se lee bien un párrafo y cansa en 1.300 palabras. El cuerpo va en `--ink`; `--ink-2` se
reserva para lo secundario (pies, metadatos, el `.post-desc`).

Comprueba el contraste resultante en ambos temas: `global.css` redefine las variables para claro
y oscuro, y el cuerpo tiene que ser legible en los dos.

---

## Tarea 3 — Jerarquía de títulos

Que un `h2` se distinga sin tener que compararlo con nada.

- `h2`: separación **muy asimétrica** — mucho aire arriba, poco abajo. Ahora es
  `margin: 2.8em 0 0.9em`; déjalo en `3.5em 0 0.6em`. Un título tiene que pertenecer
  visualmente al texto que le sigue, no flotar entre dos bloques.
- Sube el contraste de tamaño: `h2` a `clamp(1.6rem, 3.5vw, 2.1rem)` frente a `1.125rem` del
  cuerpo. La barra roja de `::before` ya está y funciona bien: consérvala.
- `h3` a `1.3rem`, y sin barra, para que se lea claramente como un nivel por debajo.

---

## Tarea 4 — Quitar el hueco muerto de la cabecera

En el post actual hay una franja vacía enorme entre el título y el primer párrafo. Sale de sumar
`.post-header` (`7rem` arriba + `4rem` abajo) con `.post-layout` (`3rem` arriba) y el
`.post-divider`.

- `.post-header`: `padding: 6rem 1.5rem 2.5rem` (y en `>=1024px`, `7rem 2rem 3rem`)
- `.post-layout`: `padding-top: 1.5rem`
- `.post-divider`: `margin-top: 1.5rem`

---

## Tarea 5 — Índice en la barra lateral

El post tiene seis `h2` y 1.300 palabras. La barra lateral hoy muestra fecha, lectura, autor y
tags: información que ya está en la cabecera, repetida.

Sustituye el bloque `// INFO` por `// CONTENIDO`: los `h2` del post, como enlaces a su `id`
—Astro ya los genera, se ve en el HTML—, con el que se está leyendo resaltado en `--accent`
mediante `IntersectionObserver`.

Deja `// LINKS` como está.

En `<1024px` la barra ya está oculta, y así se queda. En móvil un índice estorba más que ayuda.

---

## Tarea 6 — El prefijo `$` de los bloques de código

`.prose pre::before` inserta un `$ ` fijo en **todos** los bloques de código. Está bien para
comandos de shell y está mal para todo lo demás: los próximos posts van a llevar diagramas ASCII
—diagramas de acordes, pinouts— y un `$` delante de un diagrama no tiene sentido.

Cámbialo por: mostrar el **lenguaje** de la valla Markdown cuando exista
(``` ```bash ``` produce `class="language-bash"`), y no mostrar nada cuando no lo haya.

Y en `.prose pre code`: `white-space: pre`, `tab-size: 2`, sin `word-break`. Un diagrama ASCII que
se parte por el ancho deja de ser un diagrama.

---

## Tarea 7 — Comprobar `.prose hr`

La regla actual pone `display:flex` sobre un `<hr>` con `::before`/`::after`. Nunca se ha visto
aplicada, así que no se sabe si funciona.

Si al aplicarse no se ve bien, sustitúyela por algo simple y seguro: tres puntos centrados
(`•••`) en `--ink-3`, `margin: 3.5em 0`.

---

## Verificación

No la des por hecha: **mira el post en el navegador**, en los dos temas.

```bash
npm run build       # tiene que completar sin errores
npm run preview     # y abrir /blog/por-que-construi-mi-propio-tutor
```

Lista de comprobación:

- [ ] Los seis `##` se ven como títulos, con su barra roja, sin compararlos con nada
- [ ] Hay separación clara entre párrafos
- [ ] Los enlaces se distinguen del texto
- [ ] El texto se lee cómodo en oscuro **y** en claro
- [ ] No hay franja vacía entre la cabecera y el primer párrafo
- [ ] Ningún bloque de código lleva `$` salvo los de shell
- [ ] Funciona a 375px de ancho sin scroll horizontal
- [ ] `/blog` (el índice) sigue bien: los estilos se movieron a global, comprueba que no rompió nada

## Al terminar

Un commit, mensaje descriptivo, push a `main`. Vercel despliega solo.

**No toques `src/content/blog/*.md`.** El contenido está bien; el problema era solo cómo se
renderiza.
