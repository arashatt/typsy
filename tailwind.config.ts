import {heroui} from '@heroui/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/progress.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"], // overrides font-sans
      },
    },
  },
  plugins: [heroui()],
};
