import Link from "next/link";

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
  return (
    <footer className="bg-brand-primary text-neutral-100 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ============================
            SECTION 1: Follow Us
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Follow us</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/lnvestinElSalvador"
              target="_blank"
              aria-label="Facebook"
              className="text-neutral-100 hover:text-white transition"
            >
              <i className="fab fa-facebook text-xl" />
            </a>

            <a
              href="https://www.instagram.com/investinsv/"
              target="_blank"
              aria-label="Instagram"
              className="text-neutral-100 hover:text-white transition"
            >
              <i className="fab fa-instagram text-xl" />
            </a>

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

            <a
              href="https://www.linkedin.com/company/invest-in-el-salvador/mycompany/?viewAsMember=true"
              target="_blank"
              aria-label="LinkedIn"
              className="text-neutral-100 hover:text-white transition"
            >
              <i className="fab fa-linkedin text-xl" />
            </a>
          </div>
        </div>

        {/* ============================
            SECTION 2: Quick Links
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={href(locale, "/invest")} className="hover:underline">
                I want to invest
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/export")} className="hover:underline">
                I want to export
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/diaspora")} className="hover:underline">
                Salvadoran diaspora
              </Link>
            </li>
            <li>
              <a
                href="https://www.transparencia.gob.sv/institutions/invest"
                target="_blank"
                className="hover:underline"
              >
                Transparency portal
              </a>
            </li>
          </ul>
        </div>

        {/* ============================
            SECTION 3: Resources
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={href(locale, "/resources")} className="hover:underline">
                Business Intelligence
              </Link>
            </li>
            <li>
              <a
                href="/docs/investment-guide.pdf"
                target="_blank"
                className="hover:underline"
              >
                Investment Guide
              </a>
            </li>
            <li>
              <Link href={href(locale, "/sector-guides")} className="hover:underline">
                Sector Guides
              </Link>
            </li>
            <li>
              <a
                href="/docs/tax-incentives.pdf"
                target="_blank"
                className="hover:underline"
              >
                Tax incentives and benefits
              </a>
            </li>
          </ul>
        </div>

        {/* ============================
            SECTION 4: Extra
        ============================ */}
        <div>
          <h3 className="text-sm font-semibold mb-4">More</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href={href(locale, "/politica-antisoborno")} className="hover:underline">
                Antisoborno Policy
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/events")} className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/why-el-salvador")} className="hover:underline">
                Why El Salvador
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/contact")} className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href={href(locale, "/announcements")} className="hover:underline">
                Announcements
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
            className="w-full h-56 rounded-md border border-neutral-300"
          ></iframe>
        </div>

        {/* ========= INVEST BRAND BLOCK ========= */}
        <div className="flex flex-col space-y-3">
          <img
            src="/images/footer/invest-logo.png"
            alt="INVEST Logo"
            className="w-auto h-10 object-contain opacity-90"
          />
          <p className="text-sm max-w-xs leading-relaxed">
            Official site providing assistance and consultancy for investors,
            exporters, and international businesses exploring opportunities in El Salvador.
          </p>
          <p className="text-xs mt-2">
            © Government of El Salvador. All rights reserved.
          </p>
        </div>

        {/* ========= GOES BLOCK ========= */}
        <div className="flex flex-col space-y-3">
          <img
            src="/images/footer/goes-logo.png"
            alt="Government of El Salvador Logo"
            className="w-20 h-auto object-contain opacity-90"
          />
          <div className="text-sm space-x-2">
            <Link href={href(locale, "/legal/terms")} className="hover:underline">
              Terms and Conditions
            </Link>
            <span>|</span>
            <Link href={href(locale, "/legal/privacy")} className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
