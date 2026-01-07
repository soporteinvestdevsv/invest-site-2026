

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'footer' });
    return {
        title: t('policies') + ' | INVEST El Salvador',
    };
}

export default async function AntiBriberyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'legal.anti_bribery' });

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-navy-900">
                {t('title')}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600">
                <p>{t('description')}</p>
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-500 italic">
                        {t('doc_ref')}
                    </p>
                </div>
            </div>
        </div>
    );
}
