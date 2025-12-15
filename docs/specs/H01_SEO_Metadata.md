docs/specs/H01_SEO_Metadata.md

# H01 — SEO, Metadata, Sitemap & Robots
**Status:** Draft (v0.1)  
**Scope:** SEO foundations (metadata, indexing controls, sitemap strategy), performance targets, and analytics considerations (consent-aware).

## 1) Current scaffold facts (as-is)
- `app/robots.ts` exists (robots rules are implemented at App Router level).
- `app/sitemap.ts` exists (sitemap is implemented at App Router level).
- `lib/seo/` folder exists but is currently empty (helpers TBD).
(See `A00_AsIs_AppTree.*` and `B01_AsIs_LibTree.*`.)

## 2) Objectives
- Ensure correct indexing/discoverability for locale routes and dynamic content collections.
- Provide consistent metadata (title/description/canonical/OG/Twitter) per page type.
- Generate sitemaps that include:
  - static pages
  - collection index pages
  - collection detail pages (dynamic slugs)
- Ensure analytics and non-essential tags comply with consent gating (see `E03_Cookies_Consent.*`).

## 3) URL policy (SEO)
- Canonical public URLs are locale-scoped: `/{locale}/...` (see `C01_i18n_Locales.*`).
- Canonical behavior: **Decision Z02-20251215-02:** Always use locale prefix (e.g. `/{default_locale}/...`).
- Canonical tags must align with chosen default-locale policy.

## 4) Metadata requirements (global)
### 4.1 Page-level metadata
For each page, define:
- `title` (localized)
- `description` (localized)
- `canonical` URL
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`)
- Twitter card metadata

Implementation expectation:
- Use Next.js Metadata API (`generateMetadata`) per page type where needed.

### 4.2 Structured data (optional, TBD)
- Organization schema (site-wide)
- Article schema for news/reports
- Event schema for events
- Breadcrumb schema for deeper pages

## 5) Sitemap strategy
### 5.1 What must be included
Include in sitemap:
- Static pages from `A01_IA_Sitemap.*`
- Collection index pages:
  - `/news`, `/events`, `/insights/reports`, `/sectors`, `/success-stories`
- Collection detail pages for valid slugs:
  - news/events/reports by `[slug]`
  - sectors by `[sectorSlug]`
  - success stories by `[storySlug]`

### 5.2 Data sources for sitemap generation
- Static routes: Use Next.js App Router `sitemap.ts` generation.
- Dynamic routes (news, events) must be fetched from CMS during sitemap build. Data source: `D01_WordPress_Headless.*`
- Locales list: from `C01_i18n_Locales.*`

### 5.3 Frequency and freshness
**TBD**:
- Define changefreq/priority conventions (if used).
- Define sitemap regeneration/revalidation approach aligned to ISR/tag revalidation.

## 6) Robots strategy
- Define index/noindex rules (environment-aware).
- **Policy:**
  - Production: `User-agent: * Allow: /`
  - Non-prod/staging: `User-agent: * Disallow: /`

Robots must reflect locale URL policy and must not block required assets.

## 7) Performance requirements (SEO-adjacent)
### 7.1 Performance targets (Core Web Vitals)
- **LCP** (Largest Contentful Paint): `< 2.5s`
- **CLS** (Cumulative Layout Shift): `< 0.1`
- **INP** (Interaction to Next Paint): `< 200ms`
- **Lighthouse Score:** `> 90` (Performance, SEO, Accessibility, Best Practices)
- Image optimization requirements
- Avoid layout shift from CookieBanner and header nav (see `A02_UI_LayoutComponents.*` and `E03_Cookies_Consent.*`)

## 8) Analytics (consent-aware)
- Any analytics/marketing tags must be gated by consent (see `E03`).
- Define analytics platform(s) and event taxonomy in `H02_Analytics_Events.*` (to be created).
- **Platform:** Google Analytics 4 (GA4) via Google Tag Manager (GTM).
- **Consent Mode:** Must use **Consent Mode v2** (Advanced).
  - Default: `denied`.
  - Update on `INVEST_CONSENT` grant.

## 9) Requirements
- **H01-FR-001:** Implement correct robots rules via `app/robots.ts` (env-aware).
- **H01-FR-002:** Implement sitemap via `app/sitemap.ts` including static + dynamic routes + locales.
- **H01-FR-003:** Provide localized metadata per page type with correct canonical URLs.
- **H01-NFR-001:** Meet agreed Core Web Vitals targets (values TBD).
- **H01-NFR-002:** Consent-gate analytics and non-essential tags.

## 10) Open questions
- None.
