module.exports = {
  rootDir: './', // Tells Jest to look from the root of the project
  testMatch: [
    '**/test/integration/**/*.spec.ts', // Make sure Jest looks in test/integration/
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Use ts-jest for transforming TypeScript files
  },
  testEnvironment: 'node', // Use Node.js environment for tests
};
