/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#1a1a1a',
        bone: '#f7f5f1',
        stone: '#8a8378',
      },
    },
  },
  plugins: [],
};
