module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/lib/**',
    '<rootDir>/bin/**',
    '!test/**',
    '!**/*.d.ts',
    '!**/*.json',
    '!**/*.test.*'
    // '!lib/resources/branch/lambda/**'
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100
  //   }
  // },
  roots: ['<rootDir>/test', '<rootDir>/lib', '<rootDir>/bin'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
