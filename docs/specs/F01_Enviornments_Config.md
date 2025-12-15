docs/specs/F01_Environments_Config.md

# F01 — Environments & Configuration (Runtime + Secrets)
**Status:** Draft (v0.1)  
**Scope:** Environment definitions, required environment variables, secrets handling, and configuration rules for local/staging/production.

## 1) Environments
- **local**: developer machine (`next dev`)
- **staging**: pre-production validation (content + integrations)
- **production**: public site

## 2) Configuration rules (non-negotiable)
- Do **not** commit secrets to git.
- Only variables prefixed with `NEXT_PUBLIC_` may be exposed to the browser.
- All secrets (WP auth, revalidate secret, email provider keys) must be server-only (no `NEXT_PUBLIC_`).
- Environment variables must be documented in `docs/specs/F01_Environments_Config.*` and mirrored in an `.env.example` (to be created).

## 3) Next.js env loading (expected)
- Local development uses `.env.local` (gitignored).
- CI/CD injects environment variables for staging/production.
- Production runtime uses platform-managed secrets (Vercel/GCP/etc.) — **TBD**.

## 4) Required environment variables (initial set)
### 4.1 Site identity (safe to be public)
- `NEXT_PUBLIC_SITE_URL` — canonical site origin for metadata/canonicals (e.g., `https://investinelsalvador.gob.sv`)
- `NEXT_PUBLIC_DEFAULT_LOCALE` — **TBD** (should match `lib/i18n/config.ts`)
- `NEXT_PUBLIC_SUPPORTED_LOCALES` — **TBD** (comma list or JSON; keep in sync with `lib/i18n/config.ts`)

### 4.2 WordPress (server-only)
**TBD exact naming based on `lib/wp/client.ts`**
- `WP_BASE_URL` — WP base URL (e.g., `https://cms.example.com`)
- `WP_API_TYPE` — `rest` | `graphql` (TBD)
- `WP_AUTH_MODE` — `none` | `app_password` | `jwt` | `oauth` (TBD)
- `WP_AUTH_TOKEN` / `WP_USERNAME` / `WP_PASSWORD` — only if auth required (TBD)

### 4.3 Revalidation (server-only)
- `REVALIDATE_SECRET` — shared secret required by `/api/revalidate` (see `A00` + `D01`)

### 4.4 Contact / forms (server-only)
**TBD (depends on how `/api/contact` is implemented)**
- `CONTACT_DESTINATION` — `email` | `crm` | `db` (TBD)
- If email:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`
- If provider API:
  - `EMAIL_PROVIDER_KEY` (SendGrid/Mailgun/etc.)

### 4.5 Analytics (public, but consent-gated)
- `NEXT_PUBLIC_ANALYTICS_PROVIDER` — `ga4` | `gtm` | `plausible` | `none` (TBD)
- `NEXT_PUBLIC_ANALYTICS_ID` — provider identifier (TBD)

> Note: analytics tags must only be activated through consent (`E03_Cookies_Consent.*`).

## 5) Logging and observability
**TBD**
- Server logging strategy (console vs structured logs)
- Error reporting (Sentry/etc.)

## 6) Requirements
- **F01-FR-001:** Define and document all required env vars for local/staging/prod.
- **F01-FR-002:** Secure `/api/revalidate` using `REVALIDATE_SECRET`.
- **F01-FR-003:** Ensure WP integration uses server-only secrets.
- **F01-NFR-001:** No secret may be exposed to client bundles.

## 7) Open questions
- Where will the site be hosted/deployed (Vercel vs GCP vs other)?
- What is the exact WP API type and auth mode?
- What is the lead delivery mechanism for contact submissions?
- What are the supported locales and default locale values?
