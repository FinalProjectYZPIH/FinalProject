/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgLightMode': "url('src/assets/bgLightMode.jpg')",
        'bgLightMode2': "url('src/assets/bg2LightModeComp.jpeg')",
        'bgDarkMode': "url('src/assets/bgDarkMode.jpg')",
        'bgDarkMode2': "url('src/assets/bgDarkMode2Comp.jpg')"
      },
     
    },
  },
  plugins: [],
}

