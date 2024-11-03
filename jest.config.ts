import type { Config as JestConfig } from '@jest/types';

const config: JestConfig.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/src/setupTests.ts'],
};

export default config;