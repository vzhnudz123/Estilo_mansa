/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-bg': '#fdfbf7', // Beige/white base
        'luxury-dark': '#1c2e26', // Dark green
        'luxury-gold': '#d4af37', // Gold accent
        'luxury-gold-hover': '#b5952f', // Gold accent hover
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
