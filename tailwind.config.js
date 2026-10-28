/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#070A0A',
          900: '#0B1010', // Primary background
          850: '#0F1616',
          800: '#141C1B', // Surface / Card
          750: '#1A2423', // Elevated card / Hover
          700: '#233330', // Borders
          600: '#2E423E', // Sub-borders
          500: '#3D5752',
        },
        'agri-emerald': '#10B981',
        'agri-green': '#059669',
        'agri-red': '#F04452',
        'agri-amber': '#F5B942',
        'agri-cyan': '#06B6D4',
        'agri-text-primary': '#F4F7F6',
        'agri-text-secondary': '#929E9A',
        'agri-text-muted': '#667470',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.6)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.25)',
        'glow-red': '0 0 20px -5px rgba(240, 68, 82, 0.35)',
        'glow-amber': '0 0 20px -5px rgba(245, 185, 66, 0.3)',
      }
    },
  },
  plugins: [],
}
