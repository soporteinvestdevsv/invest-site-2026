docs/specs/C01_i18n_Locales.md

# C01 — i18n, Locales & Routing Strategy
**Status:** Draft (v0.1)  
**Scope:** Locale routing behavior, supported locales, translation source-of-truth, fallback rules, and integration expectations across pages and CMS content.

## 1) Current scaffold facts (as-is)
- Locale segment exists: `app/(routes)/[locale]/...` (see `A00_AsIs_AppTree.*`)
- i18n config exists: `lib/i18n/config.ts` (see `B01_AsIs_LibTree.*`)

## 2) Objectives
- Ensure every public page is accessible under a locale-prefixed URL.
- Define a deterministic locale resolution and fallback strategy.
- Define where translations live and how they are loaded (code vs CMS vs external pipeline).
- Ensure dynamic content (news/events/reports/etc.) can be served per locale (strategy TBD).

## 3) Supported locales
**TBD (must be confirmed from `lib/i18n/config.ts` and product decision).**

Proposed placeholders (replace with actual):
- Default locale: `TBD` (e.g., `en`)
- Supported locales: `TBD` (e.g., `["en","es"]`)

## 4) URL and routing rules
### 4.1 Canonical URL pattern
- Canonical: `/{locale}/...` for all public pages (current folder structure enforces this).

### 4.2 Invalid locale handling
**TBD** (choose one):
- Option A: return `404` for unsupported locales
- Option B: redirect unsupported locales to default locale
- Option C: infer best locale via `Accept-Language` then redirect

### 4.3 Default locale behavior
**Decision needed**:
- Option A (simple): always require locale prefix (no special-case default locale)
- Option B (marketing-friendly): default locale without prefix, and redirect to prefixed paths for non-default locales  
  (Note: current scaffold uses `[locale]` segment for all pages; Option B would require additional routing rules.)

## 5) Translation architecture
### 5.1 Translation source of truth
**TBD** (choose one primary):
- Code-based dictionaries (JSON/TS per locale)
- CMS-managed strings/pages
- External translation management system (TMS) synced into repo/CMS

### 5.2 Loading strategy (Next.js)
**TBD** (implementation detail):
- Server-side load per request/route
- Static build-time generation per locale (SSG)
- Hybrid with ISR/revalidation for CMS content

### 5.3 Fallback rules
- Missing key behavior: `TBD` (show key, fallback to default locale, or show empty)
- Fallback locale: `TBD` (typically default locale)

## 6) CMS localization expectations (Headless WP)
Dynamic collections exist with slug routes (see `A00_AsIs_AppTree.*`):
- news, events, reports, sectors, success-stories

**TBD**:
- Are these translated per locale in WordPress (WPML/Polylang/custom)?
- Are slugs stable across locales or locale-specific?
- How is locale passed to WP queries (endpoint, header, query param, separate sites)?

(See `D01_WordPress_Headless.*`.)

## 7) UI requirements for locale switching
- Locale switcher must preserve path where possible (same page in another locale).
- If translation for a target locale does not exist:
  - Behavior: `TBD` (fallback to default locale, hide locale option, or show untranslated page with warning)
- Locale switcher placement: `Header` (see `components/layout/Header.tsx` and `A02_UI_LayoutComponents.*`)

## 8) Requirements
- **C01-FR-001:** Locale list and default locale must be defined in `lib/i18n/config.ts`.
- **C01-FR-002:** Locale segment must be validated on every request to locale routes.
- **C01-FR-003:** Locale selection must be persisted or consistently derived (cookie/header/URL) — **URL is authoritative**.
- **C01-NFR-001:** Translation loading must not materially degrade performance (caching strategy TBD).

## 9) Open questions
- What are the supported locales and default locale (confirm)?
- Do we require locale prefix for default locale?
- Where do translations live (repo vs CMS vs external)?
- How is WP content localized and queried per locale?
