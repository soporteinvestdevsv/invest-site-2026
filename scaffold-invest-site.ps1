<#
Scaffold INVEST site structure for Next.js App Router with:
- [locale] routing
- shadcn/ui placeholders (components/ui reserved)
- headless WordPress placeholders (lib/wp reserved)
- cookie consent plumbing (lib/privacy + components/privacy)
- pages tree as defined

Usage:
  # From project root:
  powershell -ExecutionPolicy Bypass -File .\scaffold-invest-site.ps1
  powershell -ExecutionPolicy Bypass -File .\scaffold-invest-site.ps1 -CleanInstall
  powershell -ExecutionPolicy Bypass -File .\scaffold-invest-site.ps1 -NoBackup
#>

param(
  [switch]$CleanInstall,
  [switch]$NoBackup
)

$ErrorActionPreference = "Stop"

function Ensure-Dir([string]$Path) {
  if ([string]::IsNullOrWhiteSpace($Path)) { return }
  if (-not (Test-Path $Path)) { New-Item -ItemType Directory -Path $Path -Force | Out-Null }
}

function Write-File([string]$Path, [string]$Content) {
  $dir = Split-Path $Path -Parent
  if (-not [string]::IsNullOrWhiteSpace($dir)) { Ensure-Dir $dir }

  # Always write UTF-8 (no BOM). Compatible with Windows PowerShell 5.x and PowerShell 7+
  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
}

function Move-ToBackupIfExists([string]$Path, [string]$BackupRoot) {
  if (Test-Path $Path) {
    Ensure-Dir $BackupRoot
    $name = Split-Path $Path -Leaf
    $dest = Join-Path $BackupRoot $name
    if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
    Move-Item -Path $Path -Destination $dest -Force
  }
}

# --- Validate project root ---
if (-not (Test-Path ".\package.json")) {
  throw "Run this script from the Next.js project root (package.json not found)."
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path (Get-Location) ".scaffold-backup\$timestamp"

Write-Host "Project root:" (Get-Location)
Write-Host "Backup root:" $backupRoot

# --- Clean build artifacts ---
$buildDirs = @(".next", "out", "coverage", "dist", ".turbo", ".cache")
foreach ($d in $buildDirs) {
  if (Test-Path $d) {
    Write-Host "Removing $d ..."
    Remove-Item $d -Recurse -Force
  }
}

if ($CleanInstall) {
  if (Test-Path "node_modules") {
    Write-Host "Removing node_modules (CleanInstall) ..."
    Remove-Item "node_modules" -Recurse -Force
  }
}

# --- Backup existing source folders (non-destructive reset) ---
if (-not $NoBackup) {
  Write-Host "Backing up existing folders (app/components/lib/messages/content/styles) ..."
  Move-ToBackupIfExists ".\app" $backupRoot
  Move-ToBackupIfExists ".\components" $backupRoot
  Move-ToBackupIfExists ".\lib" $backupRoot
  Move-ToBackupIfExists ".\messages" $backupRoot
  Move-ToBackupIfExists ".\content" $backupRoot
  Move-ToBackupIfExists ".\styles" $backupRoot
} else {
  # Destructive mode for these folders
  foreach ($p in @(".\app", ".\components", ".\lib", ".\messages", ".\content", ".\styles")) {
    if (Test-Path $p) {
      Write-Host "Removing $p (NoBackup) ..."
      Remove-Item $p -Recurse -Force
    }
  }
}

# --- Create required directories ---
$dirs = @(
  "app",
  "app\(routes)\[locale]",
  "app\(routes)\[locale]\about\team",
  "app\(routes)\[locale]\about\governance",
  "app\(routes)\[locale]\why-el-salvador\macroeconomy",
  "app\(routes)\[locale]\why-el-salvador\talent",
  "app\(routes)\[locale]\why-el-salvador\connectivity",
  "app\(routes)\[locale]\why-el-salvador\quality-of-life",
  "app\(routes)\[locale]\why-invest\services",
  "app\(routes)\[locale]\why-invest\incentives",
  "app\(routes)\[locale]\sectors\[sectorSlug]",
  "app\(routes)\[locale]\how-to-invest\steps",
  "app\(routes)\[locale]\how-to-invest\requirements",
  "app\(routes)\[locale]\how-to-invest\faqs",
  "app\(routes)\[locale]\success-stories\[storySlug]",
  "app\(routes)\[locale]\news\[slug]",
  "app\(routes)\[locale]\events\[slug]",
  "app\(routes)\[locale]\insights\reports\[slug]",
  "app\(routes)\[locale]\media\gallery",
  "app\(routes)\[locale]\media\downloads",
  "app\(routes)\[locale]\contact\invest-support",
  "app\(routes)\[locale]\legal\privacy",
  "app\(routes)\[locale]\legal\terms",
  "app\(routes)\[locale]\legal\cookies",
  "app\(routes)\[locale]\legal\accessibility",
  "app\api\contact",
  "app\api\revalidate",
  "components\layout",
  "components\sections",
  "components\privacy",
  "components\ui",
  "lib\i18n",
  "lib\seo",
  "lib\wp",
  "lib\privacy",
  "messages",
  "public\images",
  "public\downloads"
)

foreach ($dir in $dirs) { Ensure-Dir $dir }

# --- Files: app root ---
Write-File "app\globals.css" @"
/* Global styles (Tailwind will typically be wired here) */
/* Keep this file; shadcn/Tailwind setup will extend it. */
"@

Write-File "app\layout.tsx" @"
import './globals.css';

export const metadata = {
  title: 'INVEST El Salvador',
  description: 'Investment promotion site scaffolding',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
"@

Write-File "app\robots.ts" @"
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: '/sitemap.xml',
  };
}
"@

