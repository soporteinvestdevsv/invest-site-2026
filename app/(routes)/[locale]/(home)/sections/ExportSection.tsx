'use client';

import StorySection from './StorySection';

interface SectionProps {
    locale: string;
}

export default function ExportSection({ locale }: SectionProps) {
    return (
        <StorySection
            title="Export Support"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh nisl, condimentum id varius et, bibendum nec nulla. Nunc eu sagittis tortor, sit amet congue diam. Fusce nec augue vel leo dignissim faucibus. Nam ac dui velit. Sed volutpat, justo non elementum malesuada, turpis elit viverra lectus, eget dictum nibh nisl eget ante."
            imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
            imageAlt="Export Services"
            ctaText="Learn more"
            ctaHref={`/${locale}/export`}
            imagePosition="left"
            variant="beige"
        />
    );
}
