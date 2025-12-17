# A05 — UI Footer (Global Footer Component)
**Status:** Draft (v0.1)  
**Scope:** Full-width global footer including social links, quick links, resource links, policy links, map embed, brand elements, and responsive layout.  
**Source (as-is):** Simplified placeholder footer in `components/layout/Footer.tsx`.  
**Target:** Replace with fully structured INVEST footer (Variant A).

---

## 1) Component Responsibilities
- Provide global footer content on all public-facing pages.
- Offer clear access to:
  - Social media channels
  - Quick navigation links (invest, export, diaspora, transparency)
  - Resource links (guides, intelligence, incentives)
  - Policy/legal pages
  - INVEST branding + mission statement
  - Government of El Salvador logo
  - Physical location via embedded map
- Maintain consistent multilingual behavior (i18n keys for all copy).
- Use design tokens (`A03`) for all colors, spacing, typography—not inline hex values.

---

## 2) Layout Structure (TO-BE)
The footer is structured as **three vertical sections**, each containing multiple content zones.

### **Section 1 — Social Block**
- Title: `Follow us`
- Social icons (horizontal row):
  - Facebook
  - Instagram
  - X / Twitter
  - LinkedIn  
- Icons use:
  - Token-based color from `brand.primary.invert` or white depending on theme.
  - Accessible labels (`aria-label="Facebook"` etc.).
- Each icon links to the official INVEST channels (configurable in `app/config/social.ts`).

---

### **Section 2 — Navigation Blocks (3 Columns on Desktop, Stacked on Mobile)**

#### **Column 1 — Quick Links**
Links:
- “I want to invest”
- “I want to export”
- “Salvadoran diaspora”
- “Transparency portal”

Requirements:
- All links must use i18n-based labels.
- Internal links must use locale prefixes: `/{locale}/path...`
- External links may remain absolute URLs.

---

#### **Column 2 — Resources**
Links:
- Business intelligence
- Investment guide (PDF)
- Sector guides
- Tax incentives and benefits (PDF)

Requirements:
- PDF links must open in new tabs (`target="_blank"`).
- Resource IDs should be configurable through a CMS or config file (`D01`).

---

#### **Column 3 — Utility / Extra Links**
Links:
- Antisoborno Policy  
- Events  
- Why El Salvador?  
- Contact us  
- Announcements

Notes:
- This column is optional and can be sourced via CMS in v2.
- Labels require translation keys.

---

## 3) Section 3 — Branding + Map + Legal

### **3.1 INVEST Logo**
- Use a placeholder image from `/public/images/footer/invest-logo.png`.
- Final image provided later by design team.
- Logo links to home: `/{locale}`.

### **3.2 Brand Statement**
Example text (must be i18n-based):
> INVEST is the official site for the assistance and consultancy of investors, exporters, or companies interested in expanding their business in El Salvador.

### **3.3 Government Logo**
- Placeholder at: `/public/images/footer/goes-logo.png`
- Left-aligned or stacked (responsive)

### **3.4 Legal Text**
- “© Government of El Salvador. All rights reserved.”
- i18n key: `footer.legal.copyright`

### **3.5 Legal Links**
Mapped to your route inventory (`A01`):
- Terms and Conditions → `/{locale}/legal/terms`
- Privacy Policy → `/{locale}/legal/privacy`

---

## 4) Map Embed Block
A static Google Maps embed showing INVEST offices.

TO-BE requirements:
- Must not shift layout while loading.
- Must have:
  - `loading="lazy"`
  - `referrerpolicy="no-referrer-when-downgrade"`
- Width: `100%` responsive
- Height: fixed token size (e.g., `h-48` mobile → `h-64` desktop)

Embed URL configurable at `config/organization.ts`.

---

## 5) Responsive Behavior

### **Mobile (< 768px)**
- Columns stack vertically:
  1. Social block  
  2. Quick links  
  3. Resources  
  4. Extra links  
  5. Map  
  6. Branding + legal  

### **Tablet (768–1024px)**
- Two columns per row.
- Map and branding on separate row.

### **Desktop (≥1024px)**
- Full 4–5 column layout.
- Map displayed on the right or in a dedicated column below (depending on spacing).

Spacing:
- Vertical spacing uses tokens (`space.lg`, `space.xl`).
- Columns use `gap-x` grid spacing tokens.

---

## 6) Visual Design Requirements (Tokens Only)
- Background color: `brand.primary` or `neutral.dark`
- Text color: `neutral.lightest` or `brand.primary.invert`
- Icon color: must use tokens, not hard-coded hex.
- All typography must use token definitions: `font.body.sm`, `font.body.md`, `font.heading.xs`.

Borders:
- Dividers use `border.neutral/20` or equivalent token.

Hover states:
- Subtle opacity change (not underline unless required).

---

## 7) i18n Requirements
Every visible string must map to a translation key.

Namespace recommendation:
    footer.follow_us
    footer.quick_links.invest
    footer.quick_links.export
    footer.quick_links.diaspora
    footer.quick_links.transparency
    footer.resources.intelligence
    footer.resources.investment_guide
    footer.resources.sector_guides
    footer.resources.tax_incentives
    footer.extra.events
    footer.extra.antisoborno
    footer.extra.announcements
    footer.brand_statement
    footer.legal.terms
    footer.legal.privacy
    footer.legal.copyright

Locale paths:
- All internal links MUST prefix with locale from context: `/{locale}`.

---

## 8) Accessibility (A11y)
- Icons must include `aria-label`.
- Links require visible focus rings (token-based).
- Map iframe must include `title="INVEST Location Map"`.
- Footer landmarks use `<footer>` tag only (no redundant `<nav>` unless justified).

---

## 9) Acceptance Criteria
- **A05-AC-001:** Footer renders globally on all locale pages.
- **A05-AC-002:** Social icons are fully keyboard-navigable.
- **A05-AC-003:** All quick links, resources, and legal links resolve correctly per locale.
- **A05-AC-004:** Map embed loads responsively and without layout shift.
- **A05-AC-005:** Footer uses design tokens—no inline hex colors allowed.
- **A05-AC-006:** All strings are translation-key based.
- **A05-AC-007:** Component passes basic WCAG AA color contrast.
- **A05-AC-008:** Footer does not conflict with consent banner or global layout spacing (`A02`).

---

## 10) Open Questions
- Should quick links or resources be CMS-manageable in v2?  
- Should events/news/announcements be dynamic or static references?  
- Should the map be replaced with a static image for performance?