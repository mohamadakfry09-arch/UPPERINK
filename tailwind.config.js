/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark luxury surfaces
        ink: {
          950: '#090909',
          900: '#0e0d0e',
          800: '#1A1819',
          700: '#211f20',
          600: '#2a2829',
          500: '#3a3838',
          400: '#4e4c4d',
          300: '#6b696a',
        },
        // Cherry red accent
        cherry: {
          50: '#ffe5e5',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#a80000',
          500: '#810100',
          600: '#6a0000',
          700: '#520000',
          800: '#3b0000',
        },
        // Neutral
        zinc: {
          50: '#FBFBFB',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D4D4D4',
          400: '#A0A0A4',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Keep navy for admin pages
        navy: {
          50: '#e8edf5',
          100: '#c5d0e6',
          200: '#9fb1d5',
          300: '#7892c4',
          400: '#577bb8',
          500: '#3663ac',
          600: '#2a4f8f',
          700: '#1e3b72',
          800: '#132855',
                    900: '#0a1938',
          950: '#050c1e',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'marquee': 'marquee 10s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmerDark 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(129, 1, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(129, 1, 0, 0.7)' },
        },
        shimmerDark: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.15)',
        'navy': '0 4px 20px rgba(10, 25, 56, 0.3)',
        'orange': '0 4px 20px rgba(255, 159, 37, 0.4)',
        'cherry': '0 0 30px rgba(129, 1, 0, 0.4)',
        'cherry-lg': '0 0 60px rgba(129, 1, 0, 0.3)',
        'dark': '0 8px 32px rgba(0,0,0,0.6)',
        'dark-lg': '0 20px 60px rgba(0,0,0,0.8)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}
