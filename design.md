# [NOMBRE_DEL_NEGOCIO] — Design System & Landing Spec (Automotriz)

> Sala de exhibición a medianoche con un cuaderno de taller sobre la mesa. Escenarios negros donde el carro y sus detalles son la única luz, alternados con páginas crema de papel donde se explican precios, proceso y confianza. Preciso, limpio y sin ruido.

**Nicho:** Talleres mecánicos, detallado automotriz y servicio de frenos (Bogotá / Chía)
**Idioma del sitio:** Español (es-CO), tuteo por defecto
**Tema:** Mixto — escenarios oscuros (Apple Watch) + secciones crema (ElevenLabs)
**Origen:** Fusión de *Apple (Watch)* — escenarios negros, producto aislado, tiles de 28px, titulares en SF Pro 600, pill azul de compra, verde de métrica — y *ElevenLabs* — lienzo crema cálido, titulares ligeros (300) con tracking apretado, botones pill negros, hairlines, superficies taupe.

---

## 0. Instrucciones para el agente (Claude Code)

1. Lee este archivo completo antes de escribir código.
2. Stack sugerido: **HTML + CSS (custom properties) + JS vanilla**, o **Astro/Next.js + Tailwind v4**. Una sola página, mobile-first.
3. Usa **solo** los tokens de este documento. No inventes colores, radios, sombras ni fuentes.
4. **Plantilla reutilizable (white-label):** todo lo específico del negocio vive en `/config/site.js` (nombre, WhatsApp, dirección, horarios, servicios, precios, métricas, reseñas, redes, textos legales). Cambiar de cliente = cambiar ese archivo + las fotos. Los placeholders aparecen como `[ENTRE_CORCHETES]` o `{{LLAVES}}`.
5. Entrega: accesible (WCAG AA), rápido (LCP < 2.5 s), SEO local y sin dependencias innecesarias.
6. Al terminar, ejecuta el checklist de la sección 12.

---

## 1. Principios y resolución de conflictos

### 1.1 Qué se toma de cada sistema

| Idea | Origen | Traducción al nicho automotriz |
|---|---|---|
| Escenario negro con el producto aislado | Apple | El carro, el disco de freno o el acabado de pintura como único objeto iluminado sobre negro |
| Titulares enormes en SF Pro 600 y tracking casi neutro | Apple | Hero y métricas con peso de "instrumento" |
| Tiles de 28px que interrumpen el negro | Apple | Servicios, antes/después y galería en tiles recortados |
| Módulo "close-look" (pills a la izquierda + recorte grande) | Apple | Selector de servicios: Detallado · Frenos · Mecánica · Diagnóstico |
| Verde de métrica | Apple (Battery Green) | Cifras de confianza sobre negro: vehículos atendidos, años, garantía |
| Lienzo crema `#fdfcfc` y superficies taupe | ElevenLabs | Precios, proceso, testimonios, ubicación: la parte "cuaderno de taller" |
| Titulares ligeros (300) con tracking -0.02em | ElevenLabs | Títulos de secciones claras: autoridad por tamaño, no por peso |
| Botones pill, jerarquía negro + outline | ElevenLabs | CTAs sobre fondos claros |
| Hairlines `#ebe8e4` en lugar de sombras | ElevenLabs | Separadores y bordes de tarjetas claras |
| Esfera con gradiente como único "chispazo" | ElevenLabs | Un solo orbe cálido decorativo (brillo de disco/freno), opcional |

### 1.2 Conflictos resueltos

| Conflicto | Decisión final |
|---|---|
| Apple = oscuro, ElevenLabs = claro | **Alternar por función:** oscuro = producto/servicio (lo que se ve y se desea); claro = decisión/confianza (precios, proceso, reseñas, ubicación) |
| Titulares: peso 600 (Apple) vs 300 (ElevenLabs) | **División por superficie:** sobre oscuro → 600; sobre claro → 300. Nunca 700+. Nunca 300 sobre negro (se pierde) |
| Botón primario: azul de compra (Apple) vs negro (ElevenLabs) | **Sobre oscuro: pill azul `#0071e3`. Sobre claro: pill negro.** El azul es el único color de relleno permitido y solo para el CTA principal sobre oscuro |
| Botón tamaño: Apple 12px compacto vs práctico para móvil | Alto mínimo **44px** (48px recomendado), texto 14–16px. Mantener la forma pill |
| Acentos: violeta `#0447ff` y naranja `#ff4704` (ElevenLabs) vs azul/naranja Apple | Se **descarta el violeta** (choca con el azul de compra). Se unifica el naranja en **Ember `#ff4704`** (brillo de freno, badges, orbe). Naranjas Apple (`#ff791b`) descartado |
| Radios: 20px (ElevenLabs) vs 28px (Apple) | Tiles de medios 28px · tarjetas de texto 20px · tarjetas destacadas 24px · botones/chips/tags pill · inputs 10px |
| Sombras: Apple cero; ElevenLabs susurro | **Cero sombras** en oscuro y en tiles. Solo la sombra susurro de ElevenLabs en una tarjeta blanca elevada y la sombra del botón de WhatsApp |
| Gradientes: Apple "ninguno tras el producto"; ElevenLabs esfera | Gradiente **solo** dentro del orbe decorativo. Nunca detrás de fotos ni de texto |
| Fuentes propietarias (Waldenburg, SF Pro) | **Inter** (variable, pesos 300–600) como base + **Geist Mono** para datos técnicos |
| Link azul (Apple `#0066cc`) | Solo sobre fondos **claros**. Sobre oscuro no pasa AA: usar Polar White subrayado |
| Espaciado: ElevenLabs 96–125px entre secciones vs Apple 24px entre tiles | 96–120px entre secciones; **24px** entre tiles dentro de una secuencia oscura |

