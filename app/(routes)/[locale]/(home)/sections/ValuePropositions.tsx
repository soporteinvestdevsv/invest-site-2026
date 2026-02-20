'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShieldCheckIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon, BuildingOffice2Icon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

interface ValueProp {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    titleKey: string;
    descriptionKey: string;
    link?: {
        textKey: string;
        href: string;
    };
}

interface ValuePropositionsProps {
    locale: string;
    title?: string;
    items?: ValueProp[];
}

// Default value propositions
const defaultItems: ValueProp[] = [
    {
        id: 'stability',
        icon: BuildingLibraryIcon,
        titleKey: 'item_0_title',
        descriptionKey: 'item_0_description',
        link: {
            textKey: 'item_0_link',
            href: '/why-el-salvador',
        },
    },
    {
        id: 'location',
        icon: MapPinIcon,
        titleKey: 'item_1_title',
        descriptionKey: 'item_1_description',
        link: {
            textKey: 'item_1_link',
            href: '/why-el-salvador',
        },
    },
    {
        id: 'security',
        icon: ShieldCheckIcon,
        titleKey: 'item_2_title',
        descriptionKey: 'item_2_description',
        link: {
            textKey: 'item_2_link',
            href: '/why-el-salvador',
        },
    },
    {
        id: 'incentives',
        icon: CurrencyDollarIcon,
        titleKey: 'item_3_title',
        descriptionKey: 'item_3_description',
        link: {
            textKey: 'item_3_link',
            href: '/why-invest/incentives',
        },
    },
    {
        id: 'workforce',
        icon: UserGroupIcon,
        titleKey: 'item_4_title',
        descriptionKey: 'item_4_description',
        link: {
            textKey: 'item_4_link',
            href: '/why-el-salvador/talent',
        },
    },
    {
        id: 'infrastructure',
        icon: BuildingOffice2Icon,
        titleKey: 'item_5_title',
        descriptionKey: 'item_5_description',
        link: {
            textKey: 'item_5_link',
            href: '/why-el-salvador/connectivity',
        },
    },
];

export default function ValuePropositions({
    locale,
    title,
    items = defaultItems,
}: ValuePropositionsProps) {
    const t = useTranslations('home.why_el_salvador');
    const [openId, setOpenId] = useState<string | null>(null);

    const finalTitle = title || t('title');
    const toggleOpen = (id: string) => {
        setOpenId((current) => (current === id ? null : id));
    };

    return (
        <section
            aria-labelledby="value-props-title"
            id="why-invest"
            className="py-16 md:py-20 lg:py-24 bg-surface-page"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section Title */}
                <h2
                    id="value-props-title"
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary text-center mb-12 lg:mb-16"
                >
                    {finalTitle}
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isOpen = openId === item.id;
                        const panelId = `value-prop-panel-${item.id}`;
                        return (
                            <article
                                key={item.id}
                                className="bg-white border border-border-neutral rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out group"
                            >
                                {/* Icon */}
                                <Icon
                                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-brand-primary mb-4 transition-transform duration-300 group-hover:scale-110"
                                    aria-hidden="true"
                                />

                                {/* Title */}
                                <h3 className="text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                                    {t(item.titleKey)}
                                </h3>

                                {/* Description */}
                                <p className="text-base text-text-muted leading-relaxed mb-4">
                                    {t(item.descriptionKey)}
                                </p>

                                {/* Link */}
                                {item.link && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => toggleOpen(item.id)}
                                            aria-expanded={isOpen}
                                            aria-controls={panelId}
                                            className="inline-flex items-center text-sm font-medium text-brand-primary hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded transition-all duration-200"
                                        >
                                            {t(item.link.textKey)}
                                            <svg
                                                className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                        <div
                                            id={panelId}
                                            className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <div className="pt-2">
                                                <p className="text-sm text-text-muted leading-relaxed mb-4">
                                                    {t('item_body')}
                                                </p>
                                                <Link
                                                    href={`/${locale}${item.link.href}`}
                                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition-all duration-200 bg-brand-primary rounded-full hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                                                >
                                                    {t('expanded_cta')}
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
