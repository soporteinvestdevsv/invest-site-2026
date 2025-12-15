docs/specs/P00_PRD.md

# P00 — Technical Product Requirements Document (PRD)
**Project:** INVEST Investment Site (Next.js App Router)  
**Primary domain:** investinelsalvador.gob.sv  
**Status:** Draft (v0.1)

## 1) Overview
This project delivers a modern, multilingual public website for INVEST with clear user journeys and maintainable content operations. The implementation uses Next.js App Router with locale-aware routing (`app/(routes)/[locale]/...`) and a headless CMS integration (WordPress) for dynamic content collections.

**Authoritative routing inventory (as-is):** `A00_AsIs_AppTree.*`  
**Authoritative components inventory (as-is):** `B00_AsIs_ComponentsTree.*`  
**Authoritative lib inventory (as-is):** `B01_AsIs_LibTree.*`

## 2) Goals
- Provide clear pathways for core audiences (invest, explore sectors, access services/support, contact INVEST).
- Support multilingual browsing via locale segment routing.
- Enable editorial publishing for dynamic collections (news, events, reports) via headless WordPress.
- Establish privacy compliance baseline (cookie consent capture + script gating).
- Provide SEO-ready metadata/sitemap/robots for discoverability.

## 3) Non-goals (for initial scope)
- Full marketing automation/CRM implementation (capture only; routing/CRM integration TBD).
- Authenticated user portals (no login experience in v1).
- E-commerce or payment flows.

## 4) Primary audiences (personas)
- **Investor:** exploring why El Salvador, sectors, incentives/services, and how to invest.
- **Company/Media:** browsing news, events, media assets, reports/insights.
- **General public / stakeholders:** governance/team, legal pages, contact channels.

(Details to be formalized in `A01_IA_Sitemap.*`.)

## 5) Information architecture (current scaffold)
See: `A00_AsIs_AppTree.*`  
Core sections present:
- About (governance, team)
- Why El Salvador (connectivity, macroeconomy, quality of life, talent)
- Why invest (incentives, services)
- How to invest (steps, requirements, FAQs)
- Sectors (index + sector detail)
- Success stories (index + story detail)
- News (index + article detail)
- Events (index + event detail)
- Insights/Reports (index + report detail)
- Media (downloads, gallery)
- Contact (invest support)
- Legal (accessibility, cookies, privacy, terms)

## 6) Functional requirements (FR)
**Routing & i18n**
- **FR-001:** All public routes must be locale-aware via `/{locale}/...` using App Router segment `[locale]`. (Spec: `C01_i18n_Locales.*`)
- **FR-002:** Locale layout must apply consistent global structure (header/footer) for all locale routes. (Spec: `A02_UI_LayoutComponents.*`)

**Content & CMS**
- **FR-010:** Dynamic collections must render index + detail pages for: news, events, reports, sectors, success stories. (Spec: `D01_WordPress_Headless.*`)
- **FR-011:** Pages must handle missing/invalid slugs with appropriate 404 behavior. (Spec: `G01_AcceptanceCriteria.*`)

**Privacy & consent**
- **FR-020:** Provide a cookie consent banner that persists user choice and supports acceptance/rejection (and/or granular categories if required). (Spec: `E03_Cookies_Consent.*`)
- **FR-021:** Consent must gate non-essential scripts using a dedicated consent script loader component. (Spec: `E03_Cookies_Consent.*`)

**Contact**
- **FR-030:** Provide a contact submission endpoint (`/api/contact`) and a contact page UI. (Spec: `D03_Forms_Leads.*` or `P00` appendix until created)
- **FR-031:** Validate inputs, return clear success/error states, and prevent abuse (rate limiting / CAPTCHA TBD). (Spec: `E01_Security_Baseline.*`)

**Revalidation**
- **FR-040:** Support content refresh via `/api/revalidate` for CMS-triggered updates (ISR/Tag revalidation strategy TBD). (Spec: `D01_WordPress_Headless.*`)

## 7) Non-functional requirements (NFR)
- **NFR-001 Performance:** Meet defined Core Web Vitals targets (exact thresholds TBD). (Spec: `H01_SEO_Metadata.*`)
- **NFR-002 Accessibility:** Meet an agreed accessibility baseline (target WCAG level TBD). (Spec: `A04_UI_Accessibility.*`)
- **NFR-003 Security:** Apply baseline security headers and safe API handling (CORS, validation, secrets). (Spec: `E01_Security_Baseline.*`)
- **NFR-004 Reliability:** CMS failures must degrade gracefully (fallback UI + error boundaries). (Spec: `B02_Nextjs_AppRouter.*`)
- **NFR-005 Maintainability:** Keep content concerns in CMS and UI concerns in components; avoid duplicating content across code and CMS. (Spec: `C02_ContentModel_PageTypes.*`)

## 8) System design constraints (derived from scaffold)
- App Router structure exists with `(routes)` group and `[locale]` segment.
- `components/layout` contains Header/Footer.
- `components/privacy` + `lib/privacy` implement consent plumbing.
- `lib/wp/*` implements headless WordPress client and query/mapping layer.
- `app/robots.ts` and `app/sitemap.ts` exist (SEO baseline present; must be validated).

## 9) Acceptance criteria (high level)
- Locale switching works and all pages resolve under each supported locale. (`C01`)
- Cookie consent persists and gates non-essential scripts correctly. (`E03`)
- Dynamic routes resolve for valid slugs and return 404 for invalid slugs. (`D01`, `G01`)
- Contact endpoint accepts valid submissions and rejects invalid ones. (`D03`, `E01`)
- Sitemap/robots generate correctly for locale routes and dynamic collections (strategy TBD). (`H01`)

## 10) Open questions (must be resolved in supporting specs)
- Supported locales and routing behavior (prefix always vs default locale without prefix). (`C01`)
- Translation workflow (files vs CMS vs external translation tool). (`C01`, `C02`)
- CMS content model: exact WP post types/taxonomies for each collection. (`D01`)
- Media handling: downloads/gallery source of truth (WP vs external DAM). (`D02`)
- Form delivery: where contact leads go (email, CRM, DB). (`D03`)
- Revalidation strategy (ISR vs tag revalidation) and auth for `/api/revalidate`. (`D01`, `E01`)
