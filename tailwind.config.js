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
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"], // Define Roboto como padrão
    },
  },
  plugins: [],
};
