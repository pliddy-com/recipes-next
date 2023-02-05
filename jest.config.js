// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const nextJest = require('next/jest');

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   dir: './',
// });

// // Add any custom config to be passed to Jest
// /** @type {import('jest').Config} */
// const customJestConfig = {
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
//   moduleDirectories: ['node_modules', '<rootDir>/src'],

//   // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
//   // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
//   // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
//   // For example:

//   // moduleNameMapper: {
//   //   '@/(.*)$': '<rootDir>/src/$1',
//   // },
//   testEnvironment: 'jest-environment-jsdom',
// };

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig);

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
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
