/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mandir: {
          terracotta: '#5f250f',
          gold: '#dda45d',
          darkgold: '#b87c33',
          parchment: '#f7e8d4',
          creamy: '#fdf9f4',
          red: '#8b1d24',
          marigold: '#e67e22',
          deepbrown: '#3e1708'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
        sanskrit: ['Rozha One', 'serif']
      }
    },
  },
  plugins: [],
}
