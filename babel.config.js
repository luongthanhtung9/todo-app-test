module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
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
          '@images': './assets/images',
          '@commons': './src/commons',
          '@models': './src/models',
          '@components': './src/components',
          '@containers': './src/containers',
          '@navigations': './src/navigations',
          '@redux': './src/redux',
          '@utils': './src/utils',
        }
      },
    ]
  ]
};
