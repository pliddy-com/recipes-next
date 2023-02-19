// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest').default;

const createJestConfig = nextJest({
  dir: './', // Tell Next where to load next.config.js and .env files
});

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/types/generated/**',
    '!**/node_modules/**',
    '!src/theme/**',
    '!src/**.config.ts',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