Write-File "app\sitemap.ts" @"
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return [{ url: baseUrl, lastModified: new Date() }];
}
"@

Write-File "app\not-found.tsx" @"
export default function NotFound() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>404</h1>
      <p>Page not found.</p>
    </main>
  );
}
"@

Write-File "app\error.tsx" @"
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Something went wrong</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
"@

# --- Middleware for locale routing (optional but recommended) ---
Write-File "middleware.ts" @"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED = ['en', 'es'] as const;
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml')
  ) {
    return NextResponse.next();
  }

  const hasLocale = SUPPORTED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
"@

# --- Files: locale layout + home ---
Write-File "app\(routes)\[locale]\layout.tsx" @"
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/privacy/CookieBanner';
import ConsentScripts from '@/components/privacy/ConsentScripts';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <Header locale={params.locale} />
      <ConsentScripts />
      <CookieBanner locale={params.locale} />
      {children}
      <Footer locale={params.locale} />
    </>
  );
}
"@

Write-File "app\(routes)\[locale]\page.tsx" @"
export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>INVEST El Salvador</h1>
      <p>Home template ({params.locale}).</p>
    </main>
  );
}
"@

# --- Helper to create simple pages quickly ---
function Create-Page([string]$Path, [string]$Title) {
  Write-File $Path @"
export default function Page({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>$Title</h1>
      <p>Template page ({'{'}params.locale{'}'}).</p>
    </main>
  );
}
"@
}

function Create-DynamicPage([string]$Path, [string]$Title, [string]$ParamName) {
  Write-File $Path @"
export default function Page({
  params,
}: {
  params: { locale: string; ${ParamName}: string };
}) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>$Title</h1>
      <p>Locale: {'{'}params.locale{'}'} | Slug: {'{'}params.${ParamName}{'}'}</p>
    </main>
  );
}
"@
}

# --- Create all route pages (templates) ---
Create-Page "app\(routes)\[locale]\about\page.tsx" "About INVEST"
Create-Page "app\(routes)\[locale]\about\team\page.tsx" "Team"
Create-Page "app\(routes)\[locale]\about\governance\page.tsx" "Governance"

