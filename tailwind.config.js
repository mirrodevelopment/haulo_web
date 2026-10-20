/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          yellow: '#FAFF00',
          lime: '#8AC900',
          cyan: '#00B8D4',
          purple: '#9C27B0',
          dark: '#08090B',
          panel: '#0C0E14',
          titanium: '#C6D0DD',
        }
      },
      fontFamily: {
        mono: ['"SF Mono"', 'Monaco', 'Consolas', '"Liberation Mono"', 'monospace'],
        display: ['Impact', 'Haettenschweiler', '"Arial Black"', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
