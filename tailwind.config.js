/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
    "./app/routes/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 0.5s ease-in-out',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.8' },
          '50%': { transform: 'translateX(0%)', opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};