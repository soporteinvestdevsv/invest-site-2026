docs/specs/E02_Privacy_DataHandling.md

# E02 — Privacy & Data Handling
**Status:** Draft (v0.1)  
**Scope:** What personal data the site collects, how it is processed, retention, user rights, and operational controls. This is a technical/privacy governance spec (not the public-facing policy text).

## 1) Relationship to other specs
- Cookie consent UX + cookie schema: `E03_Cookies_Consent.*`
- Security controls for APIs and secrets: `E01_Security_Baseline.*`
- Contact endpoint behavior: `A00_AsIs_AppTree.*` and `P00_PRD.*`
- Analytics/SEO tags: `H01_SEO_Metadata.*`
- CMS content fetching: `D01_WordPress_Headless.*`

## 2) Data classification (v1)
### 2.1 Personal data (PII) likely collected
**Contact form (expected):**
- Name
- Email
- Organization/Company (optional)
- Message / inquiry text
- Potential phone number (optional)

**Operational metadata:**
- IP address (for rate limiting / security logging)
- User-agent (security, debugging)
- Timestamp of submission

### 2.2 Non-personal data
- Page content served (public)
- Aggregated analytics events (only if consented; platform TBD)

## 3) Data sources and processors
### 3.1 First-party (this site)
- Processes contact submissions via `/api/contact`.
- Stores consent preference cookie.

### 3.2 Third-party processors
- **Vercel** (Hosting, Edge Network) — US/Global.
- **WP Engine / Host** (CMS Hosting) — TBD Region.
- **Google Analytics 4** (Analytics) — Global (if consented).
- **Email Provider** (TBD: SendGrid/AWS SES) — US.

## 4) Collection & processing purposes
- **Contact submissions:** respond to inquiries and provide investor support.
- **Security logs (rate limiting):** prevent abuse and protect service availability.
- **Analytics (optional):** improve site performance and content effectiveness (consent-gated).

## 5) Storage & retention policy (technical)
**Decision (Baseline):**
- **Contact submissions:**
  - Email: **Indefinite** (subject to mailbox retention policy).
  - DB/CRM: **24 months** (if implemented).
- **Security logs:** **30 days** (rolling window).
- **Consent cookie:** **180 days** (6 months).
- **CMS content:** Public content, not PII.

## 6) User rights and request handling (operational)
**Process:**
- User contacts `invest@investinelsalvador.gob.sv` (or designated privacy email).
- Team verifies identity and executes request within 30 days.

## 7) Cross-border data transfer considerations
**Standard:**
- Hosting: US East / Global Edge (Vercel).
- CMS: TBD.
- Data transfer clauses: Relies on Standard Contractual Clauses (SCCs) where applicable.

## 8) Cookie and tracking policy alignment
- Any non-essential tracking must be consent-gated (see `E03`).
- If analytics is enabled, document:
  - what is collected
  - whether IP anonymization is enabled (if applicable)
  - event taxonomy (see `H02_Analytics_Events.*` to be created)

## 9) Requirements
- **E02-FR-001:** Document all personal data fields collected by `/api/contact` and where they go.
- **E02-FR-002:** Define retention policy for contact submissions and security logs.
- **E02-FR-003:** Ensure analytics/tracking is consent-gated and documented.
- **E02-FR-004:** Maintain a list of third-party processors and their purposes.
- **E02-NFR-001:** Minimize data collection (collect only what is required).

## 10) Open questions
- None.
