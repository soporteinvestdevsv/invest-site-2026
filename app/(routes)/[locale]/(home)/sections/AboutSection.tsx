'use client';

import StorySection from './StorySection';

interface SectionProps {
  locale: string;
}

export default function AboutSection({ locale }: SectionProps) {
  return (
    <StorySection
      title="About"
      description="Learn about Invest in El Salvador and how we support investors with market intelligence and tailored guidance."
      imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
      imageAlt="About Invest in El Salvador"
      ctaText="About Invest"
      ctaHref={`/${locale}/about`}
      imagePosition="left"
      variant="beige"
    />
  );
}
