/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian':         '#050706',
        'forest':           '#0d110f',
        'gold':             '#c5a059',
        'gold-light':       '#e2c99a',
        'gold-dark':        '#8e6f3e',
        'ivory':            '#f5f2ed',
        'cream':            '#d4cfc7',
        'luxury-bg':        '#0a0f0d',
        'luxury-surface':   '#111a15',
        'luxury-card':      '#16211a',
        'luxury-dark':      '#1c2e26',
        'luxury-gold':      '#c8a96e',
        'luxury-gold-light':'#e2c99a',
        'luxury-gold-hover':'#b5952f',
        'luxury-cream':     '#fdfbf4',
        'luxury-mist':      '#e8f0ea',
        'luxury-green':     '#2d4a35',
        'luxury-text':      '#d4cfc7',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        serif:   ['Playfair Display', 'serif'],
        script:  ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 1s ease forwards',
        'shimmer':    'shimmer 2.5s infinite linear',
        'float':      'float 6s ease-in-out infinite',
        'marquee':    'marquee 25s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
