/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        char: "#1B1B1D",
        chili: "#E8482C",
        turmeric: "#F2A93B",
        basil: "#3C7A5C",
        cream: "#FFF8EF",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(27,27,29,0.25)",
      },
    },
  },
  plugins: [],
};