### 1.3 Por qué funciona para un taller (y el riesgo)
- Un carro sobre negro es el lenguaje natural del detallado: reflejos, pintura, rines, pinzas de freno.
- El crema inyecta calidez y confianza donde el cliente decide (precio, garantía, ubicación).
- **Riesgo:** tanta elegancia puede esconder lo que el cliente de un taller busca: *precio, ubicación, horario, WhatsApp*. Por eso esos cuatro datos son visibles sin scroll y repetidos en el flujo (ver sección 7).

---

## 2. Color

### 2.1 Paleta

| Token | Valor | Rol |
|---|---|---|
| `--color-eggshell` | `#fdfcfc` | Lienzo de secciones claras, texto de botones negros. Nunca `#ffffff` puro |
| `--color-taupe` | `#f5f3f1` | Bandas y tarjetas sobre crema, footer |
| `--color-stone` | `#ebe8e4` | Hairlines, divisores, placas de iconos |
| `--color-ink` | `#000000` | Texto principal sobre claro, botón primario sobre claro |
| `--color-graphite` | `#44403b` | Texto secundario fuerte sobre claro, etiquetas de sección |
| `--color-smoke` | `#777169` | Cuerpo atenuado sobre claro (pasa AA sobre eggshell) |
| `--color-ash` | `#a59f97` | Solo notas al pie ≥ 14px y placeholders; **no** para texto informativo |
| `--color-black` | `#000000` | Escenario del hero y tiles de medios |
| `--color-carbon` | `#111111` | Lienzo oscuro por defecto, nav |
| `--color-charcoal` | `#333336` | Chips, selectores y filas de acordeón sobre oscuro |
| `--color-polar` | `#f5f5f7` | Texto principal sobre oscuro |
| `--color-steel` | `#86868b` | Texto atenuado sobre oscuro |
| `--color-divider` | `#6e6e73` | Bordes de inputs y divisores sobre oscuro |
| `--color-glyph` | `#cccccc` | Iconos de navegación sobre oscuro |
| `--color-purchase` | `#0071e3` | **Único relleno cromático:** CTA primario sobre oscuro |
| `--color-link` | `#0066cc` | Enlaces de texto sobre fondos claros únicamente |
| `--color-metric` | `#00d959` | Cifras y métricas sobre oscuro (garantía, vehículos, años) |
| `--color-ember` | `#ff4704` | Acento visual: brillo de freno, orbe, punto de estado, texto de badge sobre `ember-black` |
| `--color-ember-black` | `#311400` | Superficie de badge sobre oscuro |
| `--color-rust` | `#b64400` | Texto de badge "Nuevo / Cupos limitados" sobre claro |
| `--color-wa` | `#25d366` | **Excepción funcional:** solo botón flotante de WhatsApp |

### 2.2 Superficies

| Nivel | Nombre | Valor | Uso |
|---|---|---|---|
| 0 | Carbon | `#111111` | Lienzo oscuro, nav, bandas |
| 1 | Black stage | `#000000` | Hero, tiles de medios, close-look |
| 2 | Charcoal | `#333336` | Chips y acordeón sobre oscuro |
| 3 | Eggshell | `#fdfcfc` | Lienzo claro |
| 4 | Taupe | `#f5f3f1` | Bandas y tarjetas claras, footer |
| 5 | Stone | `#ebe8e4` | Placas pequeñas, hairlines |

### 2.3 Reglas de color
- La paleta es ~97% acromática. El color aparece como **señal**: azul = acción, verde = métrica, ember = brillo/estado.
- **Nunca** mezclar azul + ember + verde en el mismo componente.
- Ember y verde nunca son fondo de botón ni de tarjeta.
- Texto sobre oscuro: `polar` (principal) / `steel` (secundario). Texto sobre claro: `ink` / `graphite` / `smoke`.
- Verde `#00d959` solo sobre oscuro (sobre claro no cumple contraste: usar `ink`).
- Sin degradados ni patrones, salvo el orbe (3.4 / 5.11).
- Texto sobre foto: directamente sobre zonas oscuras, sin scrim. Si no hay contraste ≥ 4.5:1, reencuadrar o cambiar la foto.

---

## 3. Tipografía

### 3.1 Familias

| Token | Fuente | Uso |
|---|---|---|
| `--font-sans` | **Inter** (variable; fallback system-ui) | Titulares, cuerpo, navegación, botones |
| `--font-mono` | **Geist Mono** (fallback JetBrains Mono, ui-monospace) | Datos técnicos, eyebrows, etiquetas de precio "DESDE", especificaciones |

Carga con `font-display: swap`; `preload` de Inter 300/400/600 con subset latino.

### 3.2 Escala

