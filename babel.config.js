const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {node: 'current'},
        modules: isTest ? 'commonjs' : false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          types: './src/types',
          hooks: './src/hooks',
          context: './src/context',
          utils: './src/utils',
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties'],
  ],
  env: {
    production: {
      only: ['src'],
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
  },
};
