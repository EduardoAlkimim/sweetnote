// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roxoCustom: 'rgba(164, 92, 243, 1)',
        FontColor: 'rgba (114, 107, 118, 1)',
        fontColorHover: 'rgba(38, 31, 43, 1)',
      },
      fontFamily: {
        krona: ['"Krona One"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
