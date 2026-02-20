'use client';

import StorySection from './StorySection';

interface SectionProps {
  locale: string;
}

export default function ContactSection({ locale }: SectionProps) {
  return (
    <StorySection
      title="Contact"
      description="Ready to start? Get in touch with our team for tailored support and next steps."
      imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
      imageAlt="Contact Invest in El Salvador"
      ctaText="Contact us"
      ctaHref={`/${locale}/contact`}
      imagePosition="right"
    />
  );
}
