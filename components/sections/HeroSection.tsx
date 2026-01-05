'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
    locale: string;
    headline?: string;
    subheadline?: string;
    ctaPrimary?: {
        text?: string;
        href?: string;
    };
    ctaSecondary?: {
        text?: string;
        href?: string;
    };
    backgroundMedia?: {
        type: 'image' | 'video';
        src: string;
        alt?: string;
        poster?: string;
    };
}

export default function HeroSection({
    locale,
    headline,
    subheadline,
    ctaPrimary,
    ctaSecondary,
    backgroundMedia,
}: HeroSectionProps) {
    const t = useTranslations('home.hero');

    // Default values
    const finalHeadline = headline || t('headline');
    const finalSubheadline = subheadline || t('subheadline');
    const finalCtaPrimaryText = ctaPrimary?.text || t('cta_primary');
    const finalCtaPrimaryHref = ctaPrimary?.href || `/${locale}/contact`;
    const finalCtaSecondaryText = ctaSecondary?.text || t('cta_secondary');
    const finalCtaSecondaryHref = ctaSecondary?.href || `/${locale}/how-to-invest`;
    const finalBackgroundMedia = backgroundMedia || {
        type: 'image' as const,
        src: '/images/hero/home-hero.jpg',
        alt: 'El Salvador landscape',
    };

    return (
        <section
            aria-labelledby="hero-headline"
            className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] max-h-[900px] h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full overflow-hidden"
        >
            {/* Background Media */}
            {finalBackgroundMedia.type === 'image' ? (
                <Image
                    src={finalBackgroundMedia.src}
                    alt={finalBackgroundMedia.alt || ''}
                    fill
                    priority
                    quality={90}
                    sizes="100vw"
                    className="object-cover object-center"
                />
            ) : (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={finalBackgroundMedia.poster}
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={finalBackgroundMedia.src} type="video/mp4" />
                </video>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-brand-primary/40" />

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center max-w-4xl py-12 sm:py-16 lg:py-20">
                    {/* Headline */}
                    <h1
                        id="hero-headline"
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6"
                    >
                        {finalHeadline}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl lg:text-2xl font-normal text-white/90 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
                        {finalSubheadline}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        {/* Primary CTA */}
                        <Link
                            href={finalCtaPrimaryHref}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-brand-primary text-base font-semibold rounded-2xl hover:bg-white/90 focus:ring-4 focus:ring-white/50 focus:outline-none transition-colors duration-200"
                        >
                            {finalCtaPrimaryText}
                        </Link>

                        {/* Secondary CTA */}
                        <Link
                            href={finalCtaSecondaryHref}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white text-base font-semibold rounded-2xl hover:bg-white/10 focus:ring-4 focus:ring-white/50 focus:outline-none transition-colors duration-200"
                        >
                            {finalCtaSecondaryText}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
