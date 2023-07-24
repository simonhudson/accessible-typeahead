import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/test/jestsetup.ts'],
};

export default jestConfig;
