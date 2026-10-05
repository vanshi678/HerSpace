/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        warmwhite: '#FFF8FF',
        blush: {
          DEFAULT: '#F7D8EC',
          light: '#FCEEF8',
          dark: '#EFB8D9',
        },
        lavender: {
          DEFAULT: '#E9DDFF',
          light: '#F5EFFF',
          dark: '#D6C0FA',
        },
        plum: {
          50: '#F7F2FF',
          100: '#EADFFF',
          300: '#C3A6F4',
          500: '#8A5BE0',
          600: '#7747D2',
          700: '#6335B8',
          800: '#4A278C',
          900: '#2F1A63',
        },
        pink: {
          400: '#EA5EB0',
          500: '#E74FA5',
          600: '#D93D94',
        },
        graysoft: {
          DEFAULT: '#8B8498',
          light: '#BDB5C8',
          dark: '#5C536A',
        },
        emergency: {
          DEFAULT: '#EF5575',
          dark: '#D83D5E',
          light: '#FDE8EF',
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
        soft: '0 8px 28px -8px rgba(108, 67, 188, 0.13)',
        softer: '0 4px 16px -4px rgba(108, 67, 188, 0.10)',
        lifted: '0 16px 42px -10px rgba(108, 67, 188, 0.25)',
        glow: '0 0 0 8px rgba(239, 85, 117, 0.10)',
        pinkglow: '0 14px 38px -10px rgba(231, 79, 165, 0.34)',
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