| Rol | Tamaño (desktop → mobile) | Line-height | Tracking | Peso | Superficie |
|---|---|---|---|---|---|
| `hero-display` | `clamp(44px, 7vw, 72px)` | 1.06 | -0.01em | 600 | oscuro |
| `section-display` | `clamp(32px, 4.5vw, 56px)` | 1.08 | -0.01em | 600 | oscuro |
| `heading-light` | `clamp(32px, 4vw, 48px)` | 1.1 | -0.02em | **300** | claro |
| `heading-light-sm` | `clamp(26px, 3vw, 36px)` | 1.15 | -0.02em | **300** | claro |
| `metric` | `clamp(36px, 5vw, 48px)` | 1.0 | -0.01em | 600 | oscuro |
| `subheading` | 20px | 1.35 | 0 | 400 | ambas |
| `body` | 16px (17px en desktop sobre oscuro) | 1.5 | 0 | 400 | ambas |
| `body-strong` | 16–17px | 1.3 | 0 | 600 | ambas |
| `body-sm` | 14px | 1.5 | 0 | 400 | ambas |
| `caption` | 12px | 1.4 | 0 | 400 | ambas |
| `mono-label` | 13px | 1.4 | 0.02em | 400, MAYÚSCULAS | ambas |

### 3.3 Reglas tipográficas
- **Titulares sobre oscuro = 600; sobre claro = 300.** Es la firma visual: producto firme, trato ligero.
- Tracking de titulares: `-0.01em` (oscuro) y `-0.02em` (claro). Cuerpo: neutro, sin tracking.
- Geist Mono para lo "técnico": `PASTILLAS · DISCOS · LÍQUIDO`, `DESDE $[X]`, tiempos de servicio. Siempre MAYÚSCULAS, 13px.
- Números grandes (métricas, precios) con `font-variant-numeric: tabular-nums`.
- Largo de línea de cuerpo: 60–72 caracteres. Máximo 3 líneas de titular en mobile.
- Nunca Arial/Helvetica como visibles; solo fallback.

---

## 4. Espaciado, forma y elevación

### 4.1 Espaciado (base 4px)
`4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 64 · 72 · 96 · 120`

| Token | Valor |
|---|---|
| `--page-max` | 1280px |
| `--gutter` | 64px desktop · 32px tablet · 20px mobile |
| `--section-gap` | 120px desktop · 80px tablet · 64px mobile |
| `--tile-gap` | 24px (entre tiles de una secuencia) · 16px mobile |
| `--card-padding` | 32px (claras) · 16px (tiles con marco interno) · 24px (compactas) |
| `--element-gap` | 8–16px |

### 4.2 Radios

| Elemento | Radio |
|---|---|
| Botones, tags, chips, tabs, acordeón, badge de estado | 9999px |
| Tiles de medios y tarjetas de información | 28px |
| Tarjetas de texto sobre claro (taupe) | 20px |
| Tarjetas destacadas / paquete recomendado | 24px |
| Inputs y selects | 10px |
| Badges rectangulares pequeños | 5px |
| Fotos de hero a sangre | 0 |

### 4.3 Elevación
- **Oscuro y tiles:** cero sombras. La separación sale del contraste de superficies y del recorte de 28px.
- **Claro:** hairline `1px solid var(--color-stone)` por defecto. Una única tarjeta blanca elevada con sombra susurro:
  `0 0 1px rgba(0,0,0,.4), 0 1px 1px rgba(0,0,0,.04), 0 2px 4px rgba(0,0,0,.04)`.
- **Botón de WhatsApp:** `0 8px 24px rgba(0,0,0,.35)` (única sombra difusa permitida).
- Sin glows ni blur, salvo `backdrop-filter: blur(20px)` en la nav al hacer scroll.

---

## 5. Componentes

### 5.1 Navegación
- **Global (44px):** fondo `carbon`, wordmark `[NOMBRE]` a la izquierda (Inter 600, 15px), enlaces 12–13px `rgba(255,255,255,.8)` (Servicios · Paquetes · Antes y después · Opiniones · Ubicación), a la derecha botón pill azul compacto **"Cotizar"**.
- **Local opcional (52px):** al pasar el hero, aparece un subnav con el servicio activo.
- Mobile: wordmark + botón "Cotizar" + hamburguesa → menú a pantalla completa en `black`, enlaces en `section-display`.
- Al hacer scroll: `carbon` al 80% con blur 20px.

### 5.2 Botones

| Variante | Sobre oscuro | Sobre claro |
|---|---|---|
| **Primario** | Pill `purchase` `#0071e3`, texto blanco | Pill `ink`, texto `eggshell` |
| **Secundario (outline)** | Pill `rgba(66,66,69,.72)`, texto `rgba(255,255,255,.8)`, sin borde | Pill `eggshell`, texto `ink`, borde 1px `#e5e5e5` |
| **Link** | Texto `polar` + subrayado al hover | Texto `link` `#0066cc` |

- Alto 44–48px · padding `0 24px` · Inter 14–16px peso 500.
- Hover: cambio de tono (+8% luminosidad en el azul), sin escalas ni sombras. Transición 0.2s.
- Foco: `outline: 2px solid var(--color-purchase); outline-offset: 3px` (sobre claro usar `ink`).
- Un solo botón azul por pantalla visible.

### 5.3 Tile de medios oscuro
Fondo `black`, radio 28px, sin sombra, sin borde, padding 14px si lleva marco interno. Producto recortado de forma agresiva para que los bordes se disuelvan en el negro. Para: servicios, antes/después, galería.

### 5.4 Tarjeta Taupe
Fondo `taupe`, radio 20px (24px si es destacada), padding 32px, sin sombra ni borde. Para: proceso, ubicación, testimonios, paquetes.

