# A04 — UI Navigation Header (Responsive & Sticky)
**Status:** Draft (v0.1)  
**Scope:** Specification for the global top navigation component, including desktop/mobile states, sticky behavior, and design token integration.

## 1) Component Responsibilities
- **Primary Navigation:** Render the site's main hierarchy (source: `A01`).
- **Global Branding:** Display the "Invest in El Salvador" logo (home link).
- **Locale Switching:** Provide access to language options (source: `C01`).
- **Responsive Adaptation:** transform from horizontal list (desktop) to drawer/overlay (mobile).
- **Wayfinding:** Indicate active state for the current route.

## 2) Layout Specification (Desktop)
### 2.1 Container & Dimensions
- **Position:** `fixed` (top: 0, left: 0, right: 0).
- **Height:** `h-16` (64px) or `h-20` (80px) TBD during implementation, but fixed.
- **Z-Index:** High (must sit above page content, e.g., `z-50`).
- **Width:** Full width background, content limited to `max-w-7xl` (or site max width) centered.
- **Background:** `brand.primary` (Solid) or `white` / `transparent` depending on scroll state (Decision needed: Single state vs Scroll-aware).
    - *Base Recommendation:* White background with `border-b` (`border.neutral`) for legibility.

### 2.2 Zones (Left to Right)
1.  **Brand/Logo:** Left-aligned. Link to `/{locale}/`.
2.  **Primary Nav:** Centered or Right-aligned (next to CTA). Horizontal list.
3.  **Utility/Actions:** Right-aligned.
    -   Locale Switcher.
    -   Search (if verified in scope, else omit).
    -   "Contact" CTA (if separated from primary list).

## 3) Sticky Behavior Rules
- **State:** Always sticky (`position: sticky` or `fixed`).
- **Scroll Behavior:**
    -   *Option A (Simple):* Always visible, solid background.
    -   *Option B (Dynamic):* Transparent at top, solid white + shadow on scroll.
    -   **Spec:** Implement **Option A** initially for simplicity and consistent accessibility.
- **Offset:** Main content must have `padding-top` equal to header height to prevent overlap.

## 4) Responsive Behavior Rules
### 4.1 Breakeven Point
- **Mobile:** `< 1024px` (Tailwind `lg`).
- **Desktop:** `>= 1024px`.

### 4.2 Mobile State
- **Menu Toggle:** Hamburger icon (visible `< lg`).
- **Drawer/Overlay:** Hidden by default. Slides in from right or covers full screen when toggled.
- **Animation:** Smooth transition (e.g., `300ms` ease-out) via GSAP or Tailwind transition.
- **Scroll Lock:** `body` scroll must be locked when menu is open (A11y).

## 5) Interaction Model
### 5.1 Hover & Focus (Desktop)
- **Hover:** Sub-menus (if any) open on hover (with safe triangle or delay). Links change color/underline using `A03` tokens.
- **Focus:** Standard outline ring (Tailwind default) for keyboard users.
- **Active State:** Current section highlighted (e.g., distinct text color or bottom border).

### 5.2 Menu Lifecycle
- **Close on Route Change:** Navigation events must auto-close the mobile drawer.
- **Close on Escape:** Pressing `Esc` must close the mobile drawer.
- **Outside Click:** Clicking overlay backdrop must close drawer.

## 6) Accessibility Requirements
- **Semantic Tag:** `<header>`, `<nav>`.
- **Keyboard Order:** Logo -> Nav Items -> Locale Switcher.
- **ARIA:**
    -   Hamburger: `aria-label="Open main menu"`, `aria-expanded="true/false"`.
    -   Nav: `aria-label="Main"`.
- **Focus Trap:** When mobile drawer is open, focus must be trapped within the drawer.
- **Reduced Motion:** Respect `prefers-reduced-motion` (disable animations).

## 7) i18n Behavior
- **Links:** All `href` values must be prefixed with current locale (e.g., `/en/sectors`) per `C01`.
- **Switcher:** Toggling locale stays on current page if translation exists, else root (per `C01`).

## 8) Content Model
- **Source of Truth:** `A01_IA_Sitemap` (keys: `nav.primary`, `nav.header`).
- **Structure:**
    -   Top-level items: Rendered as links.
    -   Dropdowns (if "Investors" is a grouping): Render as button triggering sub-menu.
    -   *Constraint:* No hardcoding of labels in component; use `next-intl`.

## 9) Requirements (G01-aligned)
- **A04-FR-001:** Header is sticky at top of viewport.
- **A04-FR-002:** Desktop view shows all primary items horizontally.
- **A04-FR-003:** Mobile view shows hamburger; toggles drawer.
- **A04-FR-004:** Navigation via drawer locks body scroll.
- **A04-NFR-001:** Navigation passes automated a11y checks (axe-core).
- **A04-NFR-002:** No CLS (Cumulative Layout Shift) from header initialization.

## 10) Open Questions
- **Design Decision:** Transparent-to-solid scroll effect or always solid? (Defaulting to Always Solid).
- **Grouping:** Does "Investors" imply a mega-menu? (Assuming simple dropdown or single link for now).
