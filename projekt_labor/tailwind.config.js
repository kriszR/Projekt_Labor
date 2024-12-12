/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F5CCA0',
          hover: '#E48F45',
        },
        secondary: '#994D1C',
        maroon: '#6B240C',
      },
      spacing: {
        '3/5': '60%',
        '1/2': '50%',
        '1/3': '33.3333%',
        '1/4': '25%',
      },
    },
    container: {
      padding: '15px',
    },
  },
  plugins: [require('tailwindcss-animate')],
};
