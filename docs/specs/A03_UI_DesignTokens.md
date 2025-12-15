# A03 — UI Design Tokens & Theming
**Status:** Draft (v0.1)  
**Scope:** Color palette, typography system (Geist), and single-point-of-change theming constraints.  

## 1) Core Principles
- **Single Source of Truth:** All design tokens must be defined in one canonical location (e.g., `tailwind.config.ts`, CSS variables file, or a dedicated tokens module).
- **No Hardcoded Values:** Components must consume tokens (e.g., `bg-brand-primary` or `var(--brand-primary)`). Inline hex codes are forbidden for brand/theme colors.
- **Strict Palette:** No new colors or gradients are allowed outside the defined set.

## 2) Color Palette (Authoritative)
**Constraint:** Do not introduce new accent colors.

### 2.1 Brand & Neutral
| Token Name | Hex Value | Role / Usage Rules |
| :--- | :--- | :--- |
| **brand.primary** | `#0b2a4a` | Primary headers, primary buttons, badges. **Do not use** for body text. |
| **text.primary** | `#111827` | Main body content, strong headings on light backgrounds. |
| **text.muted** | `#6b7280` | Secondary text, captions, helper text. |
| **border.neutral** | `#e5e7eb` | Dividers, card borders, input borders. |

### 2.2 Functional Colors (Warning/Alerts)
| Token Name | Hex Value | Role / Usage Rules |
| :--- | :--- | :--- |
| **warning.bg** | `#fff7ed` | Background for warning alerts/toasts. |
| **warning.border** | `#fed7aa` | Border for warning containers. |
| **warning.title** | `#9a3412` | Strong text in warning headers. |
| **warning.text** | `#7c2d12` | Body text in warning containers. |

### 2.3 Code / Technical
| Token Name | Hex Value | Role / Usage Rules |
| :--- | :--- | :--- |
| **code.bg** | `#0b1220` | Background for code blocks and terminal snippets. |
| **code.text** | `#e5e7eb` | Content color for code. |

## 3) Typography Baseline
**Font Family:** Geist (via `next/font`).

### 3.1 Families
- **font.sans:** `Geist` — Default for UI, headings, body.
- **font.mono:** `Geist Mono` — Code blocks, technical data, financial figures (if tabular).

### 3.2 Type Scale & Usage
| Step | Size | Line Height | Usage Intent |
| :--- | :--- | :--- | :--- |
| **xs** | 0.75rem | tight | Badges, small captions. |
| **sm** | 0.875rem | normal | Secondary body text, UI labels. |
| **base** | 1rem | normal | Standard body text, inputs. |
| **lg** | 1.125rem | relaxed | Lead paragraphs, large UI controls. |
| **xl** | 1.25rem | tight | Section headers (H3/H4). |
| **2xl** | 1.5rem | tight | Page headers (H2). |
| **3xl** | 1.875rem | tight | Hero/main headers (H1). |

### 3.3 Weights
- **Regular (400):** Default body text.
- **Medium (500):** Interactive elements (links, buttons).
- **Semibold (600):** Headings, emphasized data.
- **Bold (700):** Use sparingly for strong emphasis.

## 4) Component styling constraints
- **Buttons:** Must use `brand.primary` for solid backgrounds. Text must be legible on top (e.g., white).
- **Links:** Use `brand.primary` or `text.primary` with underline-on-hover.
- **Borders:** Default to `border.neutral` (1px solid).
- **Code Blocks:** Must use `code.bg` + `code.text` + `font.mono`.
- **Alerts:** Warning alerts must strictly follow the warning token set.

## 5) Theming & Migration Rules (Single-Point-of-Change)
### 5.1 Token Source of Truth
- **Required Pattern:** Define tokens in `tailwind.config.ts` (theme.extend.colors/fontFamily) or a dedicated CSS variables root.
- **Prohibited:** Specifying hex values directly in component styling (e.g., `className="bg-[#0b2a4a]"` is **FORBIDDEN**).

### 5.2 Consumption
- Components must reference utility classes (e.g., `text-brand-primary`) or CSS variables.
- **Example:** `A04` Header uses `brand.primary` background and `white` text.

### 5.3 Do's and Don'ts
- **DO NOT** add gradients or shadows not defined here.
- **DO NOT** use `text-black` or `text-white` for semantic text; use `text.primary` or inverse tokens.
- **DO** consistent spacing (use Tailwind spacing scale).

## 6) Requirements
- **A03-FR-001:** Implement token definitions in one central config file.
- **A03-FR-002:** Configure `next/font` for Geist and Geist Mono.
- **A03-NFR-001:** No hardcoded hex values in component code.

## 7) Open questions
- None.
