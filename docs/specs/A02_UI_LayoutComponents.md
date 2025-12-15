docs/specs/A02_UI_LayoutComponents.md

# A02 — UI Layout Components (Header, Footer, Global Shell)
**Status:** Draft (v0.1)  
**Scope:** Global layout structure, header/footer responsibilities, navigation wiring, and integration of consent/i18n hooks.

## 1) Current scaffold facts (as-is)
- Layout components exist:
  - `components/layout/Header.tsx`
  - `components/layout/Footer.tsx`  (see `B00_AsIs_ComponentsTree.*`)
- App Router layouts exist:
  - `app/layout.tsx`
  - `app/(routes)/[locale]/layout.tsx` (see `A00_AsIs_AppTree.*`)
- Privacy components exist:
  - `components/privacy/CookieBanner.tsx`
  - `components/privacy/ConsentScripts.tsx` (see `B00`)
- Locale routing exists: `app/(routes)/[locale]/...` (see `A00`) and i18n config in `lib/i18n/config.ts` (see `B01`).

## 2) Objectives
- Provide a consistent global shell across all locale pages.
- Implement primary navigation aligned to the IA sitemap.
- Provide footer navigation including Legal links and cookie management entry point.
- Integrate i18n (locale switcher) and consent (banner + script gating) in correct layout positions.

## 3) Global layout structure (expected)
### 3.1 Root vs locale layout
**TBD (confirm actual implementation by inspecting files):**
- Root layout (`app/layout.tsx`): document shell (html/body), global styles, base providers.
- Locale layout (`app/(routes)/[locale]/layout.tsx`): page shell (Header/Footer), locale context, and shared UI.

### 3.2 Slot model
For all locale routes:
- **Header**: primary nav + locale switcher + key CTAs (TBD)
- **Main**: page content
- **Footer**: legal links + manage cookies + contact/branding elements (TBD)
- **Consent**:
  - `ConsentScripts` should be included once at a consistent global level (where it can manage scripts).
  - `CookieBanner` should be present globally but only render when needed.

## 4) Header requirements
### 4.1 Navigation items (source of truth)
Use `A01_IA_Sitemap.*` for the canonical nav list. Default recommendation:
- Why El Salvador
- Why Invest
- How to Invest
- Sectors
- Success Stories
- Insights
- News & Events (or split)
- Media
- About
- Contact

### 4.2 Locale switcher
- Present in header.
- Preserves current path when switching locale (when possible).
- Behavior for missing translation: **TBD** (see `C01_i18n_Locales.*`)

### 4.3 Responsive behavior
- Mobile: collapsible menu (drawer/dropdown).
- Desktop: horizontal nav.
- Must be keyboard accessible with correct focus handling.

### 4.4 Accessibility baseline
- Include a “Skip to content” link.
- Provide semantic landmarks: `header`, `main`, `footer`.
- Ensure tab order and focus states are consistent.

## 5) Footer requirements
### 5.1 Legal links (must exist)
- Accessibility: `/{locale}/legal/accessibility`
- Cookies: `/{locale}/legal/cookies`
- Privacy: `/{locale}/legal/privacy`
- Terms: `/{locale}/legal/terms`

### 5.2 Manage cookies entry point
- Provide “Manage cookies” link or button.
- Behavior: **TBD** (open banner/settings modal or navigate to a settings page) (see `E03_Cookies_Consent.*`)

## 6) Consent integration requirements
- Include `ConsentScripts` at the global level (once) so it can manage non-essential script loading.
- Include `CookieBanner` globally (once) and ensure it is client-only (if required).
- Ensure banner does not cause layout shift beyond acceptable thresholds (NFR).

## 7) Requirements
- **A02-FR-001:** All locale pages use consistent Header/Footer shell.
- **A02-FR-002:** Header nav implements `A01` sitemap links and is responsive + accessible.
- **A02-FR-003:** Footer includes legal links and “Manage cookies” entry point.
- **A02-FR-004:** Locale switcher exists and aligns with `C01` routing/translation rules.
- **A02-FR-005:** ConsentScripts + CookieBanner are integrated once and behave consistently.
- **A02-NFR-001:** Layout must be accessible (landmarks, skip link, focus management).
- **A02-NFR-002:** Avoid significant CLS from banner/nav (targets TBD).

## 8) Open questions
- Exact split of responsibilities between `app/layout.tsx` and `app/(routes)/[locale]/layout.tsx`
- Final header nav ordering and whether “News & Events” is merged or split
- “Manage cookies” UX pattern (modal vs page vs reopen banner)
