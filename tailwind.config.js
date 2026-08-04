/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Official Murray Investments brand red, sampled from the company
        // logo (micbg.png). 500 is the primary; 600 hover/active; 400 is a
        // lighter tone reserved for accents on dark backgrounds; 50 is the
        // pale tint for highlight surfaces.
        brand: {
          DEFAULT: '#C80010',
          50: '#FCF2F2',
          100: '#F8DFE0',
          400: '#E4444C',
          500: '#C80010',
          600: '#A5000D',
        },
      },
    },
  },
  plugins: [],
}

