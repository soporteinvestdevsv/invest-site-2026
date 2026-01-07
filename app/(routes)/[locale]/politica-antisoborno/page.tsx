

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
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-navy-900">
                {locale === 'es' ? 'Política Antisoborno' : 'Anti-Bribery Policy'}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600">
                <p>
                    {locale === 'es'
                        ? 'Esta página describe nuestra política de cero tolerancia hacia el soborno y la corrupción. El contenido completo está en desarrollo.'
                        : 'This page outlines our zero-tolerance policy towards bribery and corruption. Full content is under development.'}
                </p>
                {/* Placeholder for legal content */}
            </div>
        </div>
    );
}
