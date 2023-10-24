/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgLightMode': "url('src/assets/bg2LightModeComp.jpeg')",
        'bgDarkMode': "url('src/assets/bgDarkMode2Comp.jpg')"
      },

    },
  },
  plugins: [],
}

