/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        fluoYellow: '#ccff00',  // Exemple d'une couleur jaune fluo
      },
    },
  },
  plugins: [],
}

