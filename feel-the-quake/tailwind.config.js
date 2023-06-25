/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        quakeGreen: {
          background: '#b3ded8',
          dark: '#164e48',
          light: '#81aba5',
          DEFAULT: '#00917d',
          '100': '#a1b7b5',
          '200': '#71938f',
          '300': '#43706b',
          '400': '#154d47',
        },
        quakeRed: {
          light: '#c17777',
          dark: '#a73b3b',
        },
      },
    },
  },
  plugins: [],
}
