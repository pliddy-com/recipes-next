module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**',
    '!test/**',
    '!**/*.d.ts',
    '!lib/resources/branch/apiGateway.updateRecipe.*',
    '!lib/resources/branch/lambda/**'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  roots: ['<rootDir>/test', '<rootDir>/lib'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['lib/resources/branch/apiGateway.updateRecipe.ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
