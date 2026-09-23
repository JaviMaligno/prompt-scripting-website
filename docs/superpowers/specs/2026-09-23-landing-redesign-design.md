# Rediseño de la landing — diseño

Fecha: 2026-09-23. Aprobado por Javi en sesión con el visual companion
(maqueta: `.superpowers/brainstorm/12201-1790178411/content/pagina-completa.html`,
que no se versiona). La aprobó «como esqueleto»: la estructura y los textos
valen, y el acabado visual tiene que quedar por encima de la maqueta.

## Por qué

Dos lectores externos, dos veces el mismo fallo:

- Manolo Castellano (18-09): «no es evidente a simple vista» para qué sirve.
- Jose Luis Falcon (22-09): tuvo que ver el vídeo porque el texto no se lo
  dejaba claro, y preguntó por qué no meter toda la lista en un solo prompt.

La página explica con párrafos seguidos. El rediseño lo explica con piezas que
se leen de un vistazo, y contesta la objeción del «un solo prompt» en vez de
invitarla.

## Público y criterio de éxito

- Lector: una persona no técnica que hoy pasa el mismo prompt por una lista a
  mano (compliance, ventas, selección de personal, agencias). No es un
  desarrollador.
- Éxito: en el primer pantallazo del hero, sin hacer scroll, se entiende qué
  entra (un prompt con huecos y una lista), dónde ocurre (su chat) y qué sale
  (una tabla, un CSV). Ningún bloque de la página necesita un párrafo de más de
  dos líneas.

## Estilo (opción 1 de tres)

Claro y amable, evolución del actual: fondo blanco con un degradado índigo muy
suave en el hero, el índigo de marca (`#4F46E5`), tarjetas con sombra suave y
esquinas redondeadas. Se descartaron el estilo oscuro (lenguaje de herramienta
para desarrolladores, aleja al comprador) y el editorial cálido (obliga a
rehacer la marca, extensión incluida).

Por encima de la maqueta: tipografía con jerarquía clara, iconos de línea en SVG
en lugar de emojis y espaciado consistente. Nada de ilustraciones genéricas ni
de fotos de stock.

## Estructura, en este orden

Todo el texto de la web va en inglés, como ahora.

### 1 · Hero (componente `Hero`)

- Titular, sin cambios: «One prompt. Every row of your list. Inside the chat you
  already use.»
- Una línea debajo: «For the lists where every row needs its own answer, and
  pasting it all into one prompt gets you a guess.»
- Botón «Install for Chrome — free» → `CHROME_INSTALL_URL`.
- Tres pasos en fila (en móvil, en columna):
  1. **Write it once**: el prompt con el hueco resaltado: «What does {company}
     do, and which industry does it belong to? One word.»
  2. **Paste your list**: cuatro empresas y «… 196 more».
  3. **Get the table**: una tabla `company | industry` que se rellena fila a
     fila, con una barra de progreso, y al final aparece «results.csv — one line
     per row».
- Debajo: «Works in ChatGPT · Claude · Gemini».
- Sale del hero la captura `run-in-chat.png`. El fichero se conserva en
  `public/`, porque el `og.png` y la ficha de la tienda no dependen de ella.

**Animación del paso 3:** CSS puro, sin librería. Se ejecuta una vez al entrar
en pantalla (IntersectionObserver en un componente cliente pequeño), no en
bucle. Con `prefers-reduced-motion` se ve la tabla completa y quieta. Sin
JavaScript, se ve la tabla completa: el estado inicial oculto solo se aplica
cuando el script ha montado.

**Cifras del ejemplo:** 200 filas en total (4 visibles + 196). El plan gratis
admite 200 filas por subida, y un botón «free» junto a un ejemplo de 500
prometería algo que no se puede hacer gratis. Esto corrige también el «Five
hundred companies» del PR #17.

### 2 · Antes / después (componente nuevo `BeforeAfter`)

- Título: «Stop pasting the same prompt 200 times.»
- Dos columnas:
  - **Today** (tono rojo suave): «Copy the prompt → swap the name → paste → wait
    → copy the answer into the sheet», y un «× 200» grande.
  - **With Prompt Scripter** (tono verde suave): «Paste the list once → press
    Run → download one CSV», y un «× 1».
