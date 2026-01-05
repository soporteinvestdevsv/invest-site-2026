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
          primary: 'var(--color-brand-primary)',
          'primary-text': 'var(--color-brand-primary-text)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        surface: {
          page: 'var(--color-surface-page)',
          card: 'var(--color-surface-card)',
          inverse: 'var(--color-surface-inverse)',
        },
        border: {
          neutral: 'var(--color-border-neutral)',
        },
        warning: {
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
          title: 'var(--color-warning-title)',
          text: 'var(--color-warning-text)',
        },
        code: {
          bg: 'var(--color-code-bg)',
          text: 'var(--color-code-text)',
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
