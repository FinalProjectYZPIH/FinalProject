/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
      },
      backgroundImage: {
        bgLightMode: "url('src/assets/bg2LightModeComp.jpeg')",
        bgDarkMode: "url('src/assets/bgDarkMode2Comp.jpg')",
      },
      screens: {
        'sm': {'min': '360px'},
      },
    },
  },
  plugins: [],
};
