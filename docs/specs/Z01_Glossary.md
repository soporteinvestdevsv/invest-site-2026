docs/specs/Z01_Glossary.md

# Z01 — Glossary
**Status:** Draft (v0.1)  
**Scope:** Shared definitions for terms used across the specs and codebase.

## Terms

### App Router
Next.js routing system using the `app/` directory with layouts, nested routes, and server/client components.

### As-Is Inventory
A snapshot of the current scaffold structure (routes/components/lib/docs) captured to ground future decisions and prevent drift.

### Canonical URL
The preferred URL for indexing (SEO). In this project, expected to be locale-scoped: `/{locale}/...` (see `C01`, `H01`).

### Collection
A CMS-driven content type that has an index page and detail pages (e.g., News, Events, Reports) (see `D01`).

### Consent Cookie
A cookie that stores the user’s consent choices for cookies/tracking (schema defined in `E03`).

### Consent Gating
Conditionally loading non-essential scripts only after user consent is granted (see `E03`).

### CSP (Content Security Policy)
A security header that controls what sources of scripts/images/etc. are allowed. Must align with consent gating and required third-party scripts (see `E01`, `H01`).

### Default Locale
The primary language/locale of the site used when no other locale is chosen. Default-locale URL policy is a decision in `C01`.

### DoD (Definition of Done)
Release/readiness criteria describing what qualifies as “done” for features and releases (see `G01`).

### ISR (Incremental Static Regeneration)
A Next.js mechanism to update static pages over time using `revalidate`. Revalidation strategy for CMS content is defined in `D01`.

### LLM Context Store
The `docs/specs/` directory is treated as authoritative context for LLM-assisted coding, with `.tok.json` files optimized for retrieval (see `MANIFEST`).

### Locale Segment
The route parameter `[locale]` in `app/(routes)/[locale]/...` that determines language/locale context (see `A00`, `C01`).

### PRD / PRD (Product Requirements Document)
Master document describing product scope and requirements. In this project: `P00_PRD.*`.

### Revalidation
Mechanism to refresh cached/ISR content, typically via `/api/revalidate` with a shared secret (see `D01`, `E01`).

### Source of Truth
The authoritative location where a given piece of content or requirement is defined (repo vs CMS vs external) (see `C00`).

### TOK / .tok.json
“Token-oriented object notation”: a structured JSON representation of a spec used for LLM context loading and cross-referencing (see `MANIFEST`).

### WP (WordPress) Headless
Using WordPress as a CMS while rendering the site in Next.js via API requests (see `D01`).

## Open additions
Add terms as they appear in requirements, architecture decisions, and implementation.
