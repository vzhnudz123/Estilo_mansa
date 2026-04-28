import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          motion: ['framer-motion', 'gsap', '@gsap/react', 'lenis'],
          media: ['swiper'],
        },
      },
    },
  },
})
