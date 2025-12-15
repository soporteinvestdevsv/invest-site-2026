'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import 'primeicons/primeicons.css';

// TODO: Move to C01/A01 shared config or translation files
const NAV_ITEMS = {
  en: [
    { key: 'why_es', label: 'Why El Salvador', href: '/why-el-salvador' },
    { key: 'why_invest', label: 'Why Invest', href: '/why-invest' },
    { key: 'how_to_invest', label: 'How to Invest', href: '/how-to-invest' },
    { key: 'sectors', label: 'Sectors', href: '/sectors' },
    { key: 'stories', label: 'Success Stories', href: '/success-stories' },
    { key: 'news', label: 'News & Events', href: '/news' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'contact', label: 'Contact', href: '/contact' },
  ],
  es: [
    { key: 'why_es', label: 'Por qué El Salvador', href: '/why-el-salvador' },
    { key: 'why_invest', label: 'Por qué Invertir', href: '/why-invest' },
    { key: 'how_to_invest', label: 'Cómo Invertir', href: '/how-to-invest' },
    { key: 'sectors', label: 'Sectores', href: '/sectors' },
    { key: 'stories', label: 'Casos de Éxito', href: '/success-stories' },
    { key: 'news', label: 'Noticias y Eventos', href: '/news' },
    { key: 'about', label: 'Nosotros', href: '/about' },
    { key: 'contact', label: 'Contacto', href: '/contact' },
  ],
};

export default function Header({ locale }: { locale: string }) {
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
  const targetLabel = targetLocale === 'en' ? 'EN' : 'ES'; // Target label to switch TO

  // Replace the locale segment in the current path
  const switchLocaleHref = pathname?.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`;

  // Prefix href with locale
  const getHref = (path: string) => `/${currentLocale}${path}`;

  // Get items for current locale or fallback to 'en'
  const navItems = NAV_ITEMS[currentLocale as keyof typeof NAV_ITEMS] || NAV_ITEMS.en;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300
        h-16 lg:h-20 bg-brand-primary text-white border-b border-brand-primary/10 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

        {/* Zone 1: Brand */}
        <div className="flex-shrink-0 flex items-center">
          <Link href={`/${locale}`} className="text-xl font-bold font-sans tracking-tight hover:opacity-90 transition-opacity" onClick={closeMenu}>
            INVEST <span className="font-light text-white/80">EL SALVADOR</span>
          </Link>
        </div>

        {/* Zone 2: Primary Nav (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={getHref(item.href)}
              className="text-sm font-medium text-white/90 hover:text-white hover:underline decoration-2 underline-offset-4 transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Utilities */}
        <div className="flex items-center gap-4">
          {/* Locale Switcher Placeholder */}
          {/* Locale Switcher */}
          <Link
            href={switchLocaleHref}
            className="hidden sm:flex items-center justify-center text-xs font-mono font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors"
            aria-label={`Switch to ${targetLocale === 'en' ? 'English' : 'Spanish'}`}
          >
            {targetLabel}
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-[110] p-2 text-white hover:bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Toggle navigation"
            aria-expanded={isMobileOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out absolute ${isMobileOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-1'
                  }`}
              />
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out absolute top-1/2 -translate-y-1/2 ${isMobileOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out absolute ${isMobileOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-1'
                  }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Overlay) */}
      <div
        className={`fixed inset-0 z-40 bg-brand-primary transform transition-transform duration-300 ease-in-out lg:hidden pt-20 px-6
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={getHref(item.href)}
              onClick={closeMenu}
              className="text-xl font-semibold text-white border-b border-white/10 pb-4 hover:pl-2 transition-all"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60 font-mono">Locale: {currentLocale.toUpperCase()}</span>
              <Link
                href={switchLocaleHref}
                onClick={closeMenu}
                className="text-sm font-bold bg-white/10 px-3 py-1 rounded hover:bg-white/20"
              >
                Switch to {targetLabel}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}