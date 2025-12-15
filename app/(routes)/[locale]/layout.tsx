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
      {children}
      <Footer locale={params.locale} />
    </>
  );
}