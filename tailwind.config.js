/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      animation: {
        'pulse-5s': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-up-down-slow': 'spin-up-down 5s linear infinite',
      },
      keyframes: {
        'spin-up-down': {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
    }
  },
  plugins: [],
}

