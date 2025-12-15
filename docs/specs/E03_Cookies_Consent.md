docs/specs/E03_Cookies_Consent.md

# E03 — Cookies & Consent (Banner + Script Gating)
**Status:** Draft (v0.1)  
**Scope:** Consent model, cookie schema, banner UX, and script gating behavior across the site.

## 1) Current scaffold facts (as-is)
- Consent UI components exist:
  - `components/privacy/CookieBanner.tsx`
  - `components/privacy/ConsentScripts.tsx`
  (see `B00_AsIs_ComponentsTree.*`)
- Consent logic exists:
  - `lib/privacy/consent.ts`
  (see `B01_AsIs_LibTree.*`)
- Legal pages include:
  - `/{locale}/legal/cookies`
  - `/{locale}/legal/privacy`
  (see `A00_AsIs_AppTree.*`)

## 2) Objectives
- Collect user consent in a compliant, user-friendly manner.
- Persist consent choice across visits.
- Gate non-essential scripts based on consent state.
- Provide a clear path to review/update consent choices.
- **Banner/buttons must follow `A03` tokens; no hardcoded colors.**

## 3) Consent categories (proposed; confirm requirements)
**Decision Z02-20251215-08:**
- `necessary`: Always enabled (technical cookies, session).
- `analytics`: Optional (GA4/GTM).
- `marketing`: Deferred to v2.

## 4) Consent cookie schema
**Source of truth:** `lib/privacy/consent.ts` (implementation must match this spec)

Define:
**Decision Z02-20251215-08:**
- Cookie name: `INVEST_CONSENT`
- Max-Age: `15552000` (180 days)
- Path: `/`
- SameSite: `Lax`
- Secure: `true` (HTTPS only)

Cookie value format (recommended):
- JSON encoded + URI encoded, ex:
  - `{ "v": 1, "ts": "2025-12-15T00:00:00Z", "cats": { "analytics": true, "marketing": false } }`

## 5) Banner behavior (CookieBanner)
### Display rules
- Show if no valid consent cookie exists.
- Do not show if consent cookie exists and is valid.
- Provide a way to reopen consent settings: **Footer link "Manage Cookies" opens the banner in "preferences" mode.**

### Actions
- Accept all (enables all optional categories)
- Reject non-essential (only necessary enabled)
- Manage preferences (optional; if implemented)

### UX requirements
- Clear language + link to Cookie Policy and Privacy Policy pages.
- Accessible controls (keyboard + screen-reader friendly).

## 6) Script gating behavior (ConsentScripts)
- Non-essential scripts must load only after consent allows them.
- Necessary scripts may load unconditionally.
- ConsentScripts should:
  - read `INVEST_CONSENT` state.
  - conditionally inject GTM/GA4 (Decision Z02-20251215-09).
  - avoid duplicate injection (idempotent).

## 7) Requirements
- **E03-FR-001:** Persist consent choice in a cookie with defined schema and expiration.
- **E03-FR-002:** CookieBanner must display only when consent is missing/invalid.
- **E03-FR-003:** ConsentScripts must gate non-essential scripts based on consent state.
- **E03-FR-004:** Provide a mechanism to update consent after initial choice (TBD where).
- **E03-NFR-001:** Implementation must not break SSR/CSR boundaries (CookieBanner is client-side).
- **E03-NFR-002:** Consent UI meets accessibility baseline.

## 8) Integration points
- Header/Footer may include links: Cookies, Privacy, Terms (see `A02_UI_LayoutComponents.*`)
- Google Analytics 4 via GTM must be gated (see `H01_SEO_Metadata.*`)

## 9) Open questions
- None.
