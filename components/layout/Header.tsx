'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import 'primeicons/primeicons.css';

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('header');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll state for potential future transparency effects (spec A04 option)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isMobileOpen]);

  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMenu = () => setIsMobileOpen(false);

  const pathname = usePathname();
  const currentLocale = locale || 'en';
  const targetLocale = currentLocale === 'en' ? 'es' : 'en';
  const targetLabel = targetLocale === 'en' ? 'EN' : 'ES';

  // Replace the locale segment in the current path
  const switchLocaleHref = pathname?.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`;

  // Prefix href with locale
  const getHref = (path: string) => `/${currentLocale}${path}`;

  const handleLocaleSwitch = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('locale-scroll', String(window.scrollY));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedScroll = sessionStorage.getItem('locale-scroll');
    if (!storedScroll) return;
    const scrollY = Number(storedScroll);
    sessionStorage.removeItem('locale-scroll');
    if (Number.isNaN(scrollY)) return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
    });
  }, []);

  // Keys align with the JSON structure keys
  const navKeys = ['why_es', 'sectors', 'resources', 'stories', 'about', 'contact'];

  // Map keys to hrefs
  const navHrefs: Record<string, string> = {
    why_es: '/#why-el-salvador',
    sectors: '/sectors',
    resources: '/resources',
    stories: '/success-stories',
    about: '/about',
    contact: '/contact'
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300
        h-16 lg:h-20 bg-brand-primary text-white shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

        {/* Mobile Toggle (Left on Mobile) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="relative z-[110] p-2 text-white focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={isMobileOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out absolute ${isMobileOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-1'}`}
              />
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out absolute top-1/2 -translate-y-1/2 ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out absolute ${isMobileOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-1'}`}
              />
            </div>
          </button>
        </div>

        {/* Brand */}
        <div className="flex-shrink-0 flex items-center lg:order-first">
          <Link href={`/${locale}`} className="hover:opacity-90 transition-opacity" onClick={closeMenu}>
            <img
              src="/images/logos/logo_white.png"
              alt="INVEST El Salvador"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={getHref(navHrefs[key])}
              className="text-sm font-medium text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Desktop Utilities (Locale) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={switchLocaleHref}
            replace
            onClick={handleLocaleSwitch}
            className="flex items-center justify-center text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors"
            aria-label={`${t('switch_locale')} ${targetLabel}`}
          >
            {targetLabel}
          </Link>
        </div>

      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-16 bottom-0 left-0 right-0 z-40 bg-brand-primary transform transition-transform duration-300 ease-in-out lg:hidden pt-8 px-6 pb-24 overflow-y-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={getHref(navHrefs[key])}
              onClick={closeMenu}
              className="text-xl font-semibold text-white border-b border-white/10 pb-4 hover:pl-2 transition-all"
            >
              {t(key)}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center justify-center">
              <Link
                href={switchLocaleHref}
                replace
                onClick={() => {
                  handleLocaleSwitch();
                  closeMenu();
                }}
                className="text-sm font-bold bg-white/10 px-3 py-1 rounded hover:bg-white/20"
              >
                {t('switch_locale')} {targetLabel}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
