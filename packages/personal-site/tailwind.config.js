const path = require('path')

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.join(__dirname, './src/**/*.{ts,tsx}')],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      animation: {
        'toast-out': 'toast-out 0.1s ease-in',
        'toast-in': 'toast-in 0.2s ease-out',
        'toast-swipe-out': 'toast-swipe-out 100ms ease-out',
      },
      keyframes: {
        'toast-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'toast-in': {
          from: { transform: `translateX(100%)` },
          to: { transform: 'translateX(0)' },
        },
        'toast-swipe-out': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: `translateX(100%)` },
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
}
