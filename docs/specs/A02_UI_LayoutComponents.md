docs/specs/A02_UI_LayoutComponents.md

# A02 — UI Layout Components (Header, Footer, Global Shell)
**Status:** draft (v0.2)  
**Scope:** Global layout structure for locale routes, including header/footer mounting, content offset rules for fixed header, and consent component placement.

## 1) Current scaffold facts (as-is, confirmed)
### 1.1 Layout entry points
- Root layout: `app/layout.tsx`
  - Loads Geist fonts + `app/globals.css`
  - Sets `<html lang="en">` (currently hard-coded)
  - Renders `<body>{children}</body>`
- Locale layout: `app/(routes)/[locale]/layout.tsx`
  - Mounts global shell elements for locale routes (see 3.2)

### 1.2 Global shell components
- Header: `components/layout/Header.tsx` (client) — **governed by `A04_UI_NavigationHeader.*`**
- Footer: `components/layout/Footer.tsx`
- Consent UI: `components/privacy/CookieBanner.tsx`
- Consent scripts: `components/privacy/ConsentScripts.tsx`

### 1.3 Locale parameter usage (as-is)
- Locale layout reads `params.locale` and passes `locale` into:
  - `<Header locale={locale} />`
  - `<CookieBanner locale={locale} />`
  - `<Footer locale={locale} />`

## 2) Objectives
- Provide a consistent global shell across all locale pages.
- Ensure fixed header does not overlap page content (offset reserved in layout).
- Mount consent components once, consistently, across all locale routes.
- Keep header behavior/specification anchored in `A04`, not duplicated here.

> Note: Some UI elements may currently include direct Tailwind classes; token formalization is governed by `A03_UI_DesignTokens.*` and can be tightened later without changing this mounting contract.

## 3) Global layout structure (as-is)
### 3.1 Root vs locale layout responsibilities (as-is)
- `app/layout.tsx`:
  - Global document shell (`html/body`)
  - Global CSS import
  - Font variables
  - **Current behavior:** html `lang` is `"en"` (not locale-driven yet)
- `app/(routes)/[locale]/layout.tsx`:
  - Locale-scoped page shell (Header/Footer + consent + main slot)
  - Provides top padding offset for fixed header (see 3.2)

### 3.2 Locale layout slot order (as implemented)
Order is fixed and must remain stable unless a decision is logged in `Z02`:

1) `Header(locale)`
2) `ConsentScripts()`
3) `CookieBanner(locale)`
4) `main` content slot
5) `Footer(locale)`

### 3.3 Main container + fixed-header offset (as implemented)
`main` is responsible for preventing overlap with the fixed header:
- `main` uses: `min-h-screen pt-16 lg:pt-20 flex flex-col`
- Offset matches Header height:
  - Mobile: `pt-16` (64px)
  - Desktop (lg+): `pt-20` (80px)

**Contract:** If Header height changes, `main` padding must be updated in the same change/PR.

## 4) Header mounting contract (as-is)
- Header is mounted once per locale route tree in `app/(routes)/[locale]/layout.tsx`.
- Header details (nav items, responsiveness, locale switching, scroll lock) are specified in `A04_UI_NavigationHeader.*`.
- A02 does not redefine Header UI/interaction requirements beyond the mounting + offset contract.

## 5) Footer mounting contract (as-is)
- Footer is mounted once per locale route tree after `main`.
- Footer receives `locale` prop.
- Legal link destinations exist under `/{locale}/legal/*` per the route tree (see `A00_AsIs_AppTree.*`).

## 6) Consent integration contract (as-is)
- `ConsentScripts` is mounted once at the layout level (between Header and CookieBanner).
- `CookieBanner` is mounted once at the layout level and receives `locale`.
- Consent UI must not introduce meaningful layout shift in the primary content area (tracked under NFRs).

## 7) Requirements (as-is vs planned)
### 7.1 Implemented (as-is)
- **A02-FR-001:** All locale pages use the same global shell ordering (Header → ConsentScripts → CookieBanner → Main → Footer).
- **A02-FR-002:** Main content is offset to avoid fixed-header overlap (`pt-16 lg:pt-20`).
- **A02-FR-003:** ConsentScripts + CookieBanner are integrated once and behave consistently across locale routes.

### 7.2 Planned (not implemented here; tracked)
- **A02-FR-P1:** Locale-driven `<html lang>` (likely requires moving locale awareness upward or introducing a controlled mechanism). (Ref: `C01_i18n_Locales.*`)
- **A02-NFR-P1:** Skip-to-content link pattern (if adopted) to be implemented in Header and governed by accessibility spec (planned `A05_UI_Accessibility.*`).

## 8) Open questions (updated)
- Should `<html lang>` be locale-driven (and if so, what is the chosen Next.js pattern)? (`C01`)
- “Manage cookies” UX pattern (banner reopen vs settings modal vs dedicated page). (`E03`)
