// tailwind.config.js

const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    inset: {
      "1/5": "17%",
      "2/5": "40%",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      0: "50%",
      16: "4rem",
    },
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      azul: {
        darkest: "#1f2d3d",
        dark: "#56CAD8",
        DEFAULT: "#6BD5E1",
        light: "#e0e6ed",
        lightest: "#f9fafc",
      },
      honey: {
        DEFAULT: "#ffbaba",
      },
      tomato: {
        DEFAULT: "#ED302C",
      },
      leaf: {
        DEFAULT: "#8BD169",
      },
      olive: {
        DEFAULT: "#F4F4DB",
      },
      dirt: {
        DEFAULT: "#888375",
      },
      coquille: {
        DEFAULT: "#FFFDF5",
      },
      instagram: {
        DEFAULT: "#FBFAFB",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
