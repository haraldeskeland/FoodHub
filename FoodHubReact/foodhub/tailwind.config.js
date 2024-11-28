/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities, theme }) {
      const gradientTextUtilities = {
        '.gradient-text': {
          'background-image': 'linear-gradient(to right, #3490dc, #6574cd, #9561e2)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'color': '#30a8bc', // Fallback color
          'display': 'inline-block',
        },
      }
      addUtilities(gradientTextUtilities)
    }
  ],
}

