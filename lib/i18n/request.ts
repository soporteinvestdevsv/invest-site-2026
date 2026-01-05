import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

// Can be imported from a shared config
const locales = ['en', 'es'];

export default getRequestConfig(async ({ locale }) => {
    let finalLocale = locale;

    // Fallback: If locale is undefined, try to grab it from the custom header set by middleware
    if (!finalLocale) {
        const headersList = await headers();
        finalLocale = headersList.get('x-next-intl-locale') || 'en';
        console.log('Locale was undefined, falling back to header:', finalLocale);
    }

    console.log('getRequestConfig using locale:', finalLocale);

    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(finalLocale as any)) {
        console.error('Invalid locale:', finalLocale);
        // notFound(); // Temporarily disable to see if this is the cause
        finalLocale = 'en'; // Ultima ratio fallback
    }

    try {
        const messages = (await import(`@/messages/${finalLocale}.json`)).default;
        return {
            locale: finalLocale as string,
            messages
        };
    } catch (error) {
        console.error('Error loading messages for locale:', finalLocale, error);
        return {
            locale: finalLocale as string,
            messages: {}
        };
    }
});
