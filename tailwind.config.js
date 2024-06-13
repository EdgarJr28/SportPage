/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "basePurple": "#9E77ED",
        "baseGray": "#d1d5db",
        "darkerGray": "#344054",
        "baseGreen": "#32D583",
        'baseBlack': 'rgba(0, 0, 0, 0.9)',
      },
      screens: {
        'mdsm': '768px', //  breakpoint personalizado
      },
    },

  },
  variants: {
    extend: {
      backdropFilter: ['responsive'], // Enable responsive backdrop-filter
    },
  },
  plugins: [],
}