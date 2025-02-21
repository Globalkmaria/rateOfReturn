import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { envConfig } from './testEnv';

interface HandlerConfig {
  method?: 'get' | 'post' | 'put' | 'delete' | 'head' | 'patch' | 'options';
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}

export function createServer(handlerConfigs: HandlerConfig[]) {
  const handlers = handlerConfigs.map(config => {
    return http[config.method || 'get'](
      envConfig.config.server.url + config.url,
      () => HttpResponse.json(config.response),
    );
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
}
