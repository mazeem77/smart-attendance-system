/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        main: "#0EB8D0",
        secondary: "#757575",
        tertiary: "#06444C",
        text: "#000000",
        gray100: "#F5F5F5",
        gray200: "#EEEEEE",
        gray300: "#E0E0E0",
        gray400: "#BDBDBD",
        gray500: "#9E9E9E",
        red: "#FF0000",
        darkBackground: "#021417",
        darkSecondary: "#F5F5F5",
        darkText: "#ffffff",
        darkGray100: "#757575",
        darkGray200: "#9E9E9E",
        darkGray300: "#BDBDBD",
        darkGray400: "#E0E0E0",
        darkGray500: "#EEEEEE",
      }
    },
    fontFamily: {
      'nueue': ['Neue-Haas-Unica'],
      'nueueBold': ['Neue-Haas-Unica-bold'],
      "zeitung": ['Zeitung']
    }
  },
  plugins: [],
}