# A01 — Information Architecture (IA) & Sitemap
**Status:** Draft (v0.3.0)  
**Scope:** Public site navigation, page inventory, footer structure, and collection routing map.  
**Source of truth (as-is routing):** `A00_AsIs_AppTree.*`

---

## 1) IA Principles (v1)
- All public routes must always include a **locale prefix**: `/{locale}/...` (see locale strategy in `C01`).
- Primary navigation reflects INVEST’s core user journeys:
  - Why El Salvador
  - Why Invest
  - How to Invest
  - Sectors
  - Success Stories
  - News & Events
  - About
  - Contact
- Collections (news, events, sectors, etc.) follow **index + detail** patterns.
- Footer contains legal and utility links; “About” stays informational (non-CTA).

---

## 2) Primary Navigation (Header)
Canonical navigation model (aligned with current Header implementation but normalized into IA spec).

### Header Nav Items (ordered)
1. **Why El Salvador** → `/why-el-salvador`
2. **Why Invest** → `/why-invest`
3. **How to Invest** → `/how-to-invest`
4. **Sectors** → `/sectors`
5. **Success Stories** → `/success-stories`
6. **News & Events** → `/news`  
   - *Note:* `/events` exists separately; header currently links only to `/news`.
7. **About** → `/about`
8. **Contact** → `/contact` (CTA)

### Notes
- Labels must become **i18n keys** rather than inline strings (see `.tok.json` mapping).
- Ultimately navigation should move out of component code into a central config.

Reference: `A04_UI_NavigationHeader.*`

---

## 3) Footer Navigation
Aligns with global layout (`A02`) and consent spec (`E03`).

### 3.1 Legal links
- `/legal/accessibility`
- `/legal/cookies`
- `/legal/privacy`
- `/legal/terms`

### 3.2 Utility
- **Manage cookies** (invokes consent UI behavior defined in `E03`)

### 3.3 Social (recommended)
- LinkedIn  
- Twitter/X  
- Instagram

---

## 4) Page Inventory (Locale-Scoped)
All paths are implicitly prefixed with:  
`/{locale}`  
Examples: `/en/about`, `/es/about`

### 4.1 Static Pages
- `/` (home)
- `/about`
- `/about/governance`
- `/about/team`
- `/why-el-salvador`
- `/why-el-salvador/connectivity`
- `/why-el-salvador/macroeconomy`
- `/why-el-salvador/quality-of-life`
- `/why-el-salvador/talent`
- `/why-invest`
- `/why-invest/incentives`
- `/why-invest/services`
- `/how-to-invest`
- `/how-to-invest/steps`
- `/how-to-invest/requirements`
- `/how-to-invest/faqs`
- `/insights`
- `/insights/reports`
- `/media`
- `/media/downloads`
- `/media/gallery`
- `/contact`
- `/contact/invest-support`
- `/legal/accessibility`
- `/legal/cookies`
- `/legal/privacy`
- `/legal/terms`

---

## 5) Collection Pages (Index + Detail)
Headless WordPress is source of truth (see `D01_WordPress_Headless.*`).

### 5.1 News
- Index: `/news`
- Detail: `/news/[slug]`

### 5.2 Events
- Index: `/events`
- Detail: `/events/[slug]`

### 5.3 Reports (Insights)
- Index: `/insights/reports`
- Detail: `/insights/reports/[slug]`

### 5.4 Sectors
- Index: `/sectors`
- Detail: `/sectors/[sectorSlug]`

### 5.5 Success Stories
- Index: `/success-stories`
- Detail: `/success-stories/[storySlug]`

---

## 6) Alignment with As-Is Scaffold
This IA exactly matches the structure under:

