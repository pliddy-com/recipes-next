module.exports = {
  parserOptions: {
    project: './next/tsconfig.json'
  },
  env: {
    es6: true
  },
  root: true,
  /* Note the order of extended configs is important because of cascading overrides. */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals', // Next should always be second to last.
    'prettier' // Prettier should always be last.
  ],
  ignorePatterns: [
    '**/*.js',
    '/cdk.out/**/*.*',
    '.*rc.js',
    '**/*.d.ts',
    '/coverage/**/*.*'
  ],
  plugins: ['@typescript-eslint', 'jest'],
  // /* error rules are listed before warn rules */
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-constructor-return': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-implied-eval': 'error',
    'no-promise-executor-return': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',
    'object-shorthand': 'error',
    'require-atomic-updates': 'error',
    /* error rules are listed before warn rules */
    'no-duplicate-imports': 'warn',
    'no-template-curly-in-string': 'warn',
    'spaced-comment': ['warn', 'always', { exceptions: ['-', '+', '='] }]
  },
  overrides: [
    {
      files: ['migrations/**/*.{js,ts}'],
      env: {
        es6: true
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
