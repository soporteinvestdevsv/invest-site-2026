'use client';

import StorySection from './StorySection';

interface SectionProps {
  locale: string;
}

export default function SuccessCasesSection({ locale }: SectionProps) {
  return (
    <StorySection
      title="Success cases"
      description="See how global and local investors are expanding in El Salvador and creating lasting impact."
      imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
      imageAlt="Success cases"
      ctaText="Read success stories"
      ctaHref={`/${locale}/success-stories`}
      imagePosition="right"
    />
  );
}
