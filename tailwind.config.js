/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
      text: 'text 1s ease-in',
      bounce: 'bounce 1s infinite',
      spin: 'spin 1s infinite',
    },
    keyframes: {
      text: {
        '0%, 100%': {
          'background-size': '200% 200%',
          'background-position': 'right center',
        },
        '50%': {
          'background-size': '100% 100%',
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

  plugins: [require('@tailwindcss/container-queries')],
};
