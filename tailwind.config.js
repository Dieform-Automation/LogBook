module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'rotate-90-cw': 'rotate-90-cw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'rotate-90-ccw':
          'rotate-90-ccw 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        'rotate-90-cw': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        'rotate-90-ccw': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(-90deg)' },
        },
      },
      screens: {
        '2xl': '1440px',
        '3xl': '2560px',
      },
      inset: {
        '1/2': '50%',
      },
    },
  },
  variants: {
    opacity: ['disabled'],
  },
  plugins: [],
};
