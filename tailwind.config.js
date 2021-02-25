module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#fff",
      black: "#1a1a1a",
      transparent: "transparent",
      champagne: "#F5EEEB",
      champagneDark: "#F0E4DF",
      gold: "#F89924",
      blue: "#155EAA",
      pink: "#E84277",
      grayDark: "#7F7F7F",
      gray: "#B2B2B2",
    },
    container: {
      center: true,
      maxWidth: {
        xl: "1024px",
        "2xl": "1024px",
      },
    },
    fontFamily: {
      sans: ["Lato", "sans-serif"],
      serif: ["Alegreya", "serif"],
    },
    fontSize: {
      sm: ["15px", "18px"],
      base: ["18px", "22px"],
      large: ["20px", "24px"],
      xl: ["24px", "32px"],
      "2xl": ["28px", "34px"],
      "3xl": ["36px", "48px"],
      "4xl": ["48px", "64px"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      height: {
        90: "90vh",
        192: "48rem",
        256: "64rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          "@screen sm": {
            maxWidth: "640px",
          },
          "@screen xl": {
            maxWidth: "1024px",
          },
          "@screen 2xl": {
            maxWidth: "1024px",
          },
        },
      });
    },
  ],
};
