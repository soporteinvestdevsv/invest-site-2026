'use client';

import StorySection from './StorySection';
import { useTranslations } from 'next-intl';

interface SectionProps {
    locale: string;
}

export default function InvestSection({ locale }: SectionProps) {
    // Ideally we would use translations here: const t = useTranslations('home.invest');

    return (
        <StorySection
            title="Invest in El Salvador"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            imageSrc="https://assets.ireland.ie/images/Invest_stories_image_right.2e16d0ba.fill-460x450-c100.jpg"
            imageAlt="Invest in El Salvador"
            ctaText="Find out more"
            ctaHref={`/${locale}/invest`}
            imagePosition="right"
        />
    );
}
