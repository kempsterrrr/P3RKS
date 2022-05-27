module.exports = {
  content: [
    "./posts/*.mdx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["lexend", "sans-serif"],
      },
      backgroundImage: {
        test: "linear-gradient(to right bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('/partners.png')",
      },
    },
  },
  plugins: [],
};
