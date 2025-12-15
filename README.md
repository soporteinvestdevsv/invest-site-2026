# INVEST Investment Site (Next.js) — Project Overview & Documentation Map

This repository contains the next-Iteration of the website for **investinelsalvador.gob.sv**, built with **Next.js (App Router)** and designed to support **multi-language routing** and a **headless CMS** integration.

## Getting started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


This repository contains the iteration of public invest in El Salvador website for **investinelsalvador.gob.sv**, built with **Next.js (App Router)** and designed to support **multi-language routing** and a **headless CMS** integration.

## How to navigate this repo

### 1) Start with specifications (source of truth)
All project requirements, decisions, and implementation guidance live under:

- **`docs/specs/`**

This is the canonical knowledge base for both:
- Humans (readable narrative specs)
- LLMs (token-oriented, structured specs)

Once created, use:
- `docs/specs/MANIFEST.md` for human navigation
- `docs/specs/MANIFEST.tok.json` for LLM navigation

### 2) Then navigate the code
The codebase follows a structured layout consistent with a production Next.js App Router site, including:
- Locale-aware routing (e.g., `app/(routes)/[locale]/...`)
- UI components (including `components/ui` reserved for shadcn/ui)
- Privacy/consent utilities and UI (cookie consent)
- Headless CMS integration utilities (WordPress client placeholders)

If any directory names differ in your current scaffold, treat the above as the intended map and align the implementation to the specs in `docs/specs/`.

---

## Documentation system (humans + LLM)

### File pairing rule
Each spec is maintained in two formats, side-by-side, sharing the same document ID:

- Human-readable: `A01_IA_Sitemap.md`
- LLM-structured: `A01_IA_Sitemap.tok.json`

### Document IDs and domains
Document IDs follow a stable taxonomy:
- `Pxx` PRD / master requirements
- `Axx` UX / IA / UI
- `Bxx` System architecture (Next.js, app router, components)
- `Cxx` Content / i18n / translations
- `Dxx` Integrations (Headless WP, media, forms)
- `Exx` Security / privacy / compliance
- `Fxx` DevOps / environments / delivery
- `Gxx` QA / acceptance / testing
- `Hxx` SEO / analytics / observability
- `Zxx` Glossary / decisions / changelog

Cross-references are explicit (example in `.tok.json`):
- `{"ref":{"doc":"A01","sec":"page_inventory"}}`

---

## How to use the specs (human workflow)

1) Open `docs/specs/MANIFEST.md` (table of contents).
2) Read `P00_PRD.md` first (overall scope, goals, requirements).
3) Follow links to supporting specs (A/B/C/D/E/F/G/H/Z docs).
4) When changing scope, update:
   - the relevant `.md` spec (human)
   - the matching `.tok.json` spec (LLM/tooling)

---

## How to use the specs (LLM workflow)

When using an LLM to answer questions or generate code for this repo:

1) Load **`docs/specs/MANIFEST.tok.json`** first.
2) Load **`P00_PRD.tok.json`** next.
3) Only then load the minimum additional referenced docs needed to answer the task.
4) Prefer `.tok.json` for precise requirements; use `.md` for narrative context.
5) When uncertain, search within **`docs/specs/`** by:
   - document ID (e.g., `E03`, `D01`)
   - section keys (e.g., `cookie_schema`, `routing`, `rendering`)
   - requirement IDs (e.g., `FR-001`, `NFR-002`)

LLM instruction (copy/paste):
> “Use `docs/specs/` as the authoritative context store. Start from `MANIFEST.tok.json`, then follow `ref.doc` pointers to load only the necessary `.tok.json` and `.md` files.”

---

## Development quick start (high-level)

Typical workflow:
1) Install dependencies (use the project’s package manager and lockfile).
2) Run the dev server.
3) Implement features by following `docs/specs/` requirements and acceptance criteria.

(Exact commands will be documented under `docs/specs/Fxx_*` once created.)

---

## Contribution rules (non-negotiable)

- **Specs drive code**: if behavior changes, specs must change first (or in the same PR).
- **No orphan decisions**: key decisions must be recorded in `Z02_Decisions_Log.*`.
- **Keep pairs in sync**: every `*.md` spec must have a matching `*.tok.json` spec.

---

## Next documentation to create (coming next)

These files will be created under `docs/specs/`:
- `MANIFEST.md` and `MANIFEST.tok.json`
- `P00_PRD.md` and `P00_PRD.tok.json`
- Supporting specs `Axx/Bxx/Cxx/Dxx/Exx/Fxx/Gxx/Hxx/Zxx`

Until those exist, treat this README as the single entry point and the contract for how documentation will be structured.


### Spanish ###

## Cómo navegar este repositorio

### 1) Empieza por las especificaciones (fuente de verdad)

Todos los requisitos del proyecto, decisiones y guía de implementación viven en:

- **`docs/specs/`**

