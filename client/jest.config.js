// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest').default;

const createJestConfig = nextJest({
  dir: './' // Tell Next where to load next.config.js and .env files
});

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    '!cdk/**/*.*',
    '!.github/**',
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/types/**',
    '!**/node_modules/**',
    '!src/theme/**',
    '!src/**.config.ts',
    '!src/scripts/*.*'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/.github'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom'
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
