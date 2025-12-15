docs/specs/A00_AsIs_AppTree.md

# A00 — As-Is App Router Tree (Snapshot)
**Captured from:** `tree /f /a` (Windows)  
**Root:** `app/`

```txt
Folder PATH listing
Volume serial number is 40F3-1688
C:\INVEST\DEV\INVEST-SITE\INVEST-SITE-2026\APP
|   error.tsx
|   globals.css
|   layout.tsx
|   not-found.tsx
|   robots.ts
|   sitemap.ts
|
+---(routes)
|   \---[locale]
|       |   layout.tsx
|       |   page.tsx
|       |
|       +---about
|       |   |   page.tsx
|       |   |
|       |   +---governance
|       |   |       page.tsx
|       |   |
|       |   \---team
|       |           page.tsx
|       |
|       +---contact
|       |   |   page.tsx
|       |   |
|       |   \---invest-support
|       |           page.tsx
|       |
|       +---events
|       |   |   page.tsx
|       |   |
|       |   \---[slug]
|       |           page.tsx
|       |
|       +---how-to-invest
|       |   |   page.tsx
|       |   |
|       |   +---faqs
|       |   |       page.tsx
|       |   |
|       |   +---requirements
|       |   |       page.tsx
|       |   |
|       |   \---steps
|       |           page.tsx
|       |
|       +---insights
|       |   |   page.tsx
|       |   |
|       |   \---reports
|       |       |   page.tsx
|       |       |
|       |       \---[slug]
|       |               page.tsx
|       |
|       +---legal
|       |   +---accessibility
|       |   |       page.tsx
|       |   |
|       |   +---cookies
|       |   |       page.tsx
|       |   |
|       |   +---privacy
|       |   |       page.tsx
|       |   |
|       |   \---terms
|       |           page.tsx
|       |
|       +---media
|       |   |   page.tsx
|       |   |
|       |   +---downloads
|       |   |       page.tsx
|       |   |
|       |   \---gallery
|       |           page.tsx
|       |
|       +---news
|       |   |   page.tsx
|       |   |
|       |   \---[slug]
|       |           page.tsx
|       |
|       +---sectors
|       |   |   page.tsx
|       |   |
|       |   \---[sectorSlug]
|       |           page.tsx
|       |
|       +---success-stories
|       |   |   page.tsx
|       |   |
|       |   \---[storySlug]
|       |           page.tsx
|       |
|       +---why-el-salvador
|       |   |   page.tsx
|       |   |
|       |   +---connectivity
|       |   |       page.tsx
|       |   |
|       |   +---macroeconomy
|       |   |       page.tsx
|       |   |
|       |   +---quality-of-life
|       |   |       page.tsx
|       |   |
|       |   \---talent
|       |           page.tsx
|       |
|       \---why-invest
|           |   page.tsx
|           |
|           +---incentives
|           |       page.tsx
|           |
|           \---services
|                   page.tsx
|
\---api
    +---contact
    |       route.ts
    |
    \---revalidate
            route.ts
