import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import jest from 'eslint-plugin-jest';
import cypress from 'eslint-plugin-cypress';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser || {}).map(([key]) => [
            key,
            'readonly',
          ]),
        ),
        ...Object.fromEntries(
          Object.entries(globals.node || {}).map(([key]) => [key, 'readonly']),
        ),
        ...Object.fromEntries(
          Object.entries(globals.es2021 || {}).map(([key]) => [
            key,
            'readonly',
          ]),
        ),
        ...Object.fromEntries(
          Object.entries(globals.jest || {}).map(([key]) => [key, 'readonly']),
        ),
        Cypress: 'readonly',
        cy: 'readonly',
      },
    },
    plugins: {
      prettier,
      jest,
      cypress,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...jest.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.test.js'],
    rules: {
      'jest/prefer-expect-assertions': 'off',
    },
  },
  {
    files: ['**/*.cy.js', 'cypress/**/*.js'],
    plugins: { cypress },
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off', // This ensures `cy` is not flagged.
      'jest/valid-expect': 'off',
      'jest/expect-expect': 'off',
    },
  },
];
