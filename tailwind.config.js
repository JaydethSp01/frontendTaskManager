module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFA726",
          DEFAULT: "#FB8C00",
          dark: "#EF6C00",
        },
        secondary: {
          light: "#42A5F5",
          DEFAULT: "#1E88E5",
          dark: "#1565C0",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
      backgroundColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [],
};
