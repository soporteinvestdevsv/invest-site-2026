import HeroSection from './sections/HeroSection';
import ValuePropositions from './sections/ValuePropositions';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main>
      <HeroSection locale={locale} />
      <ValuePropositions locale={locale} />
      {/* Additional sections will be added as they are developed */}
    </main>
  );
}
