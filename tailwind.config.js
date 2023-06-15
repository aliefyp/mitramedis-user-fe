/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand1: '#2827BF',
        brand2: '#053361',
        brand3: '#3DD6F5',
        brand4: '#C3EB47',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('prettier-plugin-tailwindcss')
  ],
}

