module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '40vw': '45vw',
      },
      zIndex: {
        '-1': '-1',
      },
      inset: {
        '1/5': '20%',
      },
      colors: {
        transparent: 'transparent',
        main: {
          light: 'rgba(41, 45, 118, .2)',
          DEFAULT: '#292d76',
        },
        secondary: {
          light: 'rgba(249, 236, 63, .4)',
          lightest: 'rgba(249, 236, 63, .2)',
          DEFAULT: '#f9ec3f',
        },
      },
      borderRadius: {
        huge: '0 100px 100px 0',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
      transformOrigin: {
        "0": "0%",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'focus-within']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
