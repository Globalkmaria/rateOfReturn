import { envConfig } from './src/__test__/testEnv';

jest.mock('./src/config', () => envConfig);
