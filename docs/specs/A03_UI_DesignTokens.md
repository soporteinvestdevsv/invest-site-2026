docs/specs/A03_UI_DesignTokens.md

# A03 — UI Design Tokens & Theming
**Status:** Draft (v0.1)  
**Scope:** Canonical design token definitions (colors, typography, spacing, radii, shadows) and the rules for consuming tokens in UI components. This spec exists to make the site themeable by changing a single source of truth.

## 1) Objectives
- Define a fixed, reusable token system for the INVEST site UI.
- Prevent hex/color drift by prohibiting ad-hoc colors in components.
- Enable a future “re-skin” by updating one token source (CSS variables / Tailwind theme mapping) without rewriting components.

## 2) Consumption rules (non-negotiable)
- **No hard-coded hex values in components.** Use token classes/variables only.
- Components must consume tokens via:
  - Tailwind semantic color names (preferred), e.g. `bg-brand-primary`, `text-foreground`, `border-border`, OR
  - CSS variables mapped to Tailwind semantic names (implementation detail).
- Do not introduce gradients or new accent colors outside this token set.

## 3) Color tokens (authoritative palette)
### 3.1 Brand
- `brand.primary`: **#0b2a4a** (headers, primary buttons, badges)
- `brand.primaryText`: **#ffffff** (text on brand.primary)

### 3.2 Text
- `text.primary`: **#111827**
- `text.muted`: **#6b7280**
- `text.inverse`: **#ffffff**

### 3.3 Surfaces
- `surface.page`: **#ffffff**
- `surface.card`: **#ffffff**
- `surface.inverse`: **#0b2a4a** (use with `text.inverse`)

### 3.4 Borders
- `border.neutral`: **#e5e7eb**

### 3.5 Warning palette (for alerts/notice blocks)
- `warning.bg`: **#fff7ed**
- `warning.border`: **#fed7aa**
- `warning.title`: **#9a3412**
- `warning.text`: **#7c2d12**

### 3.6 Code blocks
- `code.bg`: **#0b1220**
- `code.text`: **#e5e7eb**

## 4) Typography tokens
### 4.1 Font families (as-is)
- `font.sans`: Geist Sans (via `geist/font/sans`)
- `font.mono`: Geist Mono (via `geist/font/mono`)

### 4.2 Type scale (recommended)
- `text.xs`: 12px
- `text.sm`: 14px
- `text.base`: 16px
- `text.lg`: 18px
- `text.xl`: 20px
- `text.2xl`: 24px
- `text.3xl`: 30px

### 4.3 Weights
- `weight.regular`: 400
- `weight.medium`: 500
- `weight.semibold`: 600
- `weight.bold`: 700

### 4.4 Line heights
- `leading.tight`: 1.2
- `leading.normal`: 1.5
- `leading.relaxed`: 1.7

## 5) Layout tokens (global constants)
- `layout.maxWidth`: `7xl` (Tailwind container equivalent)
- `layout.headerHeight.mobile`: 64px (`h-16`)
- `layout.headerHeight.desktop`: 80px (`h-20`)
- `layout.pagePaddingX.mobile`: 16px (`px-4`)
- `layout.pagePaddingX.desktop`: 24px (`px-6`)

## 6) Radius tokens
- `radius.sm`: 8px
- `radius.md`: 12px
- `radius.lg`: 16px
- `radius.xl`: 20px
- `radius.2xl`: 24px  
(Use consistently; default preference: rounded “2xl” for cards/buttons unless a component spec overrides it.)

## 7) Shadow tokens (recommended)
- `shadow.sm`: subtle elevation (used for header and small cards)
- `shadow.md`: standard card elevation
- `shadow.lg`: modal/drawer elevation  
(Exact shadow values are implementation detail but must remain consistent across the app.)

## 8) Theming strategy (single-source requirement)
- Tokens must be definable in **one place** (single source of truth), and UI should reference semantic names.
- Recommended approach:
  - Define tokens as CSS variables (e.g., in `app/globals.css`) and map Tailwind theme colors to those variables, OR
  - Define Tailwind theme colors directly (still must remain centralized in one config).
- Components must not depend on “raw palette” values; they must depend on semantic tokens.

## 9) Acceptance criteria
- **A03-AC-001:** No component uses raw hex colors for UI styling (except within the token source file/config).
- **A03-AC-002:** Header uses `brand.primary` consistently (e.g., `bg-brand-primary`) and meets contrast with `text.inverse`.
- **A03-AC-003:** Warning blocks (if used) match the warning palette tokens exactly.
- **A03-AC-004:** A theme refresh is possible by editing only the centralized token source (no component edits).
