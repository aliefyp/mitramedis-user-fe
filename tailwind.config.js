/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx,jsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'mm-purple-100': '#eae9f9',
        'mm-purple-200': '#d4d4f2',
        'mm-purple-300': '#bfbeec',
        'mm-purple-400': '#a9a9e5',
        'mm-purple-500': '#9493df',
        'mm-purple-600': '#7e7dd9',
        'mm-purple-700': '#6968d2',
        'mm-purple-800': '#5352cc',
        'mm-purple-900': '#3e3dc5',
        'mm-purple-1000': '#2827bf',
        'mm-navy-100': "#e6ebef",
        'mm-navy-200': "#cdd6df",
        'mm-navy-300': "#b4c2d0",
        'mm-navy-400': "#9badc0",
        'mm-navy-500': "#8299b0",
        'mm-navy-600': "#6985a0",
        'mm-navy-700': "#507090",
        'mm-navy-800': "#375c81",
        'mm-navy-900': "#1e4771",
        'mm-navy-1000': "#053361",
        'mm-teal-100': "#3DD6F5",
        'mm-teal-200': "#00AAC8",
        'mm-teal-300': "#00809D",
        'mm-teal-400': "#005874",
        'mm-teal-500': "#00334D",
        "mm-lime-100": "#c3eb47",
        "mm-lime-200": "#b0d440",
        "mm-lime-300": "#9cbc39",
        "mm-lime-400": "#89a532",
        "mm-lime-500": "#758d2b",
        "mm-lime-600": "#627624",
        "mm-lime-700": "#4e5e1c",
        "mm-lime-800": "#3a4615",
        "mm-lime-900": "#272f0e",
        "mm-lime-1000": "#131707",
        
        

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

