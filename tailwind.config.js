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
      },
      screens: {
        '2xl': '1440px',
      },
      inset: {
        '1/2': '50%',
      },
    },
  },
  variants: {},
  plugins: [],
};
