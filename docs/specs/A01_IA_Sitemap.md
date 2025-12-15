docs/specs/A01_IA_Sitemap.md

# A01 — Information Architecture (IA) & Sitemap
**Status:** Draft (v0.1)  
**Scope:** Public site navigation, page inventory, and collection routing map.  
**Source (as-is routing):** `A00_AsIs_AppTree.*`

## 1) IA principles (v1)
- Prioritize clear top-level journeys: **Why El Salvador**, **Why Invest**, **How to Invest**, **Sectors**, **Insights**, **News/Events**, **Contact**.
- Keep “About” informational; keep “Legal” in footer.
- Collections must support index + detail with consistent patterns.
- Locale is always present in URL: `/{locale}/...` (see `A00`).

## 2) Proposed primary navigation (top header)
**Top-level (recommended):**
1. Why El Salvador
2. Why Invest
3. How to Invest
4. Sectors
5. Success Stories
6. Insights
7. News & Events
8. Media
9. About
10. Contact

**Notes**
- “News & Events” may be split into two items if required by stakeholder preference.
- “Media” can remain top-level due to downloads/gallery being frequent press assets.

## 3) Footer navigation (recommended)
- Legal: Accessibility, Cookies, Privacy, Terms
- “Manage cookies” link (ties to `E03_Cookies_Consent.*`) — **TBD**
- Standard corporate/footer links — **TBD**

## 4) Page inventory (locale-scoped)
All paths below are implicitly prefixed with `/{locale}`.

### 4.1 Static pages (content pages)
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
- `/contact`
- `/contact/invest-support`
- `/media`
- `/media/downloads`
- `/media/gallery`
- `/legal/accessibility`
- `/legal/cookies`
- `/legal/privacy`
- `/legal/terms`

### 4.2 Collection pages (index + detail)
- News: `/news` and `/news/[slug]`
- Events: `/events` and `/events/[slug]`
- Reports: `/insights/reports` and `/insights/reports/[slug]`
- Sectors: `/sectors` and `/sectors/[sectorSlug]`
- Success stories: `/success-stories` and `/success-stories/[storySlug]`

**Collection source of truth:** Headless WP (expected) — see `D01_WordPress_Headless.*` (TBD mapping).

## 5) IA alignment to scaffold (as-is)
This IA matches current App Router structure under:
- `app/(routes)/[locale]/...` (see `A00_AsIs_AppTree.*`)

## 6) Open questions
- Final header nav ordering and whether to merge/split News vs Events.
- Whether “Media” remains top-level or moves under About/Insights.
- Which sections are CMS-driven vs static long-term (some static pages may be CMS-managed later).
- Locale strategy: default locale prefix rule and translation workflow (see `C01_i18n_Locales.*`).
