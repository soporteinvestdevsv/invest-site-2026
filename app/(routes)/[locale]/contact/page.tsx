import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title').substring(0, 60) + '... | INVEST El Salvador',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  // Using a public iframe for the map
  const mapSrc = "https://maps.google.com/maps?q=Calle+y+Colonia+La+Mascota+316B+San+Salvador&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">

        {/* Header Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-12 text-center max-w-5xl mx-auto text-slate-900 leading-tight">
          {t('title')}
        </h1>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">

          {/* Left Column: Info & Map */}
          <div className="flex flex-col space-y-10">
            {/* Description Body */}
            <div className="prose prose-lg px-2">
              <p className="text-lg text-slate-600 leading-relaxed text-left md:text-justify">
                {t('body')}
              </p>
            </div>

            {/* Bullets */}
            <ul className="grid gap-4 pl-2">
              {['business_climate', 'access_connectivity', 'legal_framework', 'human_capital', 'investment_opportunities', 'setting_up'].map((key) => (
                <li key={key} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{t(`bullets.${key}`)}</span>
                </li>
              ))}
            </ul>

            {/* Download Button */}
            <div className="pl-2">
              <a
                href="/documents/INVESTORS-GUIDE-EL-SALVADOR-2024.pdf"
                download="INVESTORS-GUIDE-EL-SALVADOR-2024.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-blue-600/30 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('download_button')}
              </a>
            </div>

            {/* Map */}
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b border-slate-200 pb-4">
              {t('form.title')}
            </h2>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    {t('form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input required type="text" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    {t('form.last_name')}
                  </label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    {t('form.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input required type="tel" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    {t('form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input required type="email" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    {t('form.country')} <span className="text-red-500">*</span>
                  </label>
                  <input required type="text" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    {t('form.state')}
                  </label>
                  <input type="text" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-semibold text-slate-700">
                  {t('form.sector_label')} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-2 pl-2">
                  {['software', 'btc', 'aeronautics', 'tourism', 'electronics', 'pharma', 'food', 'real_estate'].map((key) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
                      <input type="checkbox" name="sector" value={key} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-slate-700 group-hover:text-blue-700 transition-colors font-medium">
                        {t(`form.sector_options.${key}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  {t('form.subject')} <span className="text-red-500">*</span>
                </label>
                <input required type="text" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900" />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">
                  {t('form.message_placeholder')}
                </label>
                <textarea
                  rows={5}
                  placeholder={t('form.message_placeholder')}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400 text-slate-900 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 transform active:scale-[0.99] transition-all">
                  {t('form.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}