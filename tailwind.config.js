/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#221F1F',
      },
      screens: {
        'sm': '640px',   // Mobile landscape
        'md': '768px',   // Tablet
        'lg': '1366px',  // Laptop
        'xl': '1920px',  // Desktop
        '2xl': '2560px', // Large Desktop
      },
    },
  },
  plugins: [],
}

