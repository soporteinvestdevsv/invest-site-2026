'use client';

import StorySection from './StorySection';

interface SectionProps {
  locale: string;
}

export default function ResourcesSection({ locale }: SectionProps) {
  return (
    <StorySection
      title="Resources"
      description="Access investment guides, sector briefs, and practical tools to evaluate opportunities with confidence."
      imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
      imageAlt="Investment resources"
      ctaText="Browse resources"
      ctaHref={`/${locale}/resources`}
      imagePosition="left"
      variant="beige"
    />
  );
}
