module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/test/**"],
    coverageDirectory: "src/coverage",
    testEnvironment: "node",
    testMatch: ["**/test/**/*.test.js?(x)"]
  };