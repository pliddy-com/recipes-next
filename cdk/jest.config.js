module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/**', '!test/**', '!**/*.d.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  roots: [
    '<rootDir>/test',
    '<rootDir>/lib'
    // '<rootDir>/lambda'
  ],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
