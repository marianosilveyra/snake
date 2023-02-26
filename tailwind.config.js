/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          dark: '#002256',
          default: '#304983',
          light: '#6174B3',
          lightest: '#A9AAE1',
          chip: '#E5E6FF',
        },

        fucsia: {
          dark: '#7C1A69',
          default: '#AE4C97',
          light: '#E27CC8',
          lightest: '#FCDDEC',
        },

        black: {
          dark: '#32333A',
          default: '#565760',
          light: '#9495A0',
        },

        gray: {
          dark: '#DCDDE7',
          default: '#F3F4F8',
          light: '#FFFFFF',
        }
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
        'PPEiko': ['"PPEiko"', 'serif']
      }
    },
  },
  plugins: [],
}
