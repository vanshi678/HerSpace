/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        warmwhite: '#FAF9F4',

        blush: {
          DEFAULT: '#FADADD',
          light: '#FFF1F2',
          dark: '#EFB8C3',
        },

        lavender: {
          DEFAULT: '#E4EBDD',
          light: '#F1F4EC',
          dark: '#C9D6C5',
        },

        plum: {
          50: '#F1F4EC',
          100: '#E4EBDD',
          300: '#A8B9A3',
          500: '#668F80',
          600: '#577C6E',
          700: '#49695E',
          800: '#385248',
          900: '#24352F',
        },

        pink: {
          400: '#E49AAE',
          500: '#D9829A',
          600: '#C96F88',
        },

        graysoft: {
          DEFAULT: '#7C8882',
          light: '#AAB3AE',
          dark: '#5E6E67',
        },

        emergency: {
          DEFAULT: '#D95C6F',
          dark: '#C4475A',
          light: '#FBE7EA',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 8px 28px -8px rgba(73, 105, 94, 0.13)',
        softer: '0 4px 16px -4px rgba(73, 105, 94, 0.10)',
        lifted: '0 16px 42px -10px rgba(73, 105, 94, 0.20)',
        glow: '0 0 0 8px rgba(217, 130, 154, 0.10)',
        pinkglow: '0 14px 38px -10px rgba(217, 130, 154, 0.28)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        softFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        breathe: 'breathe 3.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s ease-out both',
        'soft-float': 'softFloat 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
