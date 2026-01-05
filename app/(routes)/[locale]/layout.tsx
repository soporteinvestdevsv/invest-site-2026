import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/privacy/CookieBanner';
import ConsentScripts from '@/components/privacy/ConsentScripts';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Header locale={locale} />
      <ConsentScripts />
      <CookieBanner locale={locale} />
      <main className="min-h-screen pt-16 lg:pt-20 flex flex-col">
        {children}
      </main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}