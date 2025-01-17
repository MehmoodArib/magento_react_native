module.exports = {
  root: true,
  'extends': [
    '@react-native-community',
    'airbnb'
  ],
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  "plugins": [
    "react-hooks"
  ],
  'rules': {
    'prettier/prettier': 0,
    'linebreak-style': 0,
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'warn',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-cycle': 'off',
    'import/no-extraneous-dependencies': [
      {
        devDependencies: [
          'storybook/**',
          '**/stories.js'
        ]
      }
    ]
  },
  'globals': {
    'fetch': false
  }
};
