// @type {import('tailwindcss').Config}
const plugin = require('tailwindcss/plugin');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette');

module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': 'Open Sans'
      },
      color: 'rgba(255,255,255,0.85)'
    },
  },
  plugins: [
    require('tailwindcss-primeui'),
    require('tailwind-scrollbar'),
    plugin(function ({ addComponents, matchUtilities, theme }) {
        // matchUtilities(
        //   {
        //     'metro-text-heading': (value) => {
        //       return {
        //         color: 'rgba(255,255,255,0.85)',
        //         fontWeight: (theme(fontWeight.light))
        //         // color: (theme(colors.white))
        //       }
        //     }
        //   },
        //   { values: theme('fontWeight') }
        // })
        addComponents(
          {
            '.msky-text-header': {
              color: 'rgba(255,255,255,0.85)',
              fontSize: '2.4rem',
              fontWeight: 'lighter'
            },
            '.msky-text-subheader': {
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.6rem',
              fontWeight: 'lighter'
            },
            '.msky-text-body': {
              color: 'rgba(255,255,255,0.85)',
              fontSize: '14px'
            },
            '.msky-text-body-secondary': {
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem'
            },
            '.msky-text-caption': {
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.8rem'
            },
            '.msky-bg-dark-15': {
              background: 'rgba(0,0,0,0.25)'
            },
            '.msky-bg-dark-25': {
              background: 'rgba(0,0,0,0.25)'
            },
            '.msky-bg-dark-30': {
              background: 'rgba(0,0,0,0.30)'
            },
          }
        )
    })
  ]
}

