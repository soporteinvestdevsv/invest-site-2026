# A08 — UI Value Propositions Component
**Status:** Draft (v0.1)  
**Scope:** Grid-based section showcasing 3-4 key value propositions for investing in El Salvador.  
**Parent spec:** `A06_UI_HomePage.*`  
**Related specs:** `A03_UI_DesignTokens.*`, `C01_i18n_Locales.*`

---

## 1) Component Responsibilities
- Highlight El Salvador's top 3-4 investment advantages
- Present information in scannable, digestible format
- Use icons/illustrations to enhance visual appeal
- Support both static configuration and potential CMS integration
- Maintain consistency with design system (`A03`)

---

## 2) Component API

### 2.1 Component Signature
```typescript
interface ValueProp {
  id: string;
  icon: string;              // Icon name or path to SVG
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

interface ValuePropositionsProps {
  locale: string;
  title?: string;            // Section title (defaults to i18n)
  items?: ValueProp[];       // Custom items (defaults to config)
}

export default function ValuePropositions(props: ValuePropositionsProps): JSX.Element;
```

### 2.2 Default Configuration
Default items loaded from `config/valuePropositions.ts` or i18n:
1. **Strategic Location** - Central America hub, access to markets
2. **Competitive Incentives** - Tax benefits, free trade zones
3. **Skilled Workforce** - Bilingual talent, technical education
4. **Modern Infrastructure** - Connectivity, logistics, technology

---

## 3) Visual Design

### 3.1 Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  Section Container (max-w-7xl, centered)                │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Section Title (h2, centered)                     │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Icon    │  │  Icon    │  │  Icon    │  │  Icon  │ │
│  │  Title   │  │  Title   │  │  Title   │  │  Title │ │
│  │  Desc    │  │  Desc    │  │  Desc    │  │  Desc  │ │
│  │  [Link]  │  │  [Link]  │  │  [Link]  │  │ [Link] │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Grid Layout
- **Desktop (≥ 1024px)**: 4 columns (`grid-cols-4 gap-8`)
- **Tablet (640px - 1024px)**: 2 columns (`grid-cols-2 gap-6`)
- **Mobile (< 640px)**: 1 column (`grid-cols-1 gap-6`)

### 3.3 Card Styling
- Background: `bg-white` or `bg-surface-card` (per `A03`)
- Border: `border border-border-neutral` or no border (design decision)
- Border radius: `rounded-2xl` (per `A03`)
- Padding: `p-6 lg:p-8`
- Shadow: `shadow-md hover:shadow-lg` (subtle elevation)
- Transition: `transition-shadow duration-300`

---

## 4) Content Elements

### 4.1 Icon
- **Size**: `w-12 h-12` or `w-16 h-16`
- **Color**: `text-brand-primary` or custom accent color
- **Format**: SVG icons (inline or from icon library)
- **Margin bottom**: `mb-4`
- **Options**: 
  - Use icon library (Heroicons, Lucide)
  - Custom SVG illustrations
  - Image icons from `/public/images/icons/`

### 4.2 Title
- **Tag**: `<h3>`
- **Font size**: `text-xl lg:text-2xl`
- **Weight**: `font-semibold` (600)
- **Color**: `text-text-primary` (per `A03`)
- **Margin bottom**: `mb-2`
- **Max length**: 3-5 words

### 4.3 Description
- **Tag**: `<p>`
- **Font size**: `text-base`
- **Weight**: `font-normal` (400)
- **Color**: `text-text-muted` (per `A03`)
- **Line height**: `leading-relaxed` (1.7)
- **Max length**: 15-25 words

### 4.4 Link (Optional)
- **Tag**: `<Link>` (Next.js)
- **Text**: "Learn more →" or custom
- **Font size**: `text-sm`
- **Weight**: `font-medium` (500)
- **Color**: `text-brand-primary hover:underline`
- **Margin top**: `mt-4`

---

## 5) Responsive Behavior

### 5.1 Mobile (< 640px)
- Single column layout
- Cards stack vertically
- Full-width cards with consistent padding
- Icon size: `w-12 h-12`

### 5.2 Tablet (640px - 1024px)
- 2 columns
- Cards maintain aspect ratio
- Icon size: `w-14 h-14`

### 5.3 Desktop (≥ 1024px)
- 4 columns (or 3 if only 3 items)
- Hover effects on cards
- Icon size: `w-16 h-16`

---

## 6) Accessibility Requirements

### 6.1 Semantic HTML
- Section wrapper: `<section aria-labelledby="value-props-title">`
- Section title: `<h2 id="value-props-title">`
- Grid: `<div>` with grid classes
- Cards: `<article>` or `<div>`
- Card titles: `<h3>`

### 6.2 Icons
- Decorative icons: `aria-hidden="true"`
- If icons convey meaning: Include `aria-label`

### 6.3 Links
- Descriptive link text (avoid "Click here")
- Keyboard accessible
- Visible focus states

---

## 7) i18n Integration

### 7.1 Translation Keys
```json
{
  "home": {
    "value_props": {
      "title": "Why Invest in El Salvador",
      "item_1_title": "Strategic Location",
      "item_1_description": "Central America's gateway with access to major markets",
      "item_1_link": "Learn more",
      "item_2_title": "Competitive Incentives",
      "item_2_description": "Tax benefits and free trade zone advantages",
      "item_2_link": "Learn more",
      "item_3_title": "Skilled Workforce",
      "item_3_description": "Bilingual talent pool with technical expertise",
      "item_3_link": "Learn more",
      "item_4_title": "Modern Infrastructure",
      "item_4_description": "World-class connectivity and logistics",
      "item_4_link": "Learn more"
    }
  }
}
```

---

## 8) Acceptance Criteria

- **A08-AC-001**: Section renders 3-4 value proposition cards
- **A08-AC-002**: Grid layout adapts correctly (1/2/4 columns)
- **A08-AC-003**: Uses only design tokens from `A03`
- **A08-AC-004**: All text uses i18n translation keys
- **A08-AC-005**: Icons are accessible (aria-hidden or aria-label)
- **A08-AC-006**: Cards have hover states on desktop
- **A08-AC-007**: Links are keyboard accessible
- **A08-AC-008**: Section title is semantic `<h2>`
- **A08-AC-009**: Color contrast meets WCAG AA
- **A08-AC-010**: No layout shift during load

---

## 9) Implementation Notes

### 9.1 File Location
- `components/sections/ValuePropositions.tsx`

### 9.2 Icon Strategy
- Use Heroicons or Lucide React for consistency
- Alternative: Custom SVG components in `components/icons/`

### 9.3 Example Usage
```tsx
import ValuePropositions from '@/components/sections/ValuePropositions';

<ValuePropositions locale={locale} />
```

---

## 10) Open Questions

- Should items be configurable via WordPress custom fields?
- Should we support 3 or 4 items (or variable)?
- Animation on scroll (fade-in, slide-up) or static?
- Should cards be clickable (entire card as link) or just "Learn more"?
