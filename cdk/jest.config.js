module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**', '!test/**', '!**/*.d.ts'],
  roots: [
    '<rootDir>/test',
    '<rootDir>/lib',
    // '<rootDir>/lambda'
  ],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
