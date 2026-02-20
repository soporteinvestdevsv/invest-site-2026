'use client';

import StorySection from './StorySection';

interface SectionProps {
  locale: string;
}

export default function SectorsSection({ locale }: SectionProps) {
  return (
    <StorySection
      title="Sectors"
      description="Explore priority industries shaping El Salvador's growth, from advanced manufacturing to digital services and agribusiness."
      imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
      imageAlt="Sectors in El Salvador"
      ctaText="View sectors"
      ctaHref={`/${locale}/sectors`}
      imagePosition="right"
    />
  );
}
