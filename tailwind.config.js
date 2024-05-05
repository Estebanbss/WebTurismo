/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
    transitionDuration: {
        '300': '300ms', // Ajusta la duración de la transición
      },
      colors: {
        primary: {
          50: "#f7faf0",
          100: "#e1f3d3",
          200: "#b4e6a3",
          300: "#85d371",
          400: "#57c03f",
          500: "#39A900",
          600: "#318200",
          700: "#2b7000",
          800: "#245a00",
          900: "#1c4200",
          950: "#071f00",
        },
      },
      fontFamily: {
        Blinker: ["Blinker", "sans-serif"],
        Josefin: ["Josefin Sans", "sans-serif"],
        Work: ["Work Sans", "sans-serif"],
      },
      screens: {
        bg: "0px",
        xs: "320px",
        xs0: "410px",
        xs03: "468px",
        xs1: "496px",
        xs2: "540px",
        sm: "640px",
        md: "768px",
        md1: "888px",
        md2: "999px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1792px",
        "4xl": "2048px",
        "5xl": "2304px",
        "6xl": "2560px",
        "7xl": "2816px",
        "8xl": "3072px",
      },
    },
  },
  plugins: [],
}
