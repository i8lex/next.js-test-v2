/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      filter: {
        check: 'drop-shadow(0 0px 1px rgba(255, 255, 255, 1))',
        titleShadow: 'drop-shadow(2px 2px 1px rgba(125,125,125,1))',
      },
      boxShadow: {
        check: '0 2px 4px 0 rgba(0, 0, 0, 0.10)',
      },
    },
    container: {
      center: true,
      padding: '2rem',
      // maxWidth: '384px',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    animation: {
      text: 'text 5s ease infinite',
      bounce: 'bounce 1s infinite',
      spin: 'spin 1s infinite',
    },
    keyframes: {
      text: {
        '0%, 100%': {
          'background-size': '200% 100%',
          'background-position': 'right center',
        },
        '50%': {
          'background-size': '250% 100%',
          'background-position': 'left center',
        },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-50%)',
          animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        },
      },
      spin: {
        '0%': { transform: 'rotate(0)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
  },

  plugins: [
    require('@tailwindcss/container-queries'),
    require('tailwindcss-filters'),
  ],
};
