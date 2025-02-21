import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': eslintPluginTs,
      import: eslintPluginImport,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginJsxA11y.configs.recommended.rules,
      ...eslintPluginTs.configs.recommended.rules,
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'jsx-quotes': ['error', 'prefer-single'],
      'arrow-parens': ['error', 'as-needed'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-ins (fs, path, etc.)
            'external', // npm packages
            'internal', // Your project's internal aliases
            ['parent', 'sibling', 'index'], // Relative imports
            'object', // Imports using `import * as X`
            'type', // Type imports
          ],
          pathGroups: [
            {
              pattern: '{react,react-*}', // Ensures React imports are grouped first
              group: 'external',
              position: 'before',
            },
            {
              pattern: '{styled-components}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/service/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/views/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // Ensure newline between import groups
          alphabetize: {
            order: 'asc', // Sort imports alphabetically
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Try to resolve types for better linting
        },
      },
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
  },
];
