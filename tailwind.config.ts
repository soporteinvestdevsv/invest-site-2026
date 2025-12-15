import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0b2a4a',
        },
        text: {
          primary: '#111827',
          muted: '#6b7280',
        },
        border: {
          neutral: '#e5e7eb',
        },
        warning: {
          bg: '#fff7ed',
          border: '#fed7aa',
          title: '#9a3412',
          text: '#7c2d12',
        },
        code: {
          bg: '#0b1220',
          text: '#e5e7eb',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
} satisfies Config
