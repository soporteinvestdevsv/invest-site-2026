docs/specs/C01_i18n_Locales.md

# C01 — i18n, Locales & Routing Strategy
**Status:** Draft (v0.2)  
**Scope:** Locale routing behavior, supported locales, translation source-of-truth, fallback rules, and integration expectations across pages and CMS content.

## 1) Current scaffold facts (as-is)
- Locale segment exists: `app/(routes)/[locale]/...` (see `A00_AsIs_AppTree.*`)
- i18n config exists and is implemented in: `lib/i18n/config.ts` (see `B01_AsIs_LibTree.*`)
  - `locales = ['en','es']`
  - `defaultLocale = 'en'`
- Middleware exists at repo root: `middleware.ts` (as-is locale prefix enforcement; see section 4.2)
- Locale layout mounts the global shell and passes locale into key components (see `app/(routes)/[locale]/layout.tsx`):
  - `Header(locale)`, `CookieBanner(locale)`, `Footer(locale)`
- Root layout currently sets `<html lang="en">` (hard-coded) in `app/layout.tsx (not locale-driven yet).

## 2) Objectives
- Ensure every public page is accessible under a locale-prefixed URL.
- Define deterministic locale resolution and fallback behavior.
- Define where translations live and how they are loaded (code vs CMS vs external pipeline).
- Ensure dynamic content (news/events/reports/etc.) can be served per locale (strategy TBD).

## 3) Supported locales (as-is)
- Default locale: `en`
- Supported locales: `["en", "es"]`

## 4) URL and routing rules
### 4.1 Canonical URL pattern (as-is)
- Canonical: `/{locale}/...` for all public pages.

### 4.2 Locale prefix enforcement (as-is, implemented)
**Implementation:** `middleware.ts`
- If pathname already starts with `/{en}` or `/{es}` (or equals `/{en}` / `/{es}`), request proceeds.
- Otherwise, request redirects to: `/{defaultLocale}{pathname}` (default is `en`).

**By design in code:** This ensures `/about` becomes `/en/about`, and `/` becomes `/en/`.

### 4.3 Invalid/unsupported locale segments (as-is edge case)
Current middleware only recognizes `en` and `es` prefixes. Any other locale-like prefix is treated as “no locale present” and is redirected by prefixing default locale **without removing** the unknown segment.

Example:
- `/fr/about` → `/en/fr/about` (as-is)

**Open:** Decide desired behavior for unsupported locale-like prefixes:
- Option A: redirect `/fr/about` → `/en/about` (strip invalid locale segment)
- Option B: return 404
- Option C: redirect to `/{defaultLocale}` root

(Record decision in `Z02` and update middleware accordingly.)

### 4.4 Paths excluded from locale redirect (as-is)
Middleware bypasses:
- `/_next/*`
- `/api/*`
- `/favicon.ico`
- `/robots.txt`
- `/sitemap.xml`

## 5) Translation architecture
### 5.1 Translation source of truth (current vs target)
**As-is:** Some UI strings are hard-coded in components (e.g., Header nav labels).  
**Target:** 
- **Code-based dictionaries** for UI microcopy and static labels.
- **CMS (WordPress)** for dynamic content and long-form pages.

### 5.2 Fallback rules (planned)
- Missing UI key: fallback to `en`.
- Dynamic content fallback: TBD (depends on WP localization model).

## 6) CMS localization expectations (Headless WP) (planned)
Dynamic collections exist with slug routes (see `A00_AsIs_AppTree.*`):
- news, events, reports, sectors, success-stories

**Important alignment note:**
- Current app route segments (and Header hrefs) are not localized (same slugs under both `/{en}` and `/{es}`).
- If “localized slugs” are adopted later, the app route structure and href generation must change and be logged in `Z02`.

## 7) UI requirements for locale switching
- Locale switcher should preserve current path where possible.
- As-is Header behavior: rewrites locale segment in pathname (best-effort) with fallback to `/{targetLocale}` (see `A04_UI_NavigationHeader.*`).

## 8) Requirements
- **C01-FR-001 (Implemented):** Locale list and default locale are defined in `lib/i18n/config.ts`.
- **C01-FR-002 (Implemented):** Non-locale paths redirect to `/{defaultLocale}{pathname}` via middleware.
- **C01-FR-003:** Locale switcher preserves path where possible; fallback to locale root when mapping fails.
- **C01-FR-004:** Define and implement explicit behavior for unsupported locale-like prefixes (e.g., `/fr/*`).
- **C01-NFR-001:** Translation loading must be performant; caching strategy defined once i18n library is selected.

## 9) Open questions (updated)
- What is the intended behavior for unsupported locale-like prefixes (strip + redirect vs 404)?
- Should `<html lang>` be locale-driven (current is hard-coded `en`)?
- Where will translation dictionaries live (format + location), and how will components consume them?
- WP localization model and slug policy (shared vs localized) — must align with app routes if changed.
