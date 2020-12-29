module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'transform-remove-console',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@screens': './app/screens',
          '@styles': './app/styles',
          '@constants': './app/constants',
          '@atoms': './app/components/atoms',
          '@molecules': './app/components/molecules',
          '@overlays': './app/overlays',
          '@organisms': './app/components/organisms',
          '@navigation': './app/navigation',
          '@assets': './app/assets',
          '@pages': './app/pages',
          '@store': './app/store',
          '@utils': './app/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
