/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#a78bfa',
          500: '#8a2be2',
          600: '#4b0082',
        },
      },
    },
  },
  plugins: [],
}

