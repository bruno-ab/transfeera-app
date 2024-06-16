export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    modulePaths: ['.'],
    testMatch: [
        '**/?(*.)+(spec|test).ts',
        '**/test/modules/**/*.e2e-spec.ts'
    ],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['src/server/**/*.(t|j)s'],
    coveragePathIgnorePatterns: ['src/server/console', 'src/server/migration'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
};
