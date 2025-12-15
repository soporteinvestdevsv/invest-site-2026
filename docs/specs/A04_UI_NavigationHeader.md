# A04 — UI Navigation Header (Global NavBar)
**Status:** Draft (v0.1)  
**Scope:** Specification for the global site navigation, including desktop/mobile layouts, sticky behavior, i18n switcher, and accessibility requirements.

## 1) Component Responsibilities
- **Global Presence:** Rendered on all public pages (via `A02` layout shell) unless explicitly excluded (e.g., landing pages with specific exclusion rules).
- **Navigation:** Provides access to primary site sections defined in `A01`.
- **Locale Control:** Hosts the global language switcher (source: `C01`).
- **Exclusions:** None defined for v1 (present on all pages).
- **Out of Scope:** Does not fetch dynamic content (news tickers, etc.); strictly navigation.

## 2) Layout & Styling (Token-Driven)
**Reference:** `A03_UI_DesignTokens` for all colors and spacing.

### 2.1 Container
- **Type:** Fixed/Sticky header.
- **Height:**
    -   Desktop: `h-20` (80px)
    -   Mobile: `h-16` (64px)
- **Width:** Full viewport width (`w-full`).
- **Inner Content:** `max-w-7xl` (centered), `px-4` or `px-6` (responsive).
- **Background:** `brand.primary` (Solid) - **Decision:** Solid background for v1 to ensure consistent contrast.
- **Border:** Optional `border-b` (`border.neutral` opacity adjustment if needed, or omit if solid brand color used).

### 2.2 Zones (Row Layout)
1.  **Brand (Left):**
    -   Logo SVG (Invest in El Salvador).
    -   Link to `/{locale}/` (root of current locale).
    -   Height/Size: Optimized to fit within container height.
2.  **Primary Nav (Center/Right - Desktop only):**
    -   Horizontal list of links.
    -   Gap: `gap-6` or `gap-8`.
    -   Alignment: Right-aligned (next to utilities) or Center-aligned.
3.  **Utilities (Right):**
    -   Locale Switcher (Icon + Code).
    -   Mobile Toggle (Visible `< lg`).
    -   Call-to-Action (optional, e.g., "Contact").

### 2.3 Styling Constraints
- **Colors:**
    -   Background: `brand.primary`
    -   Text: `white` (inverse of brand primary) or `text.primary` if background is white.
    -   *Decision:* If `brand.primary` bg, text must be `white` (or dedicated inverse token).
- **Active State:** Underline or font-weight change (`font.medium`).
- **Hover:** Opacity shift or underline animation.

## 3) Sticky Behavior
- **Position:** `fixed` (top: 0, left: 0, right: 0).
- **Z-Index:** `z-50` (Must be highest UI layer except modals/drawers).
- **Offset:** Layout (`A02`) must apply `padding-top` to `main` equal to header height to prevent content overlap.
- **Stability:** No layout shift on hydration (height must be reserved or fixed).

## 4) Responsive Behavior
### 4.1 Breakpoints
- **Switch Point:** `lg` (1024px).
- **Desktop (`>= lg`):** Full horizontal navigation.
- **Mobile (`< lg`):** Hamburger toggle + Drawer.

### 4.2 Mobile Menu (`< lg`)
- **Type:** Drawer (Side overlay) or Full-screen Overlay.
- **Default:** Hidden.
- **Toggle:** Hamburger icon (right-aligned).
- **State:**
    -   **Open:** Drawer slides in / Overlay fades in. Body scroll **LOCKED**.
    -   **Closed:** Hidden. Body scroll restored.
- **Content:** Vertical list of primary nav items + Locale Switcher.

## 5) Interaction Model
- **Toggle Trigger:** Click/Tap on Hamburger.
- **Close Triggers:**
    -   Click Close Button (X) inside drawer.
    -   Click Backdrop/Outside (if Drawer).
    -   Press `Escape` key.
    -   **Route Change:** Navigation to a new route MUST close the menu automatically.
- **Focus Management:**
    -   **Open:** Focus moves to first interactive item (Close button or first link).
    -   **Close:** Focus returns to Toggle button.

## 6) Accessibility Requirements
- **Landmark:** `<header>`, `<nav>`.
- **Labels:** `aria-label="Main navigation"`.
- **Toggle:** `<button>` with `aria-label="Open menu"` / `aria-expanded="true/false"`.
- **Keyboard:** Fully traversable via Tab. Focus ring visible (`focus:ring`).
- **Target Size:** Mobile touch targets min `44px`.

## 7) i18n Integration
**Source:** `C01_i18n_Locales`
- **Current Locale:** Read from route params (`[locale]`) or `next-intl` hook.
- **Link Generation:** All `href` props must include current locale prefix (e.g., `/es/sectors`).
- **Switcher:**
    -   Dropdown or Toggle.
    -   Lists supported locales (`en`, `es`).
    -   Action: Link to same path with swapped locale prefix (e.g., `/en/about` -> `/es/about`).
    -   **Fallback:** If path mapping fails (unlikely for static, possible for dynamic), redirect to target locale root `/{target_locale}`.

## 8) Navigation Content Model
**Source:** `A01_IA_Sitemap`
- **Structure:**
    -   `key` (for translation)
    -   `href` (template, e.g., `/sectors`)
- **Items (Desktop & Mobile):**
    -   Why El Salvador
    -   Why Invest
    -   How to Invest
    -   Sectors
    -   Success Stories
    -   News & Events
    -   About
    -   Contact
- **Translation:** Labels rendered via `t('nav.{key}')` (namespace TBD).

## 9) Error/Edge Cases
- **Missing Translation:** Render fallback label or key (dev mode).
- **Long Labels:** Desktop nav should wrap gracefully or overflow to "More" menu (v2). For v1, ensure padding accommodates longest locale (ES usually longer than EN).
- **Resize:** If window resized to `> lg` while menu open, menu must force close/reset state.

## 10) Acceptance Criteria
- **A04-AC-001 (Structure):** Header present on all pages, fixed at top.
- **A04-AC-002 (Desktop):** All `A01` items visible horizontally on `lg` screens.
- **A04-AC-003 (Mobile):** Hamburger visible on `< lg`. Opens drawer. Locks body scroll.
- **A04-AC-004 (Interaction):** Menu closes on route change, Esc, or outside click.
- **A04-AC-005 (i18n):** Locale switcher cycles languages correctly; links are locale-prefixed.
- **A04-AC-006 (A11y):** Keyboard navigable; correct ARIA attributes; focus management in drawer.
- **A04-AC-007 (Tokens):** Uses `A03` colors/type. No inline hex values.