Create-Page "app\(routes)\[locale]\why-el-salvador\page.tsx" "Why El Salvador"
Create-Page "app\(routes)\[locale]\why-el-salvador\macroeconomy\page.tsx" "Macroeconomy"
Create-Page "app\(routes)\[locale]\why-el-salvador\talent\page.tsx" "Talent"
Create-Page "app\(routes)\[locale]\why-el-salvador\connectivity\page.tsx" "Connectivity"
Create-Page "app\(routes)\[locale]\why-el-salvador\quality-of-life\page.tsx" "Quality of Life"

Create-Page "app\(routes)\[locale]\why-invest\page.tsx" "Why INVEST"
Create-Page "app\(routes)\[locale]\why-invest\services\page.tsx" "Services"
Create-Page "app\(routes)\[locale]\why-invest\incentives\page.tsx" "Incentives"

Create-Page "app\(routes)\[locale]\sectors\page.tsx" "Sectors"
Create-DynamicPage "app\(routes)\[locale]\sectors\[sectorSlug]\page.tsx" "Sector Detail" "sectorSlug"

Create-Page "app\(routes)\[locale]\how-to-invest\page.tsx" "How to Invest"
Create-Page "app\(routes)\[locale]\how-to-invest\steps\page.tsx" "Steps"
Create-Page "app\(routes)\[locale]\how-to-invest\requirements\page.tsx" "Requirements"
Create-Page "app\(routes)\[locale]\how-to-invest\faqs\page.tsx" "FAQs"

Create-Page "app\(routes)\[locale]\success-stories\page.tsx" "Success Stories"
Create-DynamicPage "app\(routes)\[locale]\success-stories\[storySlug]\page.tsx" "Story Detail" "storySlug"

Create-Page "app\(routes)\[locale]\news\page.tsx" "News"
Create-DynamicPage "app\(routes)\[locale]\news\[slug]\page.tsx" "News Detail" "slug"

Create-Page "app\(routes)\[locale]\events\page.tsx" "Events"
Create-DynamicPage "app\(routes)\[locale]\events\[slug]\page.tsx" "Event Detail" "slug"

Create-Page "app\(routes)\[locale]\insights\page.tsx" "Insights"
Create-Page "app\(routes)\[locale]\insights\reports\page.tsx" "Reports"
Create-DynamicPage "app\(routes)\[locale]\insights\reports\[slug]\page.tsx" "Report Detail" "slug"

Create-Page "app\(routes)\[locale]\media\page.tsx" "Media"
Create-Page "app\(routes)\[locale]\media\gallery\page.tsx" "Gallery"
Create-Page "app\(routes)\[locale]\media\downloads\page.tsx" "Downloads"

Create-Page "app\(routes)\[locale]\contact\page.tsx" "Contact"
Create-Page "app\(routes)\[locale]\contact\invest-support\page.tsx" "Invest Support"

Create-Page "app\(routes)\[locale]\legal\privacy\page.tsx" "Privacy Policy"
Create-Page "app\(routes)\[locale]\legal\terms\page.tsx" "Terms of Use"
Create-Page "app\(routes)\[locale]\legal\cookies\page.tsx" "Cookies Policy"
Create-Page "app\(routes)\[locale]\legal\accessibility\page.tsx" "Accessibility"

# --- API routes placeholders ---
Write-File "app\api\contact\route.ts" @"
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, received: body });
}
"@

Write-File "app\api\revalidate\route.ts" @"
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  return NextResponse.json({ ok: true });
}
"@

# --- Components placeholders ---
Write-File "components\layout\Header.tsx" @"
export default function Header({ locale }: { locale: string }) {
  return (
    <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb' }}>
      <strong>INVEST</strong> <span style={{ opacity: 0.7 }}>({locale})</span>
    </header>
  );
}
"@

Write-File "components\layout\Footer.tsx" @"
export default function Footer({ locale }: { locale: string }) {
  return (
    <footer style={{ padding: '2rem', borderTop: '1px solid #e5e7eb' }}>
      <small>INVEST El Salvador — {locale}</small>
    </footer>
  );
}
"@

# --- Cookie consent plumbing (minimal scaffolding) ---
Write-File "lib\privacy\consent.ts" @"
export type ConsentState = {
  v: number;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  ts: string;
};

