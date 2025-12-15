'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import 'primeicons/primeicons.css';

// TODO: Move to C01/A01 shared config or translation files
const NAV_ITEMS = [
  { key: 'why_es', label: 'Why El Salvador', href: '/why-el-salvador' },
  { key: 'why_invest', label: 'Why Invest', href: '/why-invest' },
  { key: 'how_to_invest', label: 'How to Invest', href: '/how-to-invest' },
  { key: 'sectors', label: 'Sectors', href: '/sectors' },
  { key: 'stories', label: 'Success Stories', href: '/success-stories' },
  { key: 'news', label: 'News & Events', href: '/news' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileOpen]);

  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);
  const closeMenu = () => setIsMobileOpen(false);

  // Prefix href with locale
  const getHref = (path: string) => `/${locale}${path}`;

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
          {NAV_ITEMS.map((item) => (
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
          <div className="hidden sm:flex text-xs font-mono bg-white/10 px-2 py-1 rounded">
            {(locale || 'en').toUpperCase()}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Toggle navigation"
          >
            <i className={`pi ${isMobileOpen ? 'pi-times' : 'pi-bars'} text-xl`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Overlay) */}
      <div
        className={`fixed inset-0 z-40 bg-brand-primary transform transition-transform duration-300 ease-in-out lg:hidden pt-20 px-6
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_ITEMS.map((item) => (
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
            <span className="text-sm text-white/60 font-mono">Locale: {locale.toUpperCase()}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}