module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.js'],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px',
      },
    },
  },
  variants: {},
  plugins: [],
};