### 5.5 Tarjeta blanca elevada
Fondo `eggshell`, radio 20px, padding 24px, sombra susurro (4.3). Uso escaso: una por sección como máximo (por ejemplo, el resumen del cotizador).

### 5.6 Chip selector y tab pill
- **Sobre oscuro:** fondo `rgba(66,66,69,.72)`, texto `rgba(255,255,255,.8)`, radio 36px/pill. Activo: fondo `charcoal` más claro + texto `polar`.
- **Sobre claro:** transparente, borde 1px `ink`, texto `ink`. Activo: relleno `ink`, texto `eggshell`.
- Tab pill con punto de estado de 6px: `ember` en el servicio activo.

### 5.7 Acordeón de FAQ
Cada fila es una pill `charcoal` de 36px de radio, texto `rgba(255,255,255,.8)`, glifo circular "+" a la izquierda que rota 45° al abrir. El panel abierto aparece debajo en texto `polar`/`steel`.

### 5.8 Badge
- Sobre oscuro: fondo `ember-black`, texto `ember`, 12px 600, radio 5px o pill.
- Sobre claro: fondo `taupe`, texto `rust`, 12px 600.
- Textos: `NUEVO` · `MÁS ELEGIDO` · `CUPOS ESTA SEMANA`.

### 5.9 Bloque de métrica
Sobre oscuro: etiqueta mono 13px `steel` + valor `metric` en `--color-metric`, 600, `tabular-nums`. Sin fondo; hairline superior 1px `rgba(255,255,255,.12)`. Ej.: `VEHÍCULOS ATENDIDOS → 1.200+`.

### 5.10 Inputs de formulario
- Sobre oscuro: fondo `rgba(255,255,255,.04)`, borde 1px `divider`, texto `polar`, radio 10px, alto 52px, padding `0 16px`. Foco: borde `polar` + outline `purchase` 2px.
- Sobre claro: fondo `eggshell`, borde 1px `stone`, texto `ink`. Foco: borde `ink` + outline 2px.
- Label mono 13px MAYÚSCULAS arriba. Placeholder `steel`/`ash`.
- Error: borde `ember` + mensaje 14px con icono (nunca solo color). Éxito: check en `metric` (oscuro) o `ink` (claro).
- Buscador/selector de placa opcional: pill 980px, padding-izq 24px.

### 5.11 Orbe decorativo (opcional, máximo uno por página)
Círculo ~200px con gradiente radial suave `ember` → naranja cálido → rosa claro, sin borde duro, sobre una sección **clara** (por ejemplo, junto al bloque de proceso o al formulario). Evoca el brillo de un disco de freno al rojo. Sin botón de play. Es la única excepción a la regla de "sin degradados".

### 5.12 Estado "Abierto ahora"
Pill con punto de 6px (`metric` abierto / `ember` cerrado) + texto mono: `ABIERTO AHORA · CIERRA 6:00 PM`. Se calcula con horarios de `config/site.js` y la zona `America/Bogota`.

### 5.13 Slider antes/después
Tile oscuro 28px con dos imágenes superpuestas y manija circular de 44px, línea vertical 1px `polar`. Etiquetas `ANTES` / `DESPUÉS` en mono. Operable por teclado (flechas) y táctil. Sin autoplay.

### 5.14 Divisor hairline
`1px solid var(--color-stone)` sobre claro; `rgba(255,255,255,.12)` sobre oscuro.

### 5.15 Botón flotante de WhatsApp
- Círculo 60px (56px mobile), fondo `--color-wa`, icono blanco SVG, `position: fixed; right: 20px; bottom: calc(20px + env(safe-area-inset-bottom)); z-index: 50`.
- Entrada tras 3s o pasado el hero. Tooltip pill al hover (desktop): "Cotiza por WhatsApp" fondo `carbon`, texto `polar`.
- `href="https://wa.me/{{WHATSAPP_NUMBER}}?text=..."` con mensaje prellenado, `target="_blank" rel="noopener"`, `aria-label="Escribir por WhatsApp"`.
- Se oculta en mobile mientras la barra inferior del cotizador o el formulario estén visibles.

---

## 6. Layout y ritmo

