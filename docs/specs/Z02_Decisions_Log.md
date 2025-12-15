docs/specs/Z02_Decisions_Log.md

# Z02 — Decisions Log
**Status:** Active (v0.1)  
**Scope:** Record decisions that impact scope, architecture, content ownership, localization, privacy/security posture, and operations.  
**Rule:** Any decision that changes behavior or constraints must be logged here and referenced from the impacted spec(s).

## How to use
For each decision:
- Create a new entry using the template below.
- Reference the decision ID in any impacted spec `.md` and `.tok.json`.
- Avoid “silent” decisions in code—log them here first (or in the same PR).

---

## Decision Template

**Decision ID:** Z02-YYYYMMDD-XX  
**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Rejected | Superseded  
**Owner:** Name/Role  
**Area:** IA | UI | i18n | CMS | Security | Privacy | SEO | DevOps | Other  
**Context:** What problem are we solving?  
**Decision:** What did we choose?  
**Alternatives considered:** What else was considered and why not chosen?  
**Consequences:** What changes because of this decision (trade-offs)?  
**Impacted specs:** List doc IDs (e.g., P00, C01, D01, E03)  
**Impacted code:** Paths/modules (if known)  
**Acceptance notes:** How will we verify it’s implemented correctly?

---

## Entries (most recent first)

### Z02-20251215-01 — Adopt docs/specs as authoritative context store
**Date:** 2025-12-15  
**Status:** Accepted  
**Owner:** Product/Engineering  
**Area:** Governance  
**Context:** Need a scalable, modular documentation suite that supports both human navigation and LLM context retrieval.  
**Decision:** Use `docs/specs/` as the authoritative spec system with paired `.md` + `.tok.json` docs and MANIFEST-driven loading.  
**Alternatives considered:** Ad-hoc docs in README only; single large PRD file. Rejected due to poor maintainability and LLM retrieval inefficiency.  
**Consequences:** Specs become the source of truth; updates must keep pairs in sync; MANIFEST must be maintained.  
**Impacted specs:** MANIFEST, P00, A*, B*, C*, D*, E*, F*, G*, H*, Z*  
**Impacted code:** None (governance only)  
**Acceptance notes:** Specs exist, are paired, and referenced consistently from MANIFEST.

### Z02-20251215-02 — Locale-prefixed routing as canonical URL policy
**Date:** 2025-12-15  
**Status:** Accepted  
**Owner:** Product/Engineering  
**Area:** i18n/SEO  
**Context:** Current scaffold uses `app/(routes)/[locale]/...` for all pages, implying locale prefix everywhere.  
**Decision:** Use `/{locale}/...` as canonical for all pages. Default locale will use the prefix strategy (no special "no-prefix" handling for now to simplify routing).  
**Alternatives considered:** Default locale without prefix. Would require extra routing rules and canonical redirects.  
**Consequences:** Simpler routing and sitemap generation; uniform URL structure.  
**Impacted specs:** C01, H01, A01  
**Impacted code:** app routing/layouts  
**Acceptance notes:** Specs C01 and H01 reference this decision.

### Z02-20251215-03 — Cookies/consent spec number allocation
**Date:** 2025-12-15  
**Status:** Accepted  
**Owner:** Engineering  
**Area:** Privacy  
**Context:** Consent system exists in scaffold; needed a stable doc ID without renumbering later.  
**Decision:** Keep cookies/consent as `E03` and introduce `E01` (security baseline) and `E02` (privacy/data handling) to complete the E-domain.  
**Alternatives considered:** Renumber E03 to E00/E01. Rejected due to reference churn.  
**Consequences:** E-domain reads logically: E01 security, E02 privacy, E03 consent.  
**Impacted specs:** E01, E02, E03, MANIFEST  
**Impacted code:** None  
**Acceptance notes:** MANIFEST reflects the E-domain ordering and all E docs exist.

### Z02-20251215-04 — Enforce “specs + decisions + manifest” workflow
**Date:** 2025-12-15  
**Status:** Accepted  
**Owner:** Product/Engineering  
**Area:** Governance  
**Context:** The repo is adopting `docs/specs` as an authoritative context store. We need an explicit workflow to prevent code/spec drift and ensure LLM context is reliable.  
**Decision:** All meaningful scope/behavior changes must be reflected in specs, and architectural/constraint decisions must be logged in Z02. MANIFEST must be updated whenever specs are added/renamed.  
**Alternatives considered:** Ad-hoc docs; code-first changes with later documentation. Rejected due to drift and loss of rationale.  
**Consequences:** Specs become a required artifact for changes; Z02 entries provide traceability; MANIFEST stays complete for navigation and LLM loading.  
**Impacted specs:** MANIFEST, P00, A*, B*, C*, D*, E*, F*, G*, H*, Z*  
**Impacted code:** N/A (workflow)  
**Acceptance notes:** PRs that change behavior include spec updates; decisions are logged; MANIFEST stays current.

