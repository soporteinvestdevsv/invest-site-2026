import { getTranslations } from 'next-intl/server';
import { HubSpotContactForm } from './components/HubSpotContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title') + ' | INVEST El Salvador',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  // Ensure params are awaited if necessary for next-intl or other middleware hooks
  await params;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <HubSpotContactForm />
      </div>
    </div>
  );
}
