# A07 — UI Hero Section Component
**Status:** Draft (v0.1)  
**Scope:** Full-width hero banner for home page with headline, subheadline, dual CTAs, and background image/video.  
**Parent spec:** `A06_UI_HomePage.*`  
**Related specs:** `A03_UI_DesignTokens.*`, `C01_i18n_Locales.*`, `H01_SEO_Metadata.*`

---

## 1) Component Responsibilities
- Serve as the primary visual anchor and first impression for the home page
- Communicate INVEST's core value proposition in a single compelling headline
- Provide clear primary and secondary call-to-action paths
- Display high-quality background media (image or video)
- Maintain excellent performance (LCP < 2.5s per `H01`)
- Adapt seamlessly across mobile, tablet, and desktop viewports

---

## 2) Component API

### 2.1 Component Signature
```typescript
interface HeroSectionProps {
  locale: string;
  headline?: string;        // Optional override (defaults to i18n key)
  subheadline?: string;     // Optional override (defaults to i18n key)
  ctaPrimary?: {
    text?: string;
    href?: string;
  };
  ctaSecondary?: {
    text?: string;
    href?: string;
  };
  backgroundMedia?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;           // Required for images
    poster?: string;        // Required for videos
  };
}

export default function HeroSection(props: HeroSectionProps): JSX.Element;
```

### 2.2 Default Behavior
If props are not provided, component uses i18n translation keys:
- `headline`: `home.hero.headline`
- `subheadline`: `home.hero.subheadline`
- `ctaPrimary.text`: `home.hero.cta_primary`
- `ctaPrimary.href`: `/{locale}/contact`
- `ctaSecondary.text`: `home.hero.cta_secondary`
- `ctaSecondary.href`: `/{locale}/how-to-invest`
- `backgroundMedia`: Default image from `/public/images/hero/home-hero.jpg`

---

## 3) Visual Design

### 3.1 Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  Background Image/Video (full-width, fixed height)     │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Dark Overlay (gradient or solid with opacity)   │ │
│  │  ┌─────────────────────────────────────────────┐ │ │
│  │  │  Content Container (max-w-7xl, centered)    │ │ │
│  │  │                                             │ │ │
│  │  │  Headline (h1, large, bold)                 │ │ │
│  │  │  Subheadline (p, medium)                    │ │ │
│  │  │                                             │ │ │
│  │  │  [Primary CTA]  [Secondary CTA]             │ │ │
│  │  └─────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Dimensions
- **Height**:
  - Mobile: `min-h-[500px]` or `h-[60vh]`
  - Tablet: `min-h-[600px]` or `h-[70vh]`
  - Desktop: `min-h-[700px]` or `h-[80vh]`
  - Max height: `max-h-[900px]` (prevent excessive height on large screens)

- **Content Container**:
  - Max width: `max-w-7xl` (per `A03`)
  - Horizontal padding: `px-4 sm:px-6 lg:px-8`
  - Vertical centering: `flex items-center justify-center` or `grid place-items-center`

### 3.3 Background Media
- **Image**:
  - Use Next.js `<Image>` component with `fill` layout
  - `priority={true}` for LCP optimization
  - `quality={90}` for hero images
  - `sizes="100vw"` (full viewport width)
  - Object fit: `object-cover` with `object-center`

- **Video** (optional, v2):
  - Autoplay, muted, loop
  - Poster image required (fallback for slow connections)
  - Consider performance impact; may defer to v2

### 3.4 Overlay
- Background: `bg-brand-primary/70` or `bg-black/50` (design token-based)
- Alternative: Gradient overlay `bg-gradient-to-r from-brand-primary/80 to-brand-primary/40`
- Purpose: Ensure text contrast meets WCAG AA standards

---

## 4) Typography & Content

### 4.1 Headline (h1)
- **Font size**:
  - Mobile: `text-4xl` (36px)
  - Tablet: `text-5xl` (48px)
  - Desktop: `text-6xl` or `text-7xl` (60-72px)
- **Weight**: `font-bold` (700)
- **Color**: `text-white` or `text-brand-primary-invert` (per `A03`)
- **Line height**: `leading-tight` (1.2)
- **Max width**: `max-w-4xl` (prevent overly long lines)
- **Text alignment**: `text-center` or `text-left` (design decision)

### 4.2 Subheadline (p)
- **Font size**:
  - Mobile: `text-lg` (18px)
  - Desktop: `text-xl` or `text-2xl` (20-24px)
- **Weight**: `font-normal` (400) or `font-medium` (500)
- **Color**: `text-white/90` or `text-brand-primary-invert/90`
- **Line height**: `leading-relaxed` (1.7)
- **Max width**: `max-w-2xl`
- **Margin top**: `mt-4` or `mt-6`

### 4.3 Content Guidelines
- **Headline**: 5-10 words, action-oriented, benefit-focused
  - Example (EN): "Invest in El Salvador's Growing Economy"
  - Example (ES): "Invierta en la Economía Creciente de El Salvador"
- **Subheadline**: 15-25 words, supporting detail, value proposition
  - Example (EN): "Discover world-class infrastructure, competitive incentives, and a strategic location for your business expansion."

---

## 5) Call-to-Action Buttons

### 5.1 Button Layout
- **Container**: Horizontal flex on desktop, stack on mobile
  - Desktop: `flex gap-4`
  - Mobile: `flex flex-col gap-3` or `flex flex-wrap gap-3`
- **Margin top**: `mt-8` or `mt-10` (spacing from subheadline)