### Z02-20251215-05 — Contact anti-abuse strategy (v1)
**Date:** 2025-12-15
**Status:** Accepted
**Owner:** Security/Engineering
**Area:** Security
**Context:** Public contact form needs protection against spam/abuse without excessive UX friction.
**Decision:** Use **Rate Limiting** (IP-based) and **Honeypot** fields initially. Defer CAPTCHA to v2 if abuse scales.
**Alternatives considered:** Cloudflare Turnstile / reCAPTCHA. Rejected for v1 to minimize dependencies and UI impact.
**Consequences:** E01 must define rate limits; API route must implement logic.
**Impacted specs:** E01, P00
**Impacted code:** `app/api/contact/route.ts`
**Acceptance notes:** Rate limit functionality testable; honeypot field present.

### Z02-20251215-06 — WordPress localization strategy
**Date:** 2025-12-15
**Status:** Accepted
**Owner:** Engineering
**Area:** CMS/i18n
**Context:** Content must be localized. Need a strategy for mapping WP posts to Next.js locales.
**Decision:** 1:1 mapping of posts to locales (using Polylang or WPML model). Slugs are localized (e.g., `/en/news/hello` vs `/es/noticias/hola`).
**Alternatives considered:** Single site with field-level translation; Multisite.
**Consequences:** D01 must specify separate query per locale or filtered query.
**Impacted specs:** D01, C01
**Impacted code:** `lib/wp/queries.ts`
**Acceptance notes:** Fetching content for "es" returns ES content only.

### Z02-20251215-07 — Revalidation authentication
**Date:** 2025-12-15
**Status:** Accepted
**Owner:** Security
**Area:** Security
**Context:** `api/revalidate` is public; needs protection.
**Decision:** Use a **Shared Secret** (`REVALIDATE_SECRET`) passed via header or query param.
**Alternatives considered:** Signed JWT; IP whitelist.
**Consequences:** Simple to implement; must rotate secret if leaked.
**Impacted specs:** E01, D01
**Impacted code:** `app/api/revalidate/route.ts`
**Acceptance notes:** Request without secret returns 401.

### Z02-20251215-08 — Consent model and cookie schema
**Date:** 2025-12-15
**Status:** Accepted
**Owner:** Privacy/Legal
**Area:** Privacy
**Context:** Need a defined schema for the consent cookie to power the gating logic.
**Decision:** Cookie Name: `INVEST_CONSENT`. Categories: `necessary` (always on), `analytics` (opt-in). Max-Age: 180 days.
**Alternatives considered:** Granular marketing/preferences categories. Deferred to v2.
**Consequences:** E03 spec can be final; code implements this name.
**Impacted specs:** E03
**Impacted code:** `lib/privacy/consent.ts`
**Acceptance notes:** Cookie is set with correct JSON shape `{"cats":{"analytics":...}}`.

### Z02-20251215-09 — Analytics platform selection
**Date:** 2025-12-15
**Status:** Accepted
**Owner:** Product
**Area:** SEO/Data
**Context:** Need to measure site traffic while respecting privacy.
**Decision:** Use **Google Analytics 4 (GA4)** via Google Tag Manager or direct tag, utilizing **Consent Mode v2**.
**Alternatives considered:** Plausible (paid), no analytics.
**Consequences:** H01/E03 must account for Google tags and consent mode integration.
**Impacted specs:** H01, E03
**Impacted code:** `components/privacy/ConsentScripts.tsx`
**Acceptance notes:** GTM container loaded only after consent or with consent signals denied by default.

### Z02-20251215-10 — UI Stack: PrimeReact + Tailwind + GSAP
**Date:** 2025-12-15
**Status:** Accepted
**Owner:** Engineering/UX
**Area:** Frontend
**Context:** Need a robust component library for complex data displays and a high-performance animation engine for premium feel.
**Decision:** 
- **Component Lib:** PrimeReact (Unstyled/Tailwind presets).
- **CSS:** Tailwind CSS.
- **Animation:** GSAP (GreenSock) for complex animations; Tailwind for simple transitions.
**Alternatives considered:** shadcn/ui (rejected), Framer Motion.
**Consequences:** 
- `B00` inventory must reflect PrimeReact.
- Project setup must include `primereact`, `primeicons`, `gsap`.
**Impacted specs:** B00, A02
**Impacted code:** `components/*`, `tailwind.config.ts`, `lib/animations/*`
**Acceptance notes:** Components render with Tailwind; GSAP installed and usable.

