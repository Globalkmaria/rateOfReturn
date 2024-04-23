export default {
  preset: 'ts-jest',
  testEnvironment: './test.environment.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '@/features': '<rootDir>/src/features',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
