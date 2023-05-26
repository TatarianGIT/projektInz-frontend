import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkmode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        menu: "10% 1fr",
      },
      gridTemplateColumns: {
        menu: "20% 1fr 20%",
      },
      colors: {
        primary: "#FFA429",
        secondary: "#18D39E",
        darkPrimary: "#123123",
        darkSecondary: "#123123",
        textPrimaryColor: "rgb(33 33 33);",
        textSecondaryColor: "#123123",
        darkTextPrimaryColor: "rgb(180 180 180)",
        darkTextSecondaryColor: "rgb(97 97 97)",
      },
    },
  },
  plugins: [],
});
