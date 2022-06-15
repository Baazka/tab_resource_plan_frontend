module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        akhukh: "#233772",
        asaaral: "#ECECF8",
      },
    },
    backgroundSize: {
      cover: "cover",
      "100%": "100%",
      16: "4rem",
    },
    backgroundImage: (theme) => ({
      zuragHee: "url('../zurag/backHee.jpg')",
      zurag: "url('../zurag/background.png')",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