- Tres cifras debajo: «1 pass — for the whole list», «0 — API keys or setup»,
  «1 CSV — one line per row».

### 3 · ¿Un prompt o Prompt Scripter? (componente nuevo `OnePromptOrNot`)

Sustituye al párrafo «Why not paste the whole list into one prompt?» del PR #17.

- Título: «When one prompt is enough, and when it isn't»
- Columna **One prompt is enough** («The model already knows the answer.»):
  search intent for 50 keywords; translate a list of product names; capital city
  of 40 countries.
- Columna **Use Prompt Scripter** («Each row means finding something out.»):
  - Industry of each company — «Asked all at once, it labels from memory.»
  - Data sources for each country — «Thirty investigations don't fit in one
    reply.»
  - Research each account before the call — «Each one needs its own reading.»

### 4 · Para quién (componente nuevo `WhoItsFor`)

- Título: «Made for the lists you already work through by hand»
- Cuatro tarjetas (una columna por debajo de 640 px, dos hasta 1024 px, cuatro por encima), cada una con icono de línea, oficio,
  una frase y lo que sale:
  - Compliance — «Companies to classify, countries to check against the same
    criteria.» → one label per company
  - Sales & prospecting — «Look up each account before the first call and shape
    the angle for that one.» → one brief per account
  - Recruiting — «The same screening criteria over every CV in the pile.» → one
    verdict per candidate
  - Agencies & content — «The same brief, rewritten for every client or
    product.» → one draft per client

### 5 · Franja de confianza (componente nuevo `TrustStrip`)

Una franja fina entre filetes: «No API key» · «No token bill — it uses the chat
you already pay for» · «Nothing to install beyond the extension».

No se dice nada sobre si los datos pasan o no por el servidor. Con cuenta, las
ejecuciones se guardan en el backend, y cualquier frase corta sobre privacidad
sería ambigua.

### 6 · Vídeo (componente `Demo`, sin cambios de contenido)

- Título: «See it run».
- Se queda el Loom actual con su `t=25` hasta que Javi lo regrabe (pendiente
  suyo: que empiece por el modo de un solo chat). Solo cambia el aspecto:
  esquinas y sombra como el resto.

### 7 · Cierre (componente `CTA`, reescrito) + `Waitlist`

- Bloque índigo con esquinas redondeadas: «Try it on your next list», la línea
  «Free — Runs: 20 per month · Dataset rows: 200 per upload.» con un enlace
  «See Pro» a `/pricing`, y el botón de instalar en blanco.
- Los límites salen de `FREE_PLAN.limits` en `lib/pricing.ts` («20 per month»,
  «200 per upload»), no escritos a mano. No se muestra ningún precio: el precio vive en Stripe.
- `Waitlist` se queda exactamente como está, debajo.

## Qué sale

- El componente `Features` (las tres tarjetas) y su import en `pages/index.tsx`.
  Lo que decían queda repartido entre el hero, la franja de confianza y el
  bloque 3.
- El párrafo «Why not paste…» que el PR #17 añadió dentro de `Features`.

## Qué no cambia

- `Navbar`, `Footer`, `SeoHead`, `StructuredData`, `/pricing` y las páginas
  legales.
- `DEFAULT_DESCRIPTION` y el `HOME_TITLE`: son para buscadores y para la tienda.
- La extensión y su marca.

## Verificación

El repo no tiene tests. La verificación es:

1. `next build` sin errores ni warnings nuevos, y `next lint`.
2. Capturas con Playwright a 1440 px y a 390 px de ancho, de la página entera,
   sobre el preview de Vercel. No sirve `resize_window` de claude-in-chrome,
   que no cambia el viewport.
3. Comprobar a mano en el preview: la animación corre una vez al entrar en
   pantalla, con reduced motion se ve la tabla completa, y sin scroll
   horizontal en móvil.
4. Revisión final de Javi sobre el preview antes de mergear.

## Fuera de alcance

- Regrabar el vídeo (lo hace Javi).
- Versión en español de la web.
- Cambios en `/pricing`, en la ficha de Chrome Web Store o en `og.png`.
- Cualquier cambio de marca o de paleta más allá de lo descrito.