### 5.2 Primary CTA
- **Style**: Solid button with brand color
  - Background: `bg-white` or `bg-brand-accent`
  - Text color: `text-brand-primary`
  - Padding: `px-8 py-4` (large touch target)
  - Border radius: `rounded-2xl` (per `A03`)
  - Font: `text-base font-semibold`
  - Hover: `hover:bg-white/90` + `transition-colors duration-200`
  - Focus: `focus:ring-4 focus:ring-white/50`

### 5.3 Secondary CTA
- **Style**: Outline/ghost button
  - Background: `bg-transparent`
  - Border: `border-2 border-white`
  - Text color: `text-white`
  - Padding: `px-8 py-4`
  - Border radius: `rounded-2xl`
  - Font: `text-base font-semibold`
  - Hover: `hover:bg-white/10`
  - Focus: `focus:ring-4 focus:ring-white/50`

### 5.4 Button Behavior
- Both buttons are `<Link>` components (Next.js) for client-side navigation
- Locale-aware hrefs: `/{locale}/contact`, `/{locale}/how-to-invest`
- Accessible: Proper focus states, keyboard navigable

---

## 6) Responsive Behavior

### 6.1 Mobile (< 640px)
- Stack all content vertically
- Headline: `text-4xl`, centered
- Subheadline: `text-lg`, centered
- CTAs: Full width or centered, stacked vertically
- Padding: `px-4 py-12`

### 6.2 Tablet (640px - 1024px)
- Headline: `text-5xl`
- Subheadline: `text-xl`
- CTAs: Horizontal layout, centered
- Padding: `px-6 py-16`

### 6.3 Desktop (≥ 1024px)
- Headline: `text-6xl` or `text-7xl`
- Subheadline: `text-2xl`
- CTAs: Horizontal layout
- Content can be left-aligned or centered (design decision)
- Padding: `px-8 py-20`

---

## 7) Accessibility Requirements

### 7.1 Semantic HTML
- Wrapper: `<section aria-labelledby="hero-headline">`
- Headline: `<h1 id="hero-headline">`
- Subheadline: `<p>`
- CTAs: `<Link>` (Next.js) rendered as `<a>`

### 7.2 Image Accessibility
- Background image must have `alt=""` (decorative) or descriptive alt text
- Overlay ensures text contrast ratio ≥ 4.5:1 (WCAG AA)

### 7.3 Keyboard Navigation
- Both CTAs must be keyboard accessible
- Focus indicators must be clearly visible
- Tab order: Headline → Subheadline → Primary CTA → Secondary CTA

### 7.4 Screen Readers
- Ensure headline is announced as `<h1>` (page title)
- CTAs have descriptive link text (avoid "Click here")

---

## 8) Performance Optimization

### 8.1 Image Loading
- Use Next.js `<Image>` with `priority={true}` for hero image
- Serve WebP format with JPEG fallback
- Responsive image sizes: `sizes="100vw"`
- Lazy load any additional decorative images

### 8.2 LCP Target
- Hero image is typically the LCP element
- Target: LCP < 2.5s (per `H01`)
- Preload hero image: `<link rel="preload" as="image" href="..." />`

### 8.3 CLS Prevention
- Reserve space for hero section with fixed/min height
- Avoid layout shifts during image load
- Use `object-cover` to maintain aspect ratio

---

## 9) i18n Integration

### 9.1 Translation Keys
Required keys in `messages/{locale}.json`:
```json
{
  "home": {
    "hero": {
      "headline": "Invest in El Salvador's Growing Economy",
      "subheadline": "Discover world-class infrastructure, competitive incentives, and a strategic location for your business expansion.",
      "cta_primary": "Contact Us",
      "cta_secondary": "How to Invest"
    }
  }
}
```

### 9.2 Locale-Aware Links
- Primary CTA: `/{locale}/contact`
- Secondary CTA: `/{locale}/how-to-invest`

---

## 10) Acceptance Criteria

- **A07-AC-001**: Hero section renders with correct headline, subheadline, and CTAs
- **A07-AC-002**: Background image loads with priority and meets LCP < 2.5s target
- **A07-AC-003**: Text overlay ensures WCAG AA contrast ratio (≥ 4.5:1)
- **A07-AC-004**: Component uses only design tokens from `A03` (no hard-coded colors)
- **A07-AC-005**: All text uses i18n translation keys
- **A07-AC-006**: CTAs are keyboard accessible with visible focus states
- **A07-AC-007**: Component is fully responsive (mobile/tablet/desktop)
- **A07-AC-008**: No CLS during image load (reserved height)
- **A07-AC-009**: Headline is semantic `<h1>` (only one per page)
- **A07-AC-010**: Both CTAs link to correct locale-aware paths

---

## 11) Implementation Notes

### 11.1 File Location
- `components/sections/HeroSection.tsx`

### 11.2 Dependencies
- `next/image` (Image component)
- `next/link` (Link component)
- `next-intl` or custom i18n hook for translations

### 11.3 Example Usage
```tsx
// In app/(routes)/[locale]/page.tsx
import HeroSection from '@/components/sections/HeroSection';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <main>
      <HeroSection locale={locale} />
      {/* Other sections... */}
    </main>
  );
}
```

---

## 12) Open Questions

- Should we support video backgrounds in v1 or defer to v2?
- Should headline/subheadline be editable via CMS (WordPress) or remain in i18n files?
- Do we need A/B testing variants for CTAs?
- Should we add scroll indicator (down arrow) at bottom of hero?
- Animation on load (fade-in, slide-up) or keep static for performance?
