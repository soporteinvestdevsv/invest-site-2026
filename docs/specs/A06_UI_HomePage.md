# A06 — UI Home Page (Landing Page Structure)
**Status:** Draft (v0.1)  
**Scope:** Home page layout, section composition, content requirements, and integration with dynamic CMS content.  
**Related specs:** `A01_IA_Sitemap.*`, `A03_UI_DesignTokens.*`, `D01_WordPress_Headless.*`, `H01_SEO_Metadata.*`

---

## 1) Page Responsibilities
The home page (`/{locale}/`) serves as the primary entry point for the INVEST El Salvador website and must:
- Communicate El Salvador's value proposition for investors
- Showcase key investment sectors and success stories
- Provide clear pathways to deeper content (Why El Salvador, How to Invest, Sectors)
- Display dynamic content from WordPress (latest news, events)
- Drive conversions through strategic CTAs (Contact, Download guides)
- Deliver exceptional performance (Core Web Vitals targets per `H01`)

---

## 2) Page Structure (Section Composition)
The home page is composed of **7 distinct sections**, rendered in order:

### 2.1 Section Order (Top to Bottom)
1. **Hero Section** (`A07`) — Full-width hero banner with primary CTA
2. **Stats Counter** (`A13`) — Key metrics showcasing El Salvador's investment climate
3. **Value Propositions** (`A08`) — Why El Salvador highlights (3-4 key benefits)
4. **Featured Sectors** (`A09`) — Investment sectors showcase (grid/carousel)
5. **Success Stories** (`A10`) — Investor testimonials and case studies
6. **News & Events Preview** (`A11`) — Latest 3-4 news items and upcoming events
7. **CTA Section** (`A12`) — Final conversion section (Contact/Download)

### 2.2 Section Spacing
- Vertical spacing between sections: `py-16 md:py-20 lg:py-24` (using design tokens)
- Container max-width: `max-w-7xl mx-auto` (per `A03`)
- Horizontal padding: `px-4 sm:px-6` (per `A03`)

---

## 3) Content Strategy

### 3.1 Static Content
Sections with static/configured content (managed via i18n files or config):
- Hero Section (headline, subheadline, CTA text)
- Stats Counter (metrics, labels)
- Value Propositions (titles, descriptions, icons)
- CTA Section (headline, description, button text)

### 3.2 Dynamic Content (WordPress Integration)
Sections pulling from headless WordPress (`D01`):
- **Featured Sectors**: Query top 4-6 sectors by priority/featured flag
- **Success Stories**: Query 3 featured success stories
- **News & Events Preview**: Query latest 3 news items + next 2 upcoming events

### 3.3 Fallback Behavior
If WordPress queries fail or return empty:
- Featured Sectors: Show placeholder cards with generic sector names
- Success Stories: Hide section entirely (graceful degradation)
- News & Events: Show "Coming soon" message or hide section

---

## 4) SEO Requirements (per H01)

### 4.1 Metadata
- **Title**: `{locale === 'en' ? 'Invest in El Salvador | INVEST' : 'Invertir en El Salvador | INVEST'}`
- **Description**: Compelling 150-160 character summary of investment opportunities
- **Open Graph**: Hero image, title, description
- **Canonical URL**: `https://investinelsalvador.gob.sv/{locale}`

### 4.2 Structured Data
- Organization schema (INVEST entity)
- WebSite schema with search action
- BreadcrumbList schema (home only)

### 4.3 Performance Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- Hero image must use Next.js Image optimization with priority loading

---

## 5) Responsive Behavior

### 5.1 Breakpoints (Tailwind defaults)
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: ≥ 1024px

### 5.2 Layout Adaptations
- **Hero**: Full-width on all devices; text overlay adjusts padding
- **Stats**: 2 columns mobile → 4 columns desktop
- **Value Props**: Stack on mobile → 2 columns tablet → 3-4 columns desktop
- **Sectors**: Carousel on mobile → Grid on desktop
- **Success Stories**: Single column mobile → 3 columns desktop
- **News/Events**: Stack on mobile → Side-by-side on desktop

---

## 6) Accessibility Requirements

