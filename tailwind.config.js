/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        "box-gray-1": "#111111",
        "box-gray-2": "#222222",
      },
      height: {
        "95%": "95%",
        "76%": "76%",
        18: "4.5rem",
        22: "5.5rem",
      },
      width: {
        "90%": "90%",
        "95%": "95%",
        38: "9.5rem",
      },
      top: {
        22: "5.5rem",
      },
      keyframes: {
        scroll_text: {
          "0%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        'scroll': 'scroll_text 7s linear infinite',
      }
    },
    plugins: [],
  },
};
