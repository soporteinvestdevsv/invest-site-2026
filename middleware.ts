import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED = ['en', 'es'] as const;
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals + API + common public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
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
