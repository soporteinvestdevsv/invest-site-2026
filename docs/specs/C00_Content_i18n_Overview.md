docs/specs/C00_Content_i18n_Overview.md

# C00 — Content & i18n Overview
**Status:** Draft (v0.1)  
**Scope:** Content ownership model, source-of-truth rules, translation workflow, and how content is delivered across static pages and CMS-driven collections.

## 1) Purpose
This document defines the content system at a governance level:
- Where content lives (repo vs CMS vs external systems)
- Who owns it (product/editorial/engineering)
- How it is translated and published
- How it maps to routes/components

Detailed locale mechanics are specified in `C01_i18n_Locales.*`.

## 2) Authoritative inputs (as-is)
- Routes: `A00_AsIs_AppTree.*`
- Components: `B00_AsIs_ComponentsTree.*`
- Libraries: `B01_AsIs_LibTree.*`
- Locale strategy details: `C01_i18n_Locales.*`
- CMS integration details: `D01_WordPress_Headless.*`

## 3) Core principles (v1)
- **URL locale is authoritative**: `/{locale}/...` (see `C01`).
- **Single source of truth per content type**: content should not be duplicated across repo and CMS.
- **Composable UI**: UI components render content; content does not define UI layout logic.
- **Progressive migration allowed**: a page can start as repo-managed and later migrate to CMS, but migration must be recorded in `Z02_Decisions_Log.*`.

## 4) Content domains & ownership (high-level)
- **Institutional content** (About, Governance, Team): Editorial + Product (engineering supports layout).
- **Investment narrative** (Why El Salvador, Why Invest): Editorial + Product.
- **Guides** (How to Invest, Steps, Requirements, FAQs): Product + Editorial.
- **Collections** (News, Events, Reports, Sectors, Success Stories): Editorial (published via CMS).
- **Legal** (Privacy, Cookies, Terms, Accessibility): Legal owner; Editorial publishes; Engineering implements UX links/behavior.
- **Media assets** (Downloads, Gallery): Editorial / Media manager (source system TBD).

## 5) Source-of-truth matrix (v1)
**TBD where noted; intent is to standardize decisions.**

### 5.1 Repo-managed (code or files)
- Global navigation labels (may be localized via dictionaries) — **TBD**
- UI microcopy (buttons, system messages) — **TBD**
- System configuration text (error states, generic fallbacks)

### 5.2 CMS-managed (Headless WordPress expected)
- News articles
- Events
- Reports / Insights detail content
- Sector detail pages (if modelled in WP)
- Success story detail pages (if modelled in WP)

(Exact mapping defined in `D01`.)

### 5.3 External-managed (optional)
- Media repository / DAM for downloads & gallery — **TBD**
- Translation management system (TMS) — **TBD**

## 6) Translation workflow (overview)
**Decision required** for the primary translation source of truth:
- Option A: Repo dictionaries (JSON/TS) per locale for all static and UI strings.
- Option B: CMS-managed translations (WP localization plugin/workflow).
- Option C: External TMS syncing to repo and/or CMS.

Minimum viable:
- Locale routing in code + translations for static/UI strings in repo
- CMS content translated within WP (if supported)

All locale rules and fallback behavior are defined in `C01`.

## 7) Page-type patterns
- **Static pages**: structured content blocks rendered by page modules; content may be inline initially but should be extractable.
- **Collection index pages**: list + filters/pagination (TBD).
- **Collection detail pages**: canonical slug rendering + SEO metadata + share images (TBD in `H01`).

## 8) Requirements
- **C00-FR-001:** Each content type must have one source of truth (repo or CMS or external).
- **C00-FR-002:** Ownership for each content domain must be explicit (editorial/legal/product/engineering).
- **C00-FR-003:** Translation workflow must be defined and documented (repo/CMS/TMS).
- **C00-NFR-001:** Content updates must have a predictable publishing path (draft → review → publish).

## 9) Open questions
- Will static pages be CMS-managed long-term, or remain code-managed?
- How are WP translations handled (WPML/Polylang/multisite/custom)?
- Where do media downloads/gallery assets live (WP vs external DAM)?
- Who is the approver for legal content changes, and how are releases coordinated?