export const CONSENT_COOKIE = 'invest_consent';
export const CONSENT_VERSION = 1;

export function defaultConsent(): ConsentState {
  return {
    v: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    ts: new Date().toISOString(),
  };
}
"@

Write-File "components\privacy\CookieBanner.tsx" @"
'use client';

import { useEffect, useState } from 'react';
import { CONSENT_COOKIE, defaultConsent } from '@/lib/privacy/consent';

function getCookie(name: string) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? decodeURIComponent(m[2]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 180) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = \`\${name}=\${encodeURIComponent(value)}; Path=/; Max-Age=\${maxAgeSeconds}; SameSite=Lax\${secure}\`;
}

export default function CookieBanner({ locale }: { locale: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const existing = getCookie(CONSENT_COOKIE);
    setShow(!existing);
  }, []);

  if (!show) return null;

  const acceptAll = () => {
    const c = { ...defaultConsent(), analytics: true, marketing: true, preferences: true };
    setCookie(CONSENT_COOKIE, JSON.stringify(c));
    setShow(false);
  };

  const rejectAll = () => {
    const c = defaultConsent();
    setCookie(CONSENT_COOKIE, JSON.stringify(c));
    setShow(false);
  };

  return (
    <div style={{
      position: 'fixed', left: 16, right: 16, bottom: 16,
      border: '1px solid #e5e7eb', borderRadius: 12,
      background: '#fff', padding: 16, maxWidth: 720, margin: '0 auto',
      boxShadow: '0 12px 24px rgba(0,0,0,0.12)', zIndex: 50
    }}>
      <strong>Cookies</strong>
      <p style={{ marginTop: 8 }}>
        We use cookies to improve the site experience. Manage preferences anytime.
        <span style={{ opacity: 0.7 }}> ({locale})</span>
      </p>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={rejectAll}>Reject</button>
        <button onClick={acceptAll}>Accept</button>
      </div>
      {/* TODO: Replace buttons with shadcn Dialog + Buttons and add granular preferences */}
    </div>
  );
}
"@

Write-File "components\privacy\ConsentScripts.tsx" @"
'use client';

import { useEffect } from 'react';
import { CONSENT_COOKIE } from '@/lib/privacy/consent';

function getConsent(): any | null {
  const m = document.cookie.match(new RegExp('(^| )' + CONSENT_COOKIE + '=([^;]+)'));
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(m[2])); } catch { return null; }
}

export default function ConsentScripts() {
  useEffect(() => {
    const consent = getConsent();
    // TODO:
    // - If consent?.analytics === true, load analytics scripts (GA/GTM/etc.)
    // - If consent?.preferences === true, allow embeds (YouTube/Maps/etc.)
  }, []);

  return null;
}
"@

# --- Headless WP reserved layer (stubs) ---
Write-File "lib\wp\client.ts" @"
export async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  // TODO: point to WP REST or GraphQL endpoint via env vars
  throw new Error('wpFetch not implemented yet: ' + path);
}
"@

Write-File "lib\wp\queries.ts" @"
export const WP_QUERIES = {};
"@

Write-File "lib\wp\types.ts" @"
export type WPPlaceholder = {};
"@

Write-File "lib\wp\mappers.ts" @"
export function mapWpToUi<T>(data: any): T {
  return data as T;
}
"@

# --- i18n placeholders ---
Write-File "lib\i18n\config.ts" @"
export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
"@

# --- messages placeholders ---
Write-File "messages\en.json" @"
{
  ""site.title"": ""INVEST El Salvador""
}
"@

Write-File "messages\es.json" @"
{
  ""site.title"": ""INVEST El Salvador""
}
"@

Write-Host ""
Write-Host "Done. Scaffold created."
if (-not $NoBackup) {
  Write-Host "Backup saved at: $backupRoot"
}
Write-Host "Next steps:"
Write-Host "  1) npm install"
Write-Host "  2) npm run dev"
Write-Host "  3) (later) npx shadcn@latest init"
