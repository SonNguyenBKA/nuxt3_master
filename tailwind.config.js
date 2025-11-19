import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        reddit_mono: ['Reddit Mono'],
      },
      maxWidth: {
        content: 'var(--width-content)',
      },
      colors: {
        'black': 'var(--Black)',
        'accent': 'var(--Accent)',
        'accent-over': 'var(--Accent-Over)',
        'default': {
          primary: 'var(--Text-Default-Primary)',
          secondary: 'var(--Text-Default-Secondary)',
          tertiary: 'var(--Text-Default-Tertiary)',
        },
        'inverse': {
          primary: 'var(--Text-Inverse-Primary)',
          secondary: 'var(--Text-Inverse-Secondary)',
          tertiary: 'var(--Text-Inverse-Tertiary)',
        },
        'brand': {
          primary: 'var(--Text-Brand-Primary)',
          secondary: 'var(--Text-Brand-Secondary)',
          over: 'var(--Text-Brand-Over)',
          tertiary: 'var(--Text-Brand-Tertiary)',
        },
        'neutral': {
          primary: 'var(--Text-Neutral-Primary)',
          secondary: 'var(--Text-Neutral-Secondary)',
          tertiary: 'var(--Text-Neutral-Tertiary)',
        },
        'red': {
          primary: 'var(--Text-Red-Primary)',
          tertiary: 'var(--Text-Red-Tertiary)',
        },
        'green': {
          primary: 'var(--Text-Green-Primary)',
          tertiary: 'var(--Text-Green-Tertiary)',
        },
        'yellow': {
          primary: 'var(--Text-Yellow-Primary)',
          tertiary: 'var(--Text-Yellow-Tertiary)',
        },
        'disabled': {
          primary: 'var(--Text-Disabled-Primary)',
          tertiary: 'var(--Text-Disabled-Tertiary)',
          secondary: 'var(--Text-Disabled-Secondary)',
        },
        'upload': {
          text: {
            default: 'var(--Upload-Text-Default)',
          },
        },
      },
      backgroundColor: {
        default: {
          primary: 'var(--Background-Default-Primary)',
          secondary: 'var(--Background-Default-Secondary)',
          tertiary: 'var(--Background-Default-Tertiary)',
        },
        inverse: {
          tertiary: 'var(--Background-Inverse-Tertiary)',
        },
        brand: {
          primary: 'var(--Background-Brand-Primary)',
          secondary: 'var(--Background-Brand-Secondary)',
          tertiary: 'var(--Background-Brand-Tertiary)',
        },
        red: {
          primary: 'var(--Background-Red-Primary)',
          over: 'var(--Background-Red-Over)',
          tertiary: 'var(--Background-Red-Tertiary)',
        },
        green: {
          primary: 'var(--Background-Green-Primary)',
          tertiary: 'var(--Background-Green-Tertiary)',
        },
        yellow: {
          primary: 'var(--Background-Yellow-Primary)',
          tertiary: 'var(--Background-Yellow-Tertiary)',
        },
        neutral: {
          primary: 'var(--Background-Neutral-Primary)',
          secondary: 'var(--Background-Neutral-Secondary)',
        },
        overlay: {
          dark: {
            4: 'var(--Overlay-Dark-4)',
            8: 'var(--Overlay-Dark-8)',
            20: 'var(--Overlay-Dark-20)',
            40: 'var(--Overlay-Dark-40)',
          },
          light: {
            20: 'var(--Overlay-Light-20)',
            40: 'var(--Overlay-Light-40)',
          },
        },
        disabled: {
          primary: 'var(--Background-Disabled-Primary)',
          tertiary: 'var(--Background-Disabled-Tertiary)',
        },
      },
      borderColor: {
        default: {
          secondary: 'var(--Border-Default-Secondary)',
          tertiary: 'var(--Border-Default-Tertiary)',
          primary: 'var(--Border-Default-Primary)',
        },
        brand: {
          primary: 'var(--Border-Brand-Primary)',
          tertiary: 'var(--Border-Brand-Tertiary)',
        },
        disabled: {
          primary: 'var(--Border-Disabled-Primary)',
          secondary: 'var(--Border-Disabled-Secondary)',
        },
        neutral: {
          secondary: 'var(--Border-Neutral-Secondary)',
        },
      },
      fontSize: {
        'label-1-reg': ['0.75rem', { fontWeight: 400, lineHeight: '150%' }],
        'label-1-med': ['0.75rem', { fontWeight: 500, lineHeight: '150%' }],
        'label-1-semi': ['0.75rem', { fontWeight: 600, lineHeight: '150%' }],
        'label-1-extra': ['0.75rem', { fontWeight: 800, lineHeight: '150%' }],
        'label-2-reg': ['0.625rem', { fontWeight: 400, lineHeight: '150%' }],
        'label-2-med': ['0.625rem', { fontWeight: 500, lineHeight: '150%' }],
        'label-2-semi': ['0.625rem', { fontWeight: 600, lineHeight: '150%' }],
        'body-regular': ['0.875rem', { fontWeight: 400, lineHeight: '150%', letterSpacing: '-0.00438rem' }],
        'body-medium': ['0.875rem', { fontWeight: 500, lineHeight: '150%', letterSpacing: '-0.00438rem' }],
        'body-semibold': ['0.875rem', { fontWeight: 600, lineHeight: '150%', letterSpacing: '-0.00438rem' }],
        'body-bold': ['0.875rem', { fontWeight: 700, lineHeight: '150%', letterSpacing: '-0.00438rem' }],
        'heading-h1-medium': ['2rem', { fontWeight: 500, lineHeight: '130%', letterSpacing: '-0.004rem' }],
        'heading-h1-semibold': ['2rem', { fontWeight: 600, lineHeight: '130%', letterSpacing: '-0.004rem' }],
        'heading-h2-semibold': ['1.75rem', { fontWeight: 600, lineHeight: '130%', letterSpacing: '-0.0035rem' }],
        'heading-h3-semibold': ['1.5rem', { fontWeight: 600, lineHeight: '130%', letterSpacing: '-0.03rem' }],
        'heading-h4-medium': ['1.25rem', { fontWeight: 500, lineHeight: '130%', letterSpacing: '-0.0125rem' }],
        'heading-h4-semibold': ['1.25rem', { fontWeight: 600, lineHeight: '130%', letterSpacing: '-0.0125rem' }],
        'heading-h5-semibold': ['1.125rem', { fontWeight: 600, lineHeight: '130%', letterSpacing: '-0.03rem' }],
        'heading-h6-medium': ['1rem', { fontWeight: 500, lineHeight: '130%', letterSpacing: '-0.01rem' }],
        'heading-h6-semibold': ['1rem', { fontWeight: 600, lineHeight: '130%', letterSpacing: '-0.01rem' }],
        'heading-h6-bold': ['1rem', { fontWeight: 700, lineHeight: '130%', letterSpacing: '-0.01rem' }],
        'heading-h7-medium': ['0.875rem', { fontWeight: 500, lineHeight: '150%', letterSpacing: '-0.00875rem' }],
        'heading-h7-semibold': ['0.875rem', { fontWeight: 600, lineHeight: '150%', letterSpacing: '-0.00875rem' }],
      },
      screens: {
        'xs': '500px',
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '1440p': '1440px',
        // => @media (min-width: 1440px) { ... }
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        '3xl': '1920px',
        // => @media (min-width: 1920px) { ... }
        'mobile': { max: '640px' },
        'mobile-sm': { max: '375px' },
        'ipad': '1025px',
      },
    },
  },
  plugins: [
    // plugin(function ({ addVariant }) {
    //   addVariant('theme-dark', '.theme-dark &') // config class để chuyển đổi themes ( text-brand-primary theme-dark:text-white )
    //   // tên class "theme-dark" sẽ phải đặt giống vs colorMode config ở nuxt.config.ts
    // })
  ],
}