- Una sola columna centrada a **1280px**. Hero y galería pueden ir a sangre completa.
- Ritmo de fondos: **hero negro → carbon (servicios) → negro (antes/después) → crema (proceso, paquetes, opiniones) → taupe (ubicación) → carbon (FAQ + formulario) → footer taupe**.
- Grid base 12 columnas desktop / 4 mobile; gap entre tiles 24px.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280`. Mobile-first.
- Nav sticky; sin mega-menú ni sidebar.

---

## 7. Estructura de la landing

> Copy en español como **borrador editable**. Todo lo entre `[ ]` o `{{ }}` es variable de `config/site.js`.

### 7.0 Navegación + botón flotante
Ver 5.1 y 5.15.

### 7.1 Hero — *(fondo: black stage)*
**Objetivo:** que el visitante entienda qué hacen y pueda cotizar en menos de 5 segundos.

- **Eyebrow** (mono, `steel`): `TALLER Y DETALLADO AUTOMOTRIZ · [BOGOTÁ / CHÍA]`
- **H1** (`hero-display`, 600, `polar`, centrado): `Tu carro, como nuevo. Sin dar vueltas.` *(alternativas: "Frenos seguros. Pintura impecable." · "Cuidamos tu carro por dentro y por fuera.")*
- **Subtexto** (`subheading`, `steel`, máx. 560px): `[Detallado, frenos y mecánica] con precio claro antes de empezar. Cotiza por WhatsApp y recibe respuesta en minutos.`
- **Visual:** foto/render del vehículo aislado en el centro, recortado contra negro puro (sin gradientes). Alternativa: un recorte de pinza de freno o de pintura con reflejo.
- **CTAs:** pill azul `Cotizar por WhatsApp` + outline oscuro `Ver servicios`.
- **Línea de contacto rápida** debajo (mono, `steel`): `📍 [Dirección corta] · ABIERTO AHORA · LUN–SÁB [8:00–18:00]`. Dirección y horario visibles sin scroll.

### 7.2 Barra de métricas — *(fondo: carbon)*
3–4 bloques de métrica (5.9): `[1.200+] VEHÍCULOS ATENDIDOS` · `[10] AÑOS DE EXPERIENCIA` · `[4.8★] EN GOOGLE` · `[GARANTÍA 30 DÍAS]`. Solo cifras reales; si no existen, omitir la barra.

### 7.3 Servicios (close-look) — *(fondo: carbon → tile black)*
- **H2** (`section-display`, 600, `polar`, alineado a la izquierda): `Todo lo que tu carro necesita.`
- **Layout desktop:** columna izquierda con pills selectoras (5.6) apiladas: `Detallado · Frenos · Mecánica · Diagnóstico · [Otro]`. A la derecha, un tile negro 28px con recorte grande del servicio activo, y debajo del tile: título (`subheading` 600), descripción 2 líneas (`steel`), mono `DESDE $[X] · [2–4 h]` y link `Cotizar este servicio →`.
- **Mobile:** pills en fila horizontal con scroll; tile debajo.
- **Servicios sugeridos:**
  1. **Detallado automotriz:** lavado de motor, pulido, ceramic/cera, tapicería, desinfección interior.
  2. **Servicio de frenos:** pastillas, discos, líquido, rectificación, revisión de sistema.
  3. **Mecánica general:** mantenimiento preventivo, suspensión, cambio de aceite, correa.
  4. **Diagnóstico por scanner:** lectura de fallas, revisión pre-compra.
- Cada pill actualiza el tile con transición de opacidad 0.3s (sin deslizamientos).

### 7.4 Antes y después — *(fondo: black stage)*
- **H2:** `Los detalles se notan.`
- Secuencia de 2–3 tiles de 28px con slider antes/después (5.13): pintura, rines, tapicería. Gap 24px.
- Caption editorial bajo cada tile (mono): `HONDA CIVIC 2018 · PULIDO + CERÁMICO`.
- Cierre: link `Ver más en Instagram →` + `@[usuario]`.

### 7.5 Proceso — *(fondo: eggshell; orbe opcional)*
- **Eyebrow** mono `01 — CÓMO TRABAJAMOS`. **H2** (`heading-light`, 300): `Simple, transparente, sin sorpresas.`
- 3 tarjetas taupe (20px) en fila: **1. Escríbenos** (envía foto o describe el problema) · **2. Te cotizamos** (precio cerrado antes de empezar) · **3. Te lo entregamos** (con garantía escrita y fotos del trabajo).
- Cada tarjeta: número mono, título 20px 600, descripción 14–16px `smoke`.

### 7.6 Paquetes y cotizador — *(fondo: eggshell)*
`id="cotizador"` — **sección de conversión principal.**

- **Eyebrow** `02 — PAQUETES`. **H2** (300): `Elige tu servicio. Te confirmamos el precio por WhatsApp.`
- **Grid de 3 paquetes** (ejemplo detallado; editable por negocio): `Básico` · **`Premium` (recomendado, tarjeta 24px con badge `MÁS ELEGIDO`)** · `Completo`. Cada uno: precio mono `DESDE $[X]`, lista de lo que incluye (checks `ink`), botón outline; el recomendado lleva botón negro.
- **Cotizador interactivo (ligero):** tarjeta blanca elevada con:
  1. Tipo de vehículo (chips: Automóvil · SUV · Camioneta · Moto).
  2. Servicio (chips múltiples).
  3. Extras (checkboxes).
  4. Resumen sticky con **rango estimado** `$[min] – $[max]` y texto legal `Estimado de referencia. El precio final se confirma tras revisar el vehículo.`
  5. CTA negro `Enviar cotización por WhatsApp`, mensaje prellenado con `encodeURIComponent`:
     `Hola, quiero cotizar {{servicio}} para un {{vehiculo}}. Extras: {{lista}}. Estimado: {{rango}}.`
- Precios desde `config/pricing.js`. Si el negocio no publica precios: `Cotización personalizada`.
- `aria-live="polite"` en el estimado. Mobile: barra inferior fija con estimado + botón.

### 7.7 Opiniones — *(fondo: eggshell)*
- **Eyebrow** `03 — OPINIONES`. **H2** (300): `Lo que dicen quienes ya confiaron su carro.`
- Calificación de Google en grande (`4.8★ · [N] reseñas`) + 3 tarjetas taupe de testimonios (estrellas `ink`, cita 16px, nombre, vehículo y servicio).
- Carrusel con botones pill outline (44px), sin autoplay, con swipe.
- Solo reseñas reales y verificables; mientras tanto, `{{PLACEHOLDER}}`.

### 7.8 Ubicación y horario — *(fondo: taupe)*
- **Eyebrow** `04 — VISÍTANOS`. **H2** (300): `Estamos en [Barrio / Vía], [Ciudad].`
- Dos columnas: izquierda con dirección, teléfono, horarios y estado "Abierto ahora" (5.12), más botones `Cómo llegar` (outline, abre Google Maps) y `Llamar` (outline). Derecha: mapa embebido (lazy) dentro de tile 28px.
- Línea de confianza: `Recogida y entrega a domicilio` / `Parqueadero cubierto` solo si es cierto.

### 7.9 Preguntas frecuentes — *(fondo: carbon)*
- **H2** (`section-display`, 600): `Preguntas frecuentes.`
- 6–8 filas de acordeón (5.7): ¿Cuánto tarda? ¿Dan garantía? ¿Aceptan pagos con tarjeta? ¿Puedo dejar el carro todo el día? ¿Trabajan con todas las marcas? ¿Hacen cotización sin costo?
- JSON-LD `FAQPage` generado desde el mismo contenido.

### 7.10 Formulario + CTA final — *(fondo: black stage)*
`id="contacto"`

Dos columnas desktop:
- **Izquierda:** eyebrow `● RESPONDEMOS EN MENOS DE [30 MIN]` (punto `metric`), H2 (`section-display`): `Agenda tu cita hoy.`, datos de contacto y garantías con check `metric`: `Cotización sin costo` · `Garantía escrita` · `Fotos del trabajo`.
- **Derecha:** tarjeta taupe 28px con el formulario: Nombre* · WhatsApp* · Placa o modelo del vehículo · Servicio (select)* · Fecha preferida · Mensaje. Consentimiento de datos* (Ley 1581, enlace a política de privacidad).
- CTA negro `Solicitar cotización` + enlace `o escríbenos por WhatsApp →`.
- Honeypot anti-spam, validación cliente y servidor, estados *cargando / éxito / error* con fallback a WhatsApp.
- `autocomplete` correcto (`name`, `tel`), `inputmode="tel"`. Endpoint configurable por variable de entorno.

### 7.11 Footer — *(fondo: taupe)*
Banda clara compacta: wordmark, columnas (Servicios, Paquetes, Ubicación, Legal) con encabezados 12px 600 y enlaces 14px `smoke`, hairline `stone`, copyright y políticas. JSON-LD `AutoRepair`/`LocalBusiness` con `areaServed`, `openingHours`, `telephone`, `sameAs` y `aggregateRating` (solo si es real).

### 7.12 Botón flotante de WhatsApp
Ver 5.15. Presente en toda la página.

---

## 8. Imagen y dirección de arte

- **Producto aislado, cinematográfico, sobre negro.** Recortes cerrados de rines, pinzas de freno, pintura con reflejo, espuma activa, manos con microfibra. Alto contraste, sin saturación exagerada.
- **Escenarios oscuros:** fondo negro puro `#000` detrás del producto, sin degradados. Los bordes del carro se disuelven en el negro.
- **Antes/después:** misma toma, misma luz, mismo ángulo.
- **Evitar:** stock genérico, filtros saturados, personas posando, collages, texto sobre zonas claras de la foto.
- **Si no hay fotos propias:** placeholders `#1d1d1f` con la proporción correcta y `TODO: foto real`.
- **Formatos:** hero 16:9 / 9:16 mobile; tiles 4:3 o 1:1; galería mixta. AVIF/WebP con `srcset`, `aspect-ratio` fijo, `alt` descriptivo.
- **Iconografía:** trazo lineal 1.5px, 24px, monocroma (`polar` sobre oscuro, `ink` sobre claro). Librería sugerida: Lucide.

