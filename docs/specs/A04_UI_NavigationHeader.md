docs/specs/A04_UI_NavigationHeader.md

# A04 — UI Navigation Header (Global NavBar) — As-Is Specification
**Status:** as_is (implemented)  
**Version:** 0.1.0  
**Source of truth (code):** `components/layout/Header.tsx`  
**Related specs:** `A02_UI_LayoutComponents.*`, `C01_i18n_Locales.*`, `A01_IA_Sitemap.*`, `G01_AcceptanceCriteria.*`

## 1) Component Responsibilities (as-is)
- **Global presence:** Intended to render on all public pages via the locale layout shell (A02). No exclusions implemented.
- **Navigation:** Provides access to primary site sections via a hard-coded in-component nav model (`NAV_ITEMS`).
- **Locale control:** Provides a locale switch action (EN ↔ ES) that rewrites the locale segment in the current pathname.
- **Out of scope (as-is):** No dynamic content in header (no CMS-driven menus, no search, no ticker).

## 2) Component API + State (as-is)
**Component:** `Header({ locale }: { locale: string })` (client component)

### 2.1 Inputs
- `locale` string: expected current locale from route segment. Fallback is applied.

### 2.2 Internal state
- `isMobileOpen` (boolean): mobile menu open/closed.
- `isScrolled` (boolean): set when `window.scrollY > 10` but **currently not used** in rendering.

### 2.3 Derived values
- `currentLocale = locale || "en"`
- `targetLocale = currentLocale === "en" ? "es" : "en"`
- `targetLabel = targetLocale === "en" ? "EN" : "ES"` (label shows the locale to switch TO)
- `navItems = NAV_ITEMS[currentLocale] || NAV_ITEMS.en`
- `getHref(path) = "/{currentLocale}" + path`
- `switchLocaleHref = pathname.replace("/{currentLocale}", "/{targetLocale}")` or `"/{targetLocale}"` fallback

## 3) Navigation model (as-is)
The nav model is defined inline in `Header.tsx` as `NAV_ITEMS` and includes:
- EN: Why El Salvador, Why Invest, How to Invest, Sectors, Success Stories, News & Events, About, Contact
- ES: Por qué El Salvador, Por qué Invertir, Cómo Invertir, Sectores, Casos de Éxito, Noticias y Eventos, Nosotros, Contacto

**As-is constraints:**
- Labels are hard-coded strings (not translation keys).
- Hrefs are shared across locales (labels change, slugs do not).

## 4) Layout & Styling (as-is)
### 4.1 Header container
- **Position:** `fixed top-0 left-0 w-full`
- **Z-index:** `z-[100]`
- **Height:** `h-16` on mobile; `lg:h-20` on desktop
- **Background:** `bg-brand-primary`
- **Text color:** `text-white`
- **Border:** `border-b border-brand-primary/10`
- **Shadow:** `shadow-sm`
- **Transition:** `transition-all duration-300`

### 4.2 Inner container
- **Max width:** `max-w-7xl mx-auto`
- **Padding:** `px-4 sm:px-6`
- **Layout:** `h-full flex items-center justify-between`

### 4.3 Zones (as-is)
1) **Mobile toggle (left, mobile only)**
   - Visible: `lg:hidden`
   - Button has focus ring and hover background.
2) **Brand**
   - Link text: `INVEST EL SALVADOR` (with lighter styling on “EL SALVADOR”)
   - Destination: `/{locale}`
   - Clicking brand closes the mobile menu (calls `closeMenu`).
3) **Desktop nav (desktop only)**
   - Visible: `hidden lg:flex`
   - Layout: horizontal links with `gap-6`
   - Link styling: `text-sm font-medium text-white/90` + hover underline.
4) **Desktop utilities (desktop only)**
   - Locale switch link: `hidden lg:flex`
   - Styling: `text-xs font-mono font-bold` with translucent background (`bg-white/10`).

## 5) Sticky behavior (as-is)
- Header is fixed at top across scroll.
- No content-offset rule is defined in this component; layout must ensure content does not render under the fixed header.

## 6) Responsive behavior (as-is)
### 6.1 Breakpoint
- Uses Tailwind `lg` breakpoint for desktop vs mobile behavior.

### 6.2 Mobile menu type
- Full-screen overlay “drawer” that slides in from the left:
  - Closed: `-translate-x-full`
  - Open: `translate-x-0`
  - Transition: `duration-300 ease-in-out`
- Container: `fixed inset-0 z-40 bg-brand-primary`
- Spacing: `pt-20 px-6` (top padding to clear fixed header)

## 7) Interaction model (as-is)
### 7.1 Open/close triggers
- **Open/Close:** hamburger toggles `isMobileOpen`
- **Close on click:** any mobile nav link closes the menu
- **Close on locale switch (mobile):** closes menu
- **Close on brand click:** closes menu

### 7.2 Not implemented (as-is)
- Escape key close
- Outside click close
- Auto-close on route change (not explicitly implemented)
- Focus trap / focus management

## 8) Scroll locking (as-is)
When the mobile menu is open:
- `document.body.style.overflow = "hidden"`
- `document.body.style.paddingRight` is set to scrollbar width to avoid layout shift

On close/unmount:
- overflow resets to `unset`
- paddingRight resets to `0px`

## 9) Accessibility (as-is)
Implemented:
- Toggle is a `<button>` with:
  - `aria-label="Toggle navigation"`
  - `aria-expanded={isMobileOpen}`
- Visible focus ring on toggle (`focus:ring-2 focus:ring-white/50`)
- Reasonable touch target sizing via padding

Not implemented (as-is):
- `aria-controls` linking toggle to the mobile menu container
- Escape/outside-click close semantics
- Focus management while menu is open

## 10) i18n integration (as-is)
- Locale source is passed as prop (`locale`), with fallback to `en`.
- Links are generated as locale-prefixed paths: `/{locale}{href}`.
- Locale switch rewrites current pathname by replacing `/{currentLocale}` with `/{targetLocale}`.

**Known edge case (as-is):**
- If the current pathname does not include `/{currentLocale}`, the replacement may not behave as intended; fallback is `/{targetLocale}`.

## 11) Acceptance criteria (as-is verification)
- **A04-AC-001:** Header is fixed at top and visible on all pages where rendered.
- **A04-AC-002:** Desktop (`lg+`) shows horizontal nav links and a locale switch chip.
- **A04-AC-003:** Mobile (`< lg`) shows hamburger; opening reveals a full-screen overlay menu.
- **A04-AC-004:** While mobile menu is open, body scroll is locked without layout shift.
- **A04-AC-005:** Clicking any mobile nav link closes the menu.
- **A04-AC-006:** Locale switch changes locale segment in URL (EN ↔ ES).

## 12) Spec debt (tracked follow-ups)
- Move `NAV_ITEMS` out of component into a shared system (derive from `A01` + translations), and remove hard-coded labels from `Header.tsx`.
- Define and implement keyboard/ARIA enhancements (Escape, focus management, aria-controls) in a dedicated accessibility spec (planned `A05_UI_Accessibility.*`).
- Decide whether `isScrolled` should drive visual changes; currently unused and may be removed or formalized.
