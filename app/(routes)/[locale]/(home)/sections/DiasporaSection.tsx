'use client';

import StorySection from './StorySection';

interface SectionProps {
    locale: string;
}

export default function DiasporaSection({ locale }: SectionProps) {
    return (
        <StorySection
            title="Diaspora Engagement"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eleifend, neque quis pharetra luctus, sapien eros feugiat justo, ac ullamcorper diam elit ut ligula. Quisque et libero a magna ultricies dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula."
            imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
            imageAlt="Diaspora Community"
            ctaText="Join us"
            ctaHref={`/${locale}/diaspora`}
            imagePosition="right"
        />
    );
}