---

## 9. Movimiento

- **Filosofía:** mecánico y sobrio (UI) + lento y cinematográfico (imagen).
- Hover/foco/toggles: `0.2s cubic-bezier(0.4, 0, 0.2, 1)` en color, fondo y borde.
- Revelado al scroll: `opacity 0→1` + `translateY(16px→0)`, 0.6s, un solo disparo, stagger 60ms en grids.
- Hero: `scale 1 → 1.03` en 10s sobre la imagen del vehículo.
- Cambio de servicio en el close-look: fundido 0.3s.
- Prohibido: parallax agresivo, resortes, rebotes, 3D, autoplay con sonido.
- **`prefers-reduced-motion: reduce`** → desactivar todo lo anterior salvo cambios de color instantáneos.

---

## 10. Voz y contenido

- **Tono:** claro, técnico y cercano; nunca pomposo ni alarmista. Tuteo por defecto (configurable a "usted").
- **Fórmulas:** beneficio concreto primero (precio claro, garantía, tiempo), detalle técnico después.
- **Evitar:** superlativos vacíos ("el mejor taller del mundo"), jerga innecesaria, mayúsculas fuera de eyebrows/mono, urgencias falsas.
- **CTAs consistentes:** `Cotizar por WhatsApp` (principal), `Ver servicios`, `Cómo llegar`.

---

## 11. Accesibilidad, rendimiento y SEO

**Accesibilidad (WCAG 2.2 AA)**
- Contraste ≥ 4.5:1 para texto normal. Verde y azul de enlace solo en las superficies indicadas.
- Áreas táctiles ≥ 44×44px; foco visible; orden de tabulación lógico.
- HTML semántico: `header`, `nav`, `main`, `section[aria-labelledby]`, `footer`; un solo `h1`.
- Slider antes/después, acordeón, menú móvil y carrusel operables por teclado con `aria-*` correctos.
- `alt` descriptivo: "Pinza de freno roja sobre disco ventilado recién rectificado".

