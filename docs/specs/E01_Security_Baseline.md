docs/specs/E01_Security_Baseline.md

# E01 — Security Baseline (Public Site + APIs)
**Status:** Draft (v0.1)  
**Scope:** Baseline security controls for a public Next.js site, including API endpoints, secrets handling, headers, input validation, and revalidation protection.

## 1) Current scaffold facts (as-is)
- API routes exist:
  - `app/api/contact/route.ts`
  - `app/api/revalidate/route.ts` (see `A00_AsIs_AppTree.*`)
- Headless CMS integration exists under `lib/wp/*` (see `B01_AsIs_LibTree.*`)
- Cookie consent exists (client + server utility split) (see `E03_Cookies_Consent.*`)

## 2) Threat model (baseline)
Primary risks for this site:
- Automated abuse of public endpoints (`/api/contact`, `/api/revalidate`)
- Secret leakage into client bundles
- Injection attacks (XSS via CMS content, header injection, template injection)
- SSRF or untrusted URL fetch patterns (WP client)
- Cache poisoning / unwanted revalidation
- Dependency vulnerabilities / supply chain

## 3) Secrets & configuration rules
- No secrets committed to git.
- Browser-exposed env vars must be `NEXT_PUBLIC_*` only.
- All WP credentials, revalidation secrets, SMTP/provider keys are server-only (see `F01_Environments_Config.*`).
- Never pass secret tokens to client components.

## 4) API security baseline
### 4.1 /api/revalidate protection (required)
- Must require a shared secret token (e.g., `REVALIDATE_SECRET`).
- Reject requests missing/invalid secret with `401`.
- Restrict allowed methods (e.g., `POST` only).
- Validate payload shape (e.g., tag/path allowlist) — **TBD**.
- Log revalidation attempts (success/failure) — **TBD**.

### 4.2 /api/contact protection (required)
- Validate input (lengths, required fields, email format).
- Rate limit by IP and/or use a CAPTCHA/honeypot — **TBD**.
- Prevent header injection if sending email.
- Never echo sensitive fields back in responses.
- Return generic errors to avoid information leakage.

## 5) Content security (XSS) baseline
- Treat CMS HTML as untrusted by default.
- Prefer rendering structured content blocks rather than raw HTML.
- If raw HTML is required:
  - sanitize using an allowlist sanitizer (TBD library)
  - disable dangerous tags/attributes
  - never allow inline scripts from CMS content

## 6) Security headers (recommended baseline)
**TBD exact values; implement via Next.js headers config or middleware.**
Recommended:
- `Content-Security-Policy` (CSP) — must account for consent-gated scripts
- `Strict-Transport-Security` (HSTS) (prod only)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `X-Frame-Options` / `frame-ancestors` in CSP (clickjacking protection)

## 7) Authentication/authorization (public site)
- Site is public; no user authentication in v1 (per `P00_PRD.*`).
- Admin/editor authentication occurs in WordPress, not in this site.

## 8) Dependency & supply chain
- Pin dependencies via lockfile.
- Run `npm audit` (or equivalent) in CI.
- Implement Dependabot (or similar) — **TBD**.

## 9) Logging & monitoring (minimal)
- Log API errors and suspicious activity (rate limit hits, invalid secrets).
- Consider error reporting (Sentry/etc.) — **TBD**.

## 10) Requirements
- **E01-FR-001:** Secure `/api/revalidate` with a server-only shared secret and strict method/payload validation.
- **E01-FR-002:** Validate and protect `/api/contact` against abuse (rate limit + validation).
- **E01-FR-003:** Prevent secret leakage (client bundles and logs).
- **E01-FR-004:** Apply baseline security headers appropriate for a public site.
- **E01-NFR-001:** CMS content rendering must not introduce XSS.

## 11) Open questions
- Revalidation model: by path, by tag, or both (and what allowlist)?
- Contact anti-abuse: CAPTCHA provider or internal rate limiting?
- CSP design: which third-party scripts are required and how does consent gating affect CSP?
- Hosting platform constraints for headers and rate limiting (Vercel/GCP/etc.)?
