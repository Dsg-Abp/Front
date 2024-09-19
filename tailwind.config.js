/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "rgba(16, 30, 30,1)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        "loading-bar": "loading-bar 4s infinite",
      },
      keyframes: {
        "loading-bar": {
          "0%": {
            width: "0%",
            transform: "translateX(-100%)",
          },
          "50%": {
            width: "100%",
            transform: "translateX(0)",
          },
          "100%": {
            width: "0%",
            transform: "translateX(100%)",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"], // Define Roboto como padrão
    },
  },
  plugins: [],
};
