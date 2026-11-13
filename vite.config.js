import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/*.mp4', '**/*.mov', '**/*.webm']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'gsap-vendor': ['gsap'],
          'ui-vendor': ['react', 'react-dom', 'react-router-dom', 'lenis', 'lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
