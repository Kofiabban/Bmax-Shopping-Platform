/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#18181b',        // Ash / Dark Slate background
          charcoal: '#27272a',    // Lighter ash for cards, inputs, and borders
          lightGray: '#f4f4f5',
          border: '#3f3f46',      // Ash border tone
          accent: '#d97706',      // Amber token (or keep '#c9a227' for Subtle Gold)
          accentHover: '#b45309',
        },
        // Direct flat key aliases to prevent breakages in existing class names
        'brand-dark': '#18181b',
        'brand-charcoal': '#27272a',
        'brand-accent': '#d97706',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}