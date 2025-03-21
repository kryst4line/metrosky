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
      animation: {
        pingonce: 'pingonce 1s ease-in-out'
      },
      keyframes: {
        pingonce: {
          '0%': {
            opacity: 0
          },
          '1%': {
            opacity: 1
          },
          '75%, 100%': {
            transform: 'scale(3)',
            opacity: 0
          }
        }
      },
      color: 'rgba(255,255,255,0.85)',
      lineHeight: {
        'snug': '1.4'
      }
    },
  },
  plugins: [
    require('tailwindcss-primeui'),
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
            '.msky-text-white': {
              color: 'rgba(255, 255, 255, 0.85)'
            },
            '.msky-text-lightwhite': {
              color: 'rgba(255, 255, 255, 0.9)'
            },
            '.msky-text-darkwhite': {
              color: 'rgba(255, 255, 255, 0.7)'
            },
            '.msky-text-lightblue': {
              color: 'rgba(207, 255, 255, 0.9)'
            },
            '.msky-text-link': {
              color: 'rgba(100, 255, 255, 0.9)'
            },
            '.msky-text-header': {
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '2.4rem',
              fontWeight: 'lighter'
            },
            '.msky-text-subheader': {
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '1.6rem',
              fontWeight: 'lighter'
            },
            '.msky-text-body': {
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '14px'
            },
            '.msky-text-body-secondary': {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem'
            },
            '.msky-text-caption': {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.8rem'
            },
            '.msky-bg-dark-075': {
              background: 'rgba(0,0,0,0.075)'
            },
            '.msky-bg-dark-1': {
              background: 'rgba(0,0,0,0.1)'
            },
            '.msky-bg-dark-15': {
              background: 'rgba(0,0,0,0.15)'
            },
            '.msky-bg-dark-20': {
              background: 'rgba(0,0,0,0.20)'
            },
            '.msky-bg-dark-25': {
              background: 'rgba(0,0,0,0.25)'
            },
            '.msky-bg-dark-30': {
              background: 'rgba(0,0,0,0.30)'
            },
            '.msky-bg-light-20': {
              background: 'rgba(255,255,255,0.20)'
            },
            '.msky-bg-light-30': {
              background: 'rgba(255,255,255,0.30)'
            },
            '.msky-bg-info': {
              backgroundColor: '#0066CC'
            },
            '.msky-bg-success': {
              backgroundColor: '#12A159'
            },
            '.msky-bg-warn': {
              backgroundColor: '#CC9833'
            },
            '.msky-bg-error': {
              backgroundColor: '#B8144B'
            },
          }
        )
    })
  ]
}

