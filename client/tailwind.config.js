/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/src/assets/hero.png')",
        'blur-ellipse': "url('/src/assets/ellipse.png')",
        'blur-ellipse-small': "url('/src/assets/ellipse-small.png')"
      },
      fontFamily: {
        "outfit": ['Outfit', 'sans-serif'],
        "roboto": ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}

