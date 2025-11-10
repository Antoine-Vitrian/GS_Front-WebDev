/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
          light: '#60a5fa',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        glow: '0 0 20px rgba(37, 99, 235, 0.4)',
      },
    },
  },
  plugins: [],
}
