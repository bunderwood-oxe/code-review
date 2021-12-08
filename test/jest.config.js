module.exports = config = {
    preset: 'ts-jest',
    transform: { '\\.[jt]s?$': 'babel-jest' },
    rootDir: '../',
    extensionsToTreatAsEsm: ['.ts'],
    testMatch: ['<rootDir>/**/*.test.{js,ts}'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    modulePathIgnorePatterns: ['/node_modules/', '/server/build/', '/client/build'],
    testPathIgnorePatterns: ['/node_modules/', '/server/build/', '/client/build'],
    transformIgnorePatterns: ['/server/db/'],
    // collectCoverage: true,
    // coverageDirectory: '<rootDir>/test/coverage',
    // collectCoverageFrom: ['**/src/*.{js,jsx,ts}', '!**/node_modules/**', '!**/build/**', '!**/test/**'],
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    // globalTeardown: '<rootDir>/test/teardown.ts',
    clearMocks: true, // reset all mock calls between tests
};