### 6.1 Semantic HTML
- Use `<main>` wrapper for all home page content
- Each section uses `<section>` with appropriate heading hierarchy
- Hero uses `<h1>` (only one per page)
- Section titles use `<h2>`
- Subsection titles use `<h3>`

### 6.2 ARIA Labels
- Sections should have `aria-labelledby` pointing to section heading IDs
- Interactive elements (carousels, accordions) require proper ARIA states

### 6.3 Keyboard Navigation
- All CTAs and links must be keyboard accessible
- Carousels must support arrow key navigation
- Focus indicators must be visible (design token-based)

### 6.4 Color Contrast
- All text must meet WCAG AA standards (4.5:1 for body, 3:1 for large text)
- Verify using design tokens from `A03`

---

## 7) i18n Requirements

### 7.1 Translation Keys
All static content must use translation keys from `messages/{locale}.json`:

```
home.hero.headline
home.hero.subheadline
home.hero.cta_primary
home.hero.cta_secondary
home.stats.title
home.stats.metric_1_label
home.stats.metric_1_value
home.value_props.title
home.value_props.item_1_title
home.value_props.item_1_description
home.sectors.title
home.sectors.view_all
home.success_stories.title
home.news_events.title
home.news_events.view_all_news
home.news_events.view_all_events
home.cta.headline
home.cta.description
home.cta.button_text
```

### 7.2 Dynamic Content Localization
- WordPress content must be queried with locale parameter
- Fallback to English if locale-specific content unavailable

---

## 8) Component Integration

### 8.1 Component File Structure
```
app/(routes)/[locale]/page.tsx          # Home page route
components/sections/HeroSection.tsx     # A07
components/sections/StatsCounter.tsx    # A13
components/sections/ValuePropositions.tsx # A08
components/sections/FeaturedSectors.tsx # A09
components/sections/SuccessStories.tsx  # A10
components/sections/NewsEventsPreview.tsx # A11
components/sections/CTASection.tsx      # A12
```

### 8.2 Data Fetching Strategy
- Server Components for all sections (default)
- WordPress queries use `fetch` with revalidation per `D01`
- Static content loaded from i18n messages server-side

### 8.3 Component Props Pattern
Each section component receives:
```typescript
interface SectionProps {
  locale: string;
  // Additional props specific to section (see individual component specs)
}
```

---

## 9) Acceptance Criteria

- **A06-AC-001**: Home page renders all 7 sections in correct order
- **A06-AC-002**: Page uses only design tokens from `A03` (no hard-coded colors/spacing)
- **A06-AC-003**: All static text uses i18n translation keys
- **A06-AC-004**: WordPress content displays correctly with graceful fallbacks
- **A06-AC-005**: Page meets Core Web Vitals targets (LCP < 2.5s, CLS < 0.1)
- **A06-AC-006**: SEO metadata is complete and correct per `H01`
- **A06-AC-007**: Page is fully responsive across mobile/tablet/desktop
- **A06-AC-008**: All interactive elements are keyboard accessible
- **A06-AC-009**: Color contrast meets WCAG AA standards
- **A06-AC-010**: Hero image loads with priority, other images lazy load

---

## 10) Open Questions

- Should stats counter data be static config or pulled from WordPress custom fields?
- Should we implement A/B testing capability for hero CTAs in v1?
- What is the revalidation strategy for WordPress content (ISR interval)?
- Should success stories have a dedicated collection or be a custom post type?
- Do we need animation/scroll effects (GSAP) or keep it simple for v1?

---

## 11) Related Component Specifications

Each section has its own detailed specification:
- `A07_UI_HeroSection.*` — Hero banner component
- `A08_UI_ValuePropositions.*` — Value props grid
- `A09_UI_FeaturedSectors.*` — Sectors showcase
- `A10_UI_SuccessStories.*` — Testimonials/case studies
- `A11_UI_NewsEventsPreview.*` — News/events feed
- `A12_UI_CTASection.*` — Final CTA section
- `A13_UI_StatsCounter.*` — Statistics display

Refer to individual component specs for detailed requirements, props, and acceptance criteria.
