/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        english: ['roboto', 'sans-serif'],
        farsi: ['Yekan Bakh', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

