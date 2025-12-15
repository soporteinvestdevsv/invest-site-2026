docs/specs/MANIFEST.md

# Specs Manifest (docs/specs)

Purpose: This folder is the authoritative documentation suite for the INVEST investment site.  
Each spec is maintained in two formats:
- **Human-readable:** `*.md`
- **LLM/tooling:** `*.tok.json` (structured, token-oriented)

## Naming rules
- Document ID format: `<DomainLetter><TwoDigit>` (e.g., `A00`, `B01`, `P00`)
- Paired files share the same ID (e.g., `A00_*.md` + `A00_*.tok.json`)
- Cross-references in `.tok.json` use: `{"ref":{"doc":"A01","sec":"..."}}`

## Read order (humans)
1) `MANIFEST.md` (this file)
2) `P00_PRD.md`
3) Supporting specs in this order (typical):
   - IA/UI: `Axx_*`
   - Architecture: `Bxx_*`
   - Content/i18n: `Cxx_*`
   - Integrations: `Dxx_*`
   - Security/Privacy: `Exx_*`
   - DevOps: `Fxx_*`
   - QA/Acceptance: `Gxx_*`
   - SEO/Analytics: `Hxx_*`
   - Governance: `Zxx_*`

## Load order (LLM)
1) `MANIFEST.tok.json`
2) `P00_PRD.tok.json`
3) Follow `rel[]` and `ref.doc` pointers to load only the minimum required supporting docs.

## Current specs (as-is inventories and governance)
| ID  | Files | Status | Summary | Depends on |
|-----|-------|--------|---------|------------|
| A00 | `A00_AsIs_AppTree.md` / `.tok.json` | as_is | App Router inventory (routes, dynamic params, route patterns) | C01, D01 |
| B00 | `B00_AsIs_ComponentsTree.md` / `.tok.json` | as_is | Components inventory (layout + privacy; ui/ reserved; sections/ empty) | A02, E03, B04 |
| B01 | `B01_AsIs_LibTree.md` / `.tok.json` | as_is | lib/ inventory (i18n, privacy, wp; seo/ empty) | C01, E03, D01, H01 |
| Z00 | `Z00_AsIs_DocsTree.md` / `.tok.json` | as_is | docs/ inventory + mapping of raw snapshots → derived specs | Z01 |
| Z10 | `Z10_Summary_SpecsBootstrap.md` | draft | Human summary of the specs bootstrap state | — |
| Z11 | `Z11_Checklist_SpecAuthoring.md` | draft | Authoring checklist (one doc at a time) | — |

## Planned core specs (next to write)
| ID  | Files | Status | Summary |
|-----|-------|--------|---------|
| MANIFEST | `MANIFEST.md` / `MANIFEST.tok.json` | active | Index + read/load order + dependency map |
| P00 | `P00_PRD.md` / `.tok.json` | planned | Master PRD (scope, requirements, acceptance) |
| C01 | `C01_i18n_Locales.md` / `.tok.json` | planned | Locales, routing behavior, translation workflow |
| E03 | `E03_Cookies_Consent.md` / `.tok.json` | planned | Consent categories, cookie schema, banner + scripts behavior |
| D01 | `D01_WordPress_Headless.md` / `.tok.json` | planned | WP client, content types mapping, queries, caching/revalidation |

## Governance
- If behavior changes, update the relevant spec(s) in the same PR.
- Record major decisions in `Z02_Decisions_Log.*` (once created).
- Keep `.md` and `.tok.json` pairs consistent (same scope, same IDs, aligned references).