**Rendimiento**
- LCP < 2.5s, CLS < 0.1, INP < 200ms. Hero con `fetchpriority="high"`.
- Imágenes AVIF/WebP + `srcset`; mapa y galería cargados de forma diferida (`IntersectionObserver`).
- JS mínimo; sin librerías de animación pesadas.

**SEO local**
- `<title>`: `[Negocio] | Taller y detallado automotriz en [Ciudad]`.
- Meta description 150–160 caracteres con CTA. Open Graph + Twitter Card 1200×630.
- JSON-LD `AutoRepair`/`LocalBusiness` y `FAQPage`. `lang="es-CO"`, `canonical`, `sitemap.xml`, `robots.txt`.
- Eventos de analítica: `click_whatsapp`, `submit_form`, `quote_started`, `quote_sent`, `click_directions`, `click_call`.

---

## 12. Checklist final para Claude Code

- [ ] Tokens cargados una sola vez; ningún color/radio/sombra hardcodeado fuera de ellos.
- [ ] Ritmo de fondos correcto: negro → carbon → negro → crema → taupe → carbon → footer taupe.
- [ ] Titulares: 600 sobre oscuro, 300 sobre claro; ningún peso ≥ 700.
- [ ] Un solo botón azul visible por pantalla; botones sobre claro en negro.
- [ ] Todos los botones, chips y tags en pill (9999px); tiles en 28px.
- [ ] Sin sombras en oscuro ni en tiles; la sombra de WhatsApp es la única difusa.
- [ ] Sin gradientes salvo el orbe opcional.
- [ ] Dirección, horario, estado "Abierto" y botón de WhatsApp visibles sin scroll.
- [ ] Cotizador funcional con mensaje prellenado a WhatsApp.
- [ ] Formulario con validación, honeypot, estados y fallback a WhatsApp.
- [ ] Todo lo específico del negocio vive en `config/site.js` (plantilla reutilizable).
- [ ] Lighthouse móvil: Performance ≥ 90, Accesibilidad ≥ 95, SEO ≥ 95.
- [ ] Probado en 360px, 768px, 1024px y 1440px.

---

## 13. Tokens (copiar tal cual)

### 13.1 CSS Custom Properties

```css
:root {
  /* Superficies claras */
  --color-eggshell: #fdfcfc;
  --color-taupe: #f5f3f1;
  --color-stone: #ebe8e4;

  /* Texto sobre claro */
  --color-ink: #000000;
  --color-graphite: #44403b;
  --color-smoke: #777169;
  --color-ash: #a59f97;

  /* Superficies oscuras */
  --color-black: #000000;
  --color-carbon: #111111;
  --color-charcoal: #333336;

  /* Texto sobre oscuro */
  --color-polar: #f5f5f7;
  --color-steel: #86868b;
  --color-divider: #6e6e73;
  --color-glyph: #cccccc;

  /* Señales */
  --color-purchase: #0071e3;   /* único relleno cromático: CTA sobre oscuro */
  --color-link: #0066cc;       /* solo sobre claro */
  --color-metric: #00d959;     /* solo sobre oscuro */
  --color-ember: #ff4704;
  --color-ember-black: #311400;
  --color-rust: #b64400;
  --color-wa: #25d366;         /* excepción funcional */

  /* Tipografía */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  --text-hero-display: clamp(44px, 7vw, 72px);        --leading-hero-display: 1.06;   --tracking-hero-display: -0.01em;
  --text-section-display: clamp(32px, 4.5vw, 56px);   --leading-section-display: 1.08; --tracking-section-display: -0.01em;
  --text-heading-light: clamp(32px, 4vw, 48px);       --leading-heading-light: 1.1;   --tracking-heading-light: -0.02em;
  --text-heading-light-sm: clamp(26px, 3vw, 36px);    --leading-heading-light-sm: 1.15; --tracking-heading-light-sm: -0.02em;
  --text-metric: clamp(36px, 5vw, 48px);              --leading-metric: 1;            --tracking-metric: -0.01em;
  --text-subheading: 20px;   --leading-subheading: 1.35;
  --text-body: 16px;         --leading-body: 1.5;
  --text-body-sm: 14px;      --leading-body-sm: 1.5;
  --text-caption: 12px;      --leading-caption: 1.4;
  --text-mono-label: 13px;   --leading-mono-label: 1.4;   --tracking-mono-label: 0.02em;

  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Espaciado (base 4px) */
  --spacing-4: 4px;   --spacing-8: 8px;   --spacing-12: 12px; --spacing-16: 16px;
  --spacing-20: 20px; --spacing-24: 24px; --spacing-28: 28px; --spacing-32: 32px;
  --spacing-40: 40px; --spacing-48: 48px; --spacing-56: 56px; --spacing-64: 64px;
  --spacing-72: 72px; --spacing-96: 96px; --spacing-120: 120px;

  /* Layout */
  --page-max: 1280px;
  --gutter: 64px;
  --section-gap: 120px;
  --tile-gap: 24px;
  --card-padding: 32px;

  /* Radios */
  --radius-pill: 9999px;
  --radius-tile: 28px;
  --radius-card: 20px;
  --radius-card-lg: 24px;
  --radius-chip-dark: 36px;
  --radius-input: 10px;
  --radius-badge: 5px;

  /* Elevación */
  --shadow-whisper: 0 0 1px rgba(0,0,0,.4), 0 1px 1px rgba(0,0,0,.04), 0 2px 4px rgba(0,0,0,.04);
  --shadow-wa: 0 8px 24px rgba(0,0,0,.35);

  /* Movimiento */
  --ease-ui: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-ui: 0.2s;
  --dur-reveal: 0.6s;
}

@media (max-width: 1023px) { :root { --gutter: 32px; --section-gap: 80px; } }
@media (max-width: 639px)  { :root { --gutter: 20px; --section-gap: 64px; --tile-gap: 16px; --card-padding: 24px; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 13.2 Tailwind v4

```css
@theme {
  --color-eggshell: #fdfcfc;
  --color-taupe: #f5f3f1;
  --color-stone: #ebe8e4;
  --color-ink: #000000;
  --color-graphite: #44403b;
  --color-smoke: #777169;
  --color-ash: #a59f97;
  --color-black: #000000;
  --color-carbon: #111111;
  --color-charcoal: #333336;
  --color-polar: #f5f5f7;
  --color-steel: #86868b;
  --color-divider: #6e6e73;
  --color-glyph: #cccccc;
  --color-purchase: #0071e3;
  --color-link: #0066cc;
  --color-metric: #00d959;
  --color-ember: #ff4704;
  --color-ember-black: #311400;
  --color-rust: #b64400;
  --color-wa: #25d366;

  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;

  --radius-pill: 9999px;
  --radius-tile: 28px;
  --radius-card: 20px;
  --radius-card-lg: 24px;
  --radius-input: 10px;
  --radius-badge: 5px;

  --shadow-whisper: 0 0 1px rgba(0,0,0,.4), 0 1px 1px rgba(0,0,0,.04), 0 2px 4px rgba(0,0,0,.04);
  --shadow-wa: 0 8px 24px rgba(0,0,0,.35);
}
```

### 13.3 Snippets de referencia

```css
/* Botón primario sobre oscuro */
.on-dark .btn-primary { background: var(--color-purchase); color: #fff;
  height: 48px; padding: 0 24px; border-radius: var(--radius-pill);
  font: 500 16px/1 var(--font-sans);
  transition: background-color var(--dur-ui) var(--ease-ui); }

