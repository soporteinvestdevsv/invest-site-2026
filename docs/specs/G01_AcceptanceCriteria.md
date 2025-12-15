docs/specs/G01_AcceptanceCriteria.md

# G01 — Acceptance Criteria & Definition of Done (DoD)
**Status:** Draft (v0.1)  
**Scope:** What “done” means for this project and how acceptance is evaluated across routing, i18n, CMS content, privacy, security, SEO, and operations.

## 1) How to use this document
- Use this as the final gate for feature completion and release readiness.
- Each requirement in `P00_PRD.*` should map to one or more acceptance checks here.
- Where a spec is still TBD, acceptance criteria must be updated once the decision is made.

## 2) Definition of Done (global)
A feature or page is “Done” when:
- It matches the relevant spec(s) and does not introduce regressions.
- It has clear acceptance checks (below) and has been verified in local + staging.
- It includes error handling and empty states where applicable.
- It meets baseline security and privacy constraints.
- It has basic SEO metadata as applicable.
- Any changes to scope/behavior are reflected in specs (`MANIFEST` + affected docs).

## 3) Acceptance checklist (release-level)

### 3.1 Routing & App Shell (A00, A02)
- [ ] All public pages render under `/{locale}/...` without route collisions.
- [ ] `not-found.tsx` renders for unknown routes and invalid slugs.
- [ ] `error.tsx` boundary renders for unexpected runtime errors.
- [ ] Header and Footer render consistently on all locale routes.

### 3.2 i18n & locale behavior (C00, C01)
- [ ] Supported locales list and default locale are implemented and documented.
- [ ] Invalid locale handling matches `C01` decision (404/redirect/infer).
- [ ] Locale switcher exists, is accessible, and preserves path where possible.
- [ ] Missing translation behavior matches `C01` decision (fallback/hide/warn).

### 3.3 CMS collections (D01)
For each collection: News, Events, Reports, Sectors, Success Stories:
- [ ] Index page renders list (with empty state when no content).
- [ ] Detail page renders for valid slug and returns 404 for invalid slug.
- [ ] Fetch failures show a friendly error state (not a blank page).
- [ ] Caching/revalidation strategy is implemented as per `D01` decision.

### 3.4 Consent & privacy UX (E03)
- [ ] CookieBanner appears only when consent is missing/invalid.
- [ ] Consent choice persists (cookie present, correct schema, correct expiry).
- [ ] Non-essential scripts do not load before consent.
- [ ] “Manage cookies” entry point exists and functions as specified.
- [ ] Legal pages exist and are reachable (Cookies/Privacy/Terms/Accessibility).

### 3.5 Security baseline (E01, F01)
- [ ] `/api/revalidate` requires a valid shared secret; invalid requests return 401.
- [ ] `/api/contact` validates inputs; rejects invalid payloads.
- [ ] Rate limiting / anti-abuse is implemented to the agreed baseline (TBD until decided).
- [ ] Secrets are not present in client bundles (no accidental `NEXT_PUBLIC_` leakage).
- [ ] Baseline security headers are applied (or hosting equivalent) per `E01`.

### 3.6 SEO & indexing (H01)
- [ ] `robots.ts` reflects environment (prod index allowed; non-prod blocked/noindex).
- [ ] `sitemap.ts` includes locale routes for:
  - static pages
  - collection indexes
  - collection details (valid slugs)
- [ ] Page titles/descriptions and OG metadata exist for key page types (localized).
- [ ] No major CLS introduced by header/nav or cookie banner (targets TBD).

### 3.7 Contact flow (P00, E02)
- [ ] Contact page exists and can successfully submit to `/api/contact`.
- [ ] Submission destination is confirmed and documented (email/CRM/DB).
- [ ] Data handling/retention assumptions are documented in `E02` (even if TBD).

## 4) Test strategy (minimum)
**TBD for tooling, but at minimum:**
- Smoke test each top-level route for each locale.
- Smoke test each dynamic route with at least:
  - one valid slug
  - one invalid slug
- Validate consent cookie creation and script gating.
- Validate revalidate endpoint secret protection.
- Validate sitemap/robots output in staging and production modes.

## 5) Release readiness
- [ ] All P0 requirements in `P00` are met or explicitly deferred with decision logged.
- [ ] No high/critical security vulnerabilities open (dependency audit clean or mitigated).
- [ ] Content owners can publish/update CMS content without engineering changes (where applicable).
- [ ] MANIFEST is updated to reflect current doc set and statuses.

## 6) Open questions
- Final Core Web Vitals targets (LCP/INP/CLS).
- Anti-abuse mechanism choice for contact (captcha vs rate limiting vs both).
- Default locale URL policy (always prefix vs no-prefix default).
- WP localization strategy and slug policy.
