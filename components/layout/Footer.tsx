import Link from "next/link";
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

/**
 * Utility for locale-prefixed internal links.
 */
function href(locale: string, path: string) {
  if (!path.startsWith("/")) return path; // external
  return `/${locale}${path}`;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-brand-primary text-neutral-100 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ============================
            SECTION 1: Follow Us
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">{t('follow_us')}</h3>
          <div className="flex space-x-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/lnvestinElSalvador"
              target="_blank"
              aria-label="Facebook"
              className="text-neutral-100 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14-3.338 0-5.467 1.838-5.467 5.4v3H6v4h3.178v10h4.4V13.5z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/investinsv/"
              target="_blank"
              aria-label="Instagram"
              className="text-neutral-100 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z" />
                <path d="M18.406 4.155a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/investinsv"
              target="_blank"
              aria-label="X (Twitter)"
              className="text-neutral-100 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://sv.linkedin.com/company/investinelsalvador"
              target="_blank"
              aria-label="LinkedIn"
              className="text-neutral-100 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@investin.sv"
              target="_blank"
              aria-label="TikTok"
              className="text-neutral-100 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12.588 1.5c.292 2.373 1.956 4.3 4.215 4.88V9.3a7.48 7.48 0 01-2.613-.47v8.941c0 3.86-2.915 7.155-6.775 7.228-3.953.074-7.157-3.13-7.157-7.078 0-3.905 3.158-7.078 7.062-7.078.36 0 .71.026 1.05.077V13.8a4.135 4.135 0 00-.918-.103C6.074 13.697 4.832 14.9 4.832 16.39c0 1.488 1.242 2.693 2.766 2.693 1.523 0 2.766-1.205 2.766-2.693V1.5h2.224z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@InvestinElSalvador"
              target="_blank"
              aria-label="YouTube"
              className="text-neutral-100 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ============================
            SECTION 2: Quick Links
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">{t('quick_links')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={href(locale, "/invest")} className="hover:underline">
                {t('invest')}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/export")} className="hover:underline">
                {t('export')}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/diaspora")} className="hover:underline">
                {t('diaspora')}
              </Link>
            </li>
            <li>
              <a
                href="https://www.transparencia.gob.sv/institutions/invest"
                target="_blank"
                className="hover:underline"
              >
                {t('transparency')}
              </a>
            </li>
          </ul>
        </div>

        {/* ============================
            SECTION 3: Resources
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">{t('resources')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={href(locale, "/resources")} className="hover:underline">
                {t('bi')}
              </Link>
            </li>
            <li>
              <a
                href="/docs/investment-guide.pdf"
                target="_blank"
                className="hover:underline"
              >
                {t('guide')}
              </a>
            </li>
            <li>
              <Link href={href(locale, "/sector-guides")} className="hover:underline">
                {t('sector_guides')}
              </Link>
            </li>
            <li>
              <a
                href="/docs/tax-incentives.pdf"
                target="_blank"
                className="hover:underline"
              >
                {t('tax_incentives')}
              </a>
            </li>
          </ul>
        </div>

        {/* ============================
            SECTION 4: Extra
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">{t('more')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={href(locale, "/politica-antisoborno")} className="hover:underline">
                {t('policies')}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/events")} className="hover:underline">
                {t('events')}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/why-el-salvador")} className="hover:underline">
                {t('why_es')}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/contact")} className="hover:underline">
                {t('contact')}
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/announcements")} className="hover:underline">
                {t('announcements')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ============================
          MAP + BRAND BLOCK
      ============================ */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ========= MAP ========= */}
        <div className="w-full">
          <iframe
            title="INVEST Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.529663110364!2d-89.24040582608177!3d13.686339398808073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63303ba1e393ff%3A0xafaeaef88e494c97!2sInvest%20in%20El%20Salvador!5e0!3m2!1ses!2ssv!4v1706289129630!5m2!1ses!2ssv"
            loading="lazy"
            allowFullScreen
            className="w-full h-56 rounded-md border border-neutral-300"
          ></iframe>
        </div>

        {/* ========= INVEST BRAND BLOCK ========= */}
        <div className="flex flex-col space-y-3">
          <img
            src="/images/logos/logo_white.png"
            alt="INVEST Logo"
            className="w-auto h-10 object-contain opacity-90"
          />
          <p className="text-sm max-w-xs leading-relaxed">
            {t('invest_desc')}
          </p>
          <p className="text-xs mt-2">
            {t('rights')}
          </p>
        </div>

        {/* ========= GOES BLOCK ========= */}
        <div className="flex flex-col space-y-3 items-center md:items-start">
          <img
            src="/images/footer/goes-logo.png"
            alt="Government of El Salvador Logo"
            className="w-20 h-auto object-contain opacity-90"
          />
          <div className="text-sm space-x-2">
            <Link href={href(locale, "/legal/terms")} className="hover:underline">
              {t('terms')}
            </Link>
            <span>|</span>
            <Link href={href(locale, "/legal/privacy")} className="hover:underline">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
