import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/privacy/CookieBanner';
import ConsentScripts from '@/components/privacy/ConsentScripts';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <Header locale={params.locale} />
      <ConsentScripts />
      <CookieBanner locale={params.locale} />
      <main className="min-h-screen pt-16 lg:pt-20 flex flex-col">
        {children}
      </main>
      <Footer locale={params.locale} />
    </>
  );
}