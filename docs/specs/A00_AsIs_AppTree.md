/app

# TOK Nomenclature
A01_IA_Sitemap.tok.json
A01_IA_Sitemap.md

# App Router tree (relative)
app/
  error.tsx
  globals.css
  layout.tsx
  not-found.tsx
  robots.ts
  sitemap.ts

  (routes)/
    [locale]/
      layout.tsx
      page.tsx

      about/
        page.tsx
        governance/
          page.tsx
        team/
          page.tsx

      contact/
        page.tsx
        invest-support/
          page.tsx

      events/
        page.tsx
        [slug]/
          page.tsx

      how-to-invest/
        page.tsx
        faqs/
          page.tsx
        requirements/
          page.tsx
        steps/
          page.tsx

      insights/
        page.tsx
        reports/
          page.tsx
          [slug]/
            page.tsx

      legal/
        accessibility/
          page.tsx
        cookies/
          page.tsx
        privacy/
          page.tsx
        terms/
          page.tsx

      media/
        page.tsx
        downloads/
          page.tsx
        gallery/
          page.tsx

      news/
        page.tsx
        [slug]/
          page.tsx

      sectors/
        page.tsx
        [sectorSlug]/
          page.tsx

      success-stories/
        page.tsx
        [storySlug]/
          page.tsx

      why-el-salvador/
        page.tsx
        connectivity/
          page.tsx
        macroeconomy/
          page.tsx
        quality-of-life/
          page.tsx
        talent/
          page.tsx

      why-invest/
        page.tsx
        incentives/
          page.tsx
        services/
          page.tsx

  api/
    contact/
      route.ts
    revalidate/
      route.ts
