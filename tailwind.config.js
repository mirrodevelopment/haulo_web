/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['inherit'],
        mono: ['"Space Mono"', '"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter2: '-0.035em',
        tighter3: '-0.03em',
      },
      lineHeight: {
        none2: '0.95',
        tighter2: '1.12',
      },
    },
  },
  plugins: [],
}
