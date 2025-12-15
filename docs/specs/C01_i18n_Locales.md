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
- Default locale: `en` (Primary investor audience)
- Supported locales: `["en", "es"]`

## 4) URL and routing rules
### 4.1 Canonical URL pattern
- Canonical: `/{locale}/...` for all public pages (current folder structure enforces this).

### 4.2 Invalid locale handling
**Decision:**
- Return `404` for unsupported locales (no automatic redirect from random paths).
- Root path `/` redirects to `/{default_locale}` (via middleware).

### 4.3 Default locale behavior
**Decision Z02-20251215-02:**
- Use `/{locale}/...` as canonical for ALL pages (including default locale).
- No special "no-prefix" handling for v1.

## 5) Translation architecture
### 5.1 Translation source of truth
**Decision:**
- **Code-based dictionaries** (JSON/TS) for UI microcopy and static labels.
- **CMS (WordPress)** for dynamic content and long-form pages (1:1 post mapping).

### 5.2 Loading strategy (Next.js)
**Implementation:**
- Server-side load per request/route (via `next-intl` or similar).
- Static generation for SSG pages where possible.

### 5.3 Fallback rules
- Missing key behavior: `fallback_to_default` (show English string if Spanish missing).
- Fallback locale: `en`.

## 6) CMS localization expectations (Headless WP)
Dynamic collections exist with slug routes (see `A00_AsIs_AppTree.*`):
- news, events, reports, sectors, success-stories

**Decision Z02-20251215-06:**
- **1:1 mapping:** Each locale has its own WP post/page (Polylang/WPML model).
- **Localized slugs:** Slugs are translated (e.g. `/en/news` and `/es/noticias`).
- **Querying:** Client requests content by locale-specific query or filtered endpoint.

(See `D01_WordPress_Headless.*`.)

## 7) UI requirements for locale switching
- Locale switcher must preserve path where possible (same page in another locale).
- If translation for a target locale does not exist:
  - Behavior: `show_warning` or `hide_option` (context-dependent).
- Locale switcher placement: `Header` (implemented in `A04_UI_NavigationHeader`).

## 8) Requirements
- **C01-FR-001:** Locale list and default locale must be defined in `lib/i18n/config.ts`.
- **C01-FR-002:** Locale segment must be validated on every request to locale routes.
- **C01-FR-003:** Locale selection must be persisted or consistently derived (cookie/header/URL) — **URL is authoritative**.
- **C01-NFR-001:** Translation loading must use server-side caching to prevent per-request latency.

## 9) Open questions
- What are the supported locales and default locale (confirm)?
- Do we require locale prefix for default locale?
- Where do translations live (repo vs CMS vs external)?
- How is WP content localized and queried per locale?
