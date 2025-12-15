docs/specs/D01_WordPress_Headless.md

# D01 — Headless WordPress Integration
**Status:** Draft (v0.1)  
**Scope:** WordPress client, query layer, content mapping, and rendering strategy for dynamic collections.

## 1) Current scaffold facts (as-is)
Implementation files exist under `lib/wp/`:
- `lib/wp/client.ts`
- `lib/wp/queries.ts`
- `lib/wp/types.ts`
- `lib/wp/mappers.ts`
(see `B01_AsIs_LibTree.*`)

Dynamic collection routes exist (locale-scoped):
- `/{locale}/news` + `/{locale}/news/[slug]`
- `/{locale}/events` + `/{locale}/events/[slug]`
- `/{locale}/insights/reports` + `/{locale}/insights/reports/[slug]`
- `/{locale}/sectors` + `/{locale}/sectors/[sectorSlug]`
- `/{locale}/success-stories` + `/{locale}/success-stories/[storySlug]`
(see `A00_AsIs_AppTree.*`)

Revalidation endpoint exists:
- `/api/revalidate` (`app/api/revalidate/route.ts`)

## 2) Objectives
- Provide a stable integration layer to fetch CMS content for dynamic pages.
- Define the content model mapping between WP entities and site routes/components.
- Support caching and revalidation strategies appropriate for public content.
- Ensure graceful degradation for CMS errors (fallback UI + appropriate status).

## 3) Integration architecture (expected layering)
- `client.ts`: low-level HTTP client (base URL, auth if needed, headers, fetch wrappers)
- `queries.ts`: query functions (by slug, list, taxonomy filters, pagination)
- `types.ts`: TypeScript types representing WP responses + internal domain models
- `mappers.ts`: map WP responses → internal models used by UI components

## 4) Content collections mapping (route → CMS entity)
**Decision (Implementation):**
- **News** (`/news`): Custom Post Type `news` (or `post` with category 'news').
- **Events** (`/events`): Custom Post Type `event`.
- **Reports** (`/insights/reports`): Custom Post Type `report`.
- **Sectors** (`/sectors`): Custom Post Type `sector` (archive + single).
- **Success stories** (`/success-stories`): Custom Post Type `success_story`.

(Note: All CPTs must be enabled for REST API / GraphQL and localization).

For each collection, define:
- unique identifier policy (slug)
- locale policy (translated post types or per-locale sites)
- required fields (title, excerpt, content, hero image, publish date, etc.)

## 5) Caching + revalidation strategy
**Decision:**
- **Standard**: ISR (Incremental Static Regeneration) with a default revalidate time (e.g., `3600` seconds).
- **On-Demand**: Trigger `/api/revalidate` from WordPress (via webhook/plugin) on post save.
- **Tag-based**: Use `next-validate-tags` where possible to clear specific caches by collection name (e.g., `revalidateTag('news')`).

## 6) Error handling & fallbacks
- Invalid slug:
  - return Not Found (Next.js `notFound()`).
- WP fetch failure:
  - show friendly error state and log (observability TBD).
- Empty list:
  - show empty-state UI (not error).

## 7) Security and configuration
- WP base URL must be configured via environment variable (name TBD).
- If `/api/revalidate` is used:
  - require `REVALIDATE_SECRET` (Bearer token or query param).
  - validate requests (see `E01_Security_Baseline.*`).
- Avoid exposing WP secrets client-side.

## 8) Requirements
- **D01-FR-001:** Implement stable WP client and query layer under `lib/wp/*`.
- **D01-FR-002:** Map each dynamic route collection to a defined WP entity model.
- **D01-FR-003:** Implement caching and revalidation strategy for dynamic content.
- **D01-FR-004:** Handle invalid slugs with not-found; handle fetch failures gracefully.
- **D01-NFR-001:** Avoid leaking secrets and comply with security baseline.

**Decision Z02-20251215-06:**
- Localization via Polylang/WPML (1:1 post mapping).
- Caching via ISR + Tags.
