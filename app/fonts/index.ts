
import localFont from 'next/font/local';

export const museoSans = localFont({
    src: [
        {
            path: './MuseoSans-100.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: './MuseoSans-300.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: './MuseoSans-500.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './MuseoSans-900.otf',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-museo-sans',
    display: 'swap',
});
