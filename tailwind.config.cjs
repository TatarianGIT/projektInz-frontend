import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        menu: "10% 1fr",
      },
      gridTemplateColumns: {
        menu: "20% 1fr 20%",
      },
    },
  },
  plugins: [],
});
