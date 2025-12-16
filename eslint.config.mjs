import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [

  // Server (Node)
  {
    files: ['server/**/*.js'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
    }
  },

  // Client (React)
  {
    files: ['client/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      // Custom rules
      'no-console': 'warn',
      'no-useless-catch': 0,
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
    }
  }
];
