import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'anti_bribery' });
    return {
        title: t('title') + ' | INVEST El Salvador',
    };
}

export default async function AntiBriberyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'anti_bribery' });

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-[#00030A] to-[#050B1A] overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 md:py-20 lg:py-24 max-w-4xl">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-[#FFFFFF] drop-shadow-lg text-center">
                    {t('title')}
                </h1>

                <div className="prose prose-lg max-w-none mb-12 md:mb-16">
                    <p className="text-lg text-[#F8FAFC] leading-relaxed drop-shadow-md text-left">
                        {t('introduction')}
                    </p>

                    <h3 className="text-2xl font-semibold mt-12 mb-8 text-[#E2E8F0] drop-shadow-md border-b border-[#1E3A5F] pb-4">
                        {t('commitments_intro')}
                    </h3>

                    <div className="space-y-6">
                        {['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'].map((key) => (
                            <div key={key} className="flex gap-3 md:gap-4">
                                <div className="shrink-0 pt-1">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2A4D] border border-[#1E3A5F] text-[#F8FAFC] font-bold text-sm uppercase shadow-lg">
                                        {key}
                                    </span>
                                </div>
                                <p className="mt-0 text-[#E2E8F0] leading-relaxed font-light min-w-0 break-words">
                                    {t(`commitments.${key}`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-4 md:p-6 bg-[#00030A]/30 rounded-lg border-l-4 border-blue-600">
                        <p className="text-[#F8FAFC] italic">{t('closing')}</p>
                    </div>

                    <p className="mt-8 font-bold text-right text-[#FFFFFF]">{t('date')}</p>
                </div>

                {/* Reporting Form Section */}
                <div className="rounded-2xl p-8 md:p-12 bg-white shadow-2xl">
                    <h2 className="text-2xl font-bold mb-8 text-[#0B1F3A]">{t('form.title')}</h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 ml-1">{t('form.name')}</label>
                                <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 hover:border-blue-400" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 ml-1">{t('form.phone')}</label>
                                <input type="tel" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 hover:border-blue-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">{t('form.email')}</label>
                            <input type="email" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 hover:border-blue-400" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">{t('form.date_label')}</label>
                            <input type="date" className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all hover:border-blue-400" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 ml-1">{t('form.description_label')}</label>
                            <textarea rows={5} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-slate-400 hover:border-blue-400 resize-none"></textarea>
                        </div>

                        <div className="pt-6 flex justify-center">
                            <button type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transform hover:-translate-y-0.5 transition-all duration-300">
                                {t('form.submit_btn')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