/* Botón primario sobre claro */
.btn-primary { background: var(--color-ink); color: var(--color-eggshell);
  height: 48px; padding: 0 24px; border-radius: var(--radius-pill);
  font: 500 16px/1 var(--font-sans); }

/* Botón secundario sobre oscuro / claro */
.on-dark .btn-secondary { background: rgba(66,66,69,.72); color: rgba(255,255,255,.8);
  height: 48px; padding: 0 24px; border-radius: var(--radius-pill); }
.btn-secondary { background: var(--color-eggshell); color: var(--color-ink);
  border: 1px solid #e5e5e5; height: 48px; padding: 0 24px; border-radius: var(--radius-pill); }

/* Titulares */
.on-dark h1, .on-dark h2 { font-family: var(--font-sans); font-weight: 600; color: var(--color-polar); }
.h-light { font-family: var(--font-sans); font-weight: 300; letter-spacing: var(--tracking-heading-light);
  font-size: var(--text-heading-light); line-height: var(--leading-heading-light); color: var(--color-ink); }

/* Eyebrow / etiqueta técnica */
.mono-label { font: 400 13px/1.4 var(--font-mono); letter-spacing: .02em; text-transform: uppercase; }

/* Tile de medios oscuro */
.tile-media { background: var(--color-black); border-radius: var(--radius-tile); overflow: hidden; }

/* Tarjeta taupe */
.card-taupe { background: var(--color-taupe); border-radius: var(--radius-card); padding: var(--card-padding); }

/* Chip selector sobre oscuro */
.chip-dark { background: rgba(66,66,69,.72); color: rgba(255,255,255,.8);
  border-radius: var(--radius-chip-dark); padding: 12px 20px; }
.chip-dark[aria-pressed="true"] { background: var(--color-charcoal); color: var(--color-polar); }

/* WhatsApp flotante */
.wa-float { position: fixed; right: 20px; bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  width: 60px; height: 60px; border-radius: var(--radius-pill); background: var(--color-wa);
  display: grid; place-items: center; box-shadow: var(--shadow-wa); z-index: 50; }
```

---

## 14. Do's & Don'ts (resumen)

### Do
- Alternar escenarios negros (producto) y páginas crema (decisión y confianza).
- Titulares 600 sobre oscuro y 300 sobre claro, siempre con tracking apretado.
- Pills en todos los controles; tiles de 28px para medios.
- Un único botón azul por pantalla visible; el resto en negro, outline o charcoal.
- Verde solo para métricas sobre oscuro; ember solo como brillo, estado o badge.
- Dirección, horario, precio y WhatsApp siempre a la vista.
- Hairlines en lugar de sombras; espacio generoso (96–120px entre secciones).

### Don't
- No botones rellenos de otro color que no sea `purchase`, `ink` o `charcoal`.
- No gradientes (salvo el orbe), ni scrims sobre fotos, ni sombras en oscuro.
- No peso 300 sobre negro ni pesos ≥ 700 en ningún lado.
- No `#ffffff` puro como fondo; usar `eggshell`.
- No link azul `#0066cc` sobre fondo oscuro.
- No mezclar azul + ember + verde en el mismo componente.
- No cifras, reseñas, logos ni garantías inventados en producción.
- No esquinas < 8px en tarjetas ni botones rectangulares.