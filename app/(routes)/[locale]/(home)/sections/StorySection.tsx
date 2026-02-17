'use client';

import Image from 'next/image';
import Link from 'next/link';

interface StorySectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    ctaText: string;
    ctaHref: string;
    imagePosition: 'left' | 'right';
    variant?: 'white' | 'beige';
}

export default function StorySection({
    title,
    description,
    imageSrc,
    imageAlt,
    ctaText,
    ctaHref,
    imagePosition,
    variant = 'white',
}: StorySectionProps) {
    // If imagePosition is 'left', we want Image (1st in DOM) on Left, Text (2nd) on Right.
    // This is the default flex-row behavior.

    // If imagePosition is 'right', we want Image (1st in DOM) on Right, Text (2nd) on Left.
    // This creates [Text | Image] visual order.
    // Since Image is 1st in DOM, we need flex-row-reverse.

    const isImageRight = imagePosition === 'right';

    // Define background classes based on variant
    const bgClass = variant === 'beige'
        ? 'bg-stone-50 dark:bg-gray-800'
        : 'bg-white dark:bg-gray-900';

    return (
        <section className={`py-16 md:py-24 ${bgClass} overflow-hidden`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`flex flex-col gap-12 lg:gap-24 items-center ${isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
                        }`}
                >
                    {/* Image Column */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                            {title}
                        </h2>

                        <div className="prose prose-lg text-gray-600 dark:text-gray-300 max-w-none">
                            <p className="leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                href={ctaHref}
                                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 dark:focus:ring-offset-gray-900"
                            >
                                {ctaText}
                                <svg
                                    className="w-5 h-5 ml-2 -mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
