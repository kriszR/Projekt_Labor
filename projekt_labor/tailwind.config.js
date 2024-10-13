/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2b3038",
          hover: "#788bab",
        },
        secondary: "#7aadff",
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.3333%',
        '1/4': '25%'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
