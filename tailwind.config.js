/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00ff00',
      },
      backgroundColor: {
        'black-90': 'rgba(0, 0, 0, 0.9)',
      },
      opacity: {
        '10': '0.1',
        '30': '0.3',
        '50': '0.5',
        '70': '0.7',
      },
    },
  },
  plugins: [],
}