Este es el conocimiento canónico para:
- **Humanos** (especificaciones narrativas y legibles)
- **LLMs** (especificaciones estructuradas y orientadas a tokens)

Una vez creados, usa:
- **`docs/specs/MANIFEST.md`** → navegación humana
- **`docs/specs/MANIFEST.tok.json`** → navegación LLM

---

### 2) Luego navega el código

La base de código sigue una estructura consistente con un sitio de producción en **Next.js App Router**, incluyendo:

- Ruteo con reconocimiento de locale (ej.: `app/(routes)/[locale]/...`)
- Componentes de UI (incluye `components/ui`, reservado para **shadcn/ui**)
- Utilidades y UI de privacidad/consentimiento (consentimiento de cookies)
- Utilidades de integración con CMS headless (placeholders para cliente de WordPress)

Si algunos nombres de directorios difieren en tu scaffold actual, toma lo anterior como el **mapa pretendido** y alinea la implementación a las especificaciones en `docs/specs/`.

---

## Sistema de documentación (humanos + LLM)

### Regla de “pares” de archivos

Cada especificación se mantiene en dos formatos, lado a lado, compartiendo el mismo **ID de documento**:

- Legible para humanos: `A01_IA_Sitemap.md`
- Estructurado para LLM: `A01_IA_Sitemap.tok.json`

---

### IDs de documentos y dominios

Los IDs siguen una taxonomía estable:

- `Pxx` — PRD / requisitos maestros  
- `Axx` — UX / IA / UI  
- `Bxx` — Arquitectura del sistema (Next.js, app router, componentes)  
- `Cxx` — Contenido / i18n / traducciones  
- `Dxx` — Integraciones (Headless WP, media, formularios)  
- `Exx` — Seguridad / privacidad / cumplimiento  
- `Fxx` — DevOps / entornos / entrega  
- `Gxx` — QA / aceptación / pruebas  
- `Hxx` — SEO / analítica / observabilidad  
- `Zxx` — Glosario / decisiones / changelog  

Las referencias cruzadas son explícitas (ejemplo en `.tok.json`):

```json
{"ref":{"doc":"A01","sec":"page_inventory"}}

## Cómo usar las especificaciones (flujo humano)

1. Abre `docs/specs/MANIFEST.md` (tabla de contenidos).
2. Lee primero `P00_PRD.md` (alcance general, objetivos, requisitos).
3. Sigue los enlaces a especificaciones de soporte (docs `A/B/C/D/E/F/G/H/Z`).
4. Cuando cambie el alcance, actualiza:
   - la especificación `.md` correspondiente (humano)
   - la especificación `.tok.json` correspondiente (LLM/herramientas)

---

## Cómo usar las especificaciones (flujo LLM)

Cuando uses un LLM para responder preguntas o generar código para este repo:

1. Carga primero `docs/specs/MANIFEST.tok.json`.
2. Luego carga `P00_PRD.tok.json`.
3. Después, carga únicamente los documentos mínimos adicionales referenciados y necesarios para la tarea.
4. Prefiere `.tok.json` para requisitos precisos; usa `.md` para contexto narrativo.
5. Si hay dudas, busca dentro de `docs/specs/` por:
   - ID de documento (p. ej., `E03`, `D01`)
   - claves de sección (p. ej., `cookie_schema`, `routing`, `rendering`)
   - IDs de requisitos (p. ej., `FR-001`, `NFR-002`)

**Instrucción para LLM (copiar/pegar):**
> “Usa `docs/specs/` como el almacén de contexto autoritativo. Empieza por `MANIFEST.tok.json` y luego sigue los punteros `ref.doc` para cargar solo los archivos `.tok.json` y `.md` necesarios.”

---

## Inicio rápido de desarrollo (alto nivel)

Flujo típico:
1. Instala dependencias (usa el package manager y lockfile del proyecto).
2. Ejecuta el servidor de desarrollo.
3. Implementa funcionalidades siguiendo requisitos y criterios de aceptación en `docs/specs/`.

*(Los comandos exactos se documentarán bajo `docs/specs/Fxx_*` una vez creados.)*

---

## Reglas de contribución (no negociables)

- **Las especificaciones mandan sobre el código**: si cambia el comportamiento, las specs deben cambiar primero (o en el mismo PR).
- **No decisiones huérfanas**: decisiones clave deben registrarse en `Z02_Decisions_Log.*`.
- **Mantener los pares en sincronía**: toda spec `*.md` debe tener su par `*.tok.json`.

---

## Próxima documentación a crear (siguiente paso)

Estos archivos se crearán bajo `docs/specs/`:

- `MANIFEST.md` y `MANIFEST.tok.json`
- `P00_PRD.md` y `P00_PRD.tok.json`
- Especificaciones de soporte `Axx/Bxx/Cxx/Dxx/Exx/Fxx/Gxx/Hxx/Zxx`

Hasta que existan, trata este README como el único punto de entrada y el contrato de cómo se estructurará la documentación.
