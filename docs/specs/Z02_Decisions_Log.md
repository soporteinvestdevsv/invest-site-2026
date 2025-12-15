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

### Z02-20251215-02 — Locale-prefixed routing as canonical URL policy (initial)
**Date:** 2025-12-15  
**Status:** Proposed  
**Owner:** Product/Engineering  
**Area:** i18n/SEO  
**Context:** Current scaffold uses `app/(routes)/[locale]/...` for all pages, implying locale prefix everywhere.  
**Decision:** Default to `/{locale}/...` as canonical for all pages; confirm whether default locale can be no-prefix later.  
**Alternatives considered:** Default locale without prefix. Would require extra routing rules and canonical redirects.  
**Consequences:** Simpler routing and sitemap generation; may impact marketing preference for clean default-locale URLs.  
**Impacted specs:** C01, H01, A01  
**Impacted code:** app routing/layouts  
**Acceptance notes:** Final decision must be updated to Accepted/Rejected once confirmed.

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

