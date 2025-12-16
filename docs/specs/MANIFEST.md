docs/specs/MANIFEST.md

# docs/specs — MANIFEST (Source of Truth Index)

This directory is the authoritative specification store for this repository.

## How to use
- **Humans:** Start with `P00_PRD.md`, then follow links by doc ID.
- **LLMs/tools:** Load `MANIFEST.tok.json` first, then `P00_PRD.tok.json`, then follow `ref.doc` pointers to load only what is needed.
- **Pairing rule:** Every spec has two files:
  - Human-readable: `X##_Name.md`
  - LLM-structured: `X##_Name.tok.json`

## Governance (required)
- **Z02 — Decisions Log:** Any decision that changes constraints/behavior (architecture, stack, policy, security posture, IA) must be recorded here and referenced from impacted specs.
  - `Z02_Decisions_Log.md`
  - `Z02_Decisions_Log.tok.json`

---

## Index (by domain)

### 0) Master
| ID | Title | Status | Files |
|----|-------|--------|-------|
| MANIFEST | Manifest Index | active | `MANIFEST.md`, `MANIFEST.tok.json` |
| P00 | Product Requirements Document (PRD) | draft | `P00_PRD.md`, `P00_PRD.tok.json` |

### 1) As-Is Inventories (scaffold snapshots)
| ID | Title | Status | Files |
|---|---|---|---|
| A00 | As-Is App Router Tree | as_is | `A00_AsIs_AppTree.md`, `A00_AsIs_AppTree.tok.json` |
| B00 | As-Is Components Tree | as_is | `B00_AsIs_ComponentsTree.md`, `B00_AsIs_ComponentsTree.tok.json` |
| B01 | As-Is Lib Tree | as_is | `B01_AsIs_LibTree.md`, `B01_AsIs_LibTree.tok.json` |
| Z00 | As-Is Docs Tree | as_is | `Z00_AsIs_DocsTree.md`, `Z00_AsIs_DocsTree.tok.json` |


### 2) IA / UX / UI
| ID | Title | Status | Files |
|---|---|---|---|
| A01 | Information Architecture (IA) & Sitemap | draft | `A01_IA_Sitemap.md`, `A01_IA_Sitemap.tok.json` |
| A02 | UI Layout Components (Header/Footer/Global Shell) | draft | `A02_UI_LayoutComponents.md`, `A02_UI_LayoutComponents.tok.json` |

### 3) Content & i18n
| ID | Title | Status | Files |
|---|---|---|---|
| C00 | Content & i18n Overview | draft | `C00_Content_i18n_Overview.md`, `C00_Content_i18n_Overview.tok.json` |
| C01 | i18n, Locales & Routing Strategy | draft | `C01_i18n_Locales.md`, `C01_i18n_Locales.tok.json` |

### 4) Integrations
| ID | Title | Status | Files |
|---|---|---|---|
| D01 | Headless WordPress Integration | draft | `D01_WordPress_Headless.md`, `D01_WordPress_Headless.tok.json` |

### 5) Security / Privacy / Consent
| ID | Title | Status | Files |
|---|---|---|---|
| E01 | Security Baseline (Public Site + APIs) | draft | `E01_Security_Baseline.md`, `E01_Security_Baseline.tok.json` |
| E02 | Privacy & Data Handling | draft | `E02_Privacy_DataHandling.md`, `E02_Privacy_DataHandling.tok.json` |
| E03 | Cookies & Consent (Banner + Script Gating) | draft | `E03_Cookies_Consent.md`, `E03_Cookies_Consent.tok.json` |

### 6) Environments / DevOps
| ID | Title | Status | Files |
|---|---|---|---|
| F01 | Environments & Configuration (Runtime + Secrets) | draft | `F01_Environments_Config.md`, `F01_Environments_Config.tok.json` |

### 7) QA / Acceptance
| ID | Title | Status | Files |
|---|---|---|---|
| G01 | Acceptance Criteria & Definition of Done (DoD) | draft | `G01_AcceptanceCriteria.md`, `G01_AcceptanceCriteria.tok.json` |

### 8) SEO / Metadata
| ID | Title | Status | Files |
|---|---|---|---|
| H01 | SEO, Metadata, Sitemap & Robots | draft | `H01_SEO_Metadata.md`, `H01_SEO_Metadata.tok.json` |

### 9) Glossary & Decisions
| ID | Title | Status | Files |
|---|---|---|---|
| Z01 | Glossary | draft | `Z01_Glossary.md`, `Z01_Glossary.tok.json` |
| Z02 | Decisions Log | active | `Z02_Decisions_Log.md`, `Z02_Decisions_Log.tok.json` |

---

## Authoring rules (brief)
- Specs drive code changes (update specs first or in the same PR).
- Keep `.md` and `.tok.json` pairs consistent.
- When adding a new spec, update **both** MANIFEST files.
- Record impactful decisions in `Z02` and reference the decision ID in affected specs.
