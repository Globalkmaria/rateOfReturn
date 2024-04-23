import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import List from '../../pages/List';
import { renderWithProviders } from '../../__test__/renderUI';
import { setupServer } from 'msw/node';
import { TOP_STOCKS } from '../../__test__/mock/topStocks';

jest.mock('../../config', () => ({
  config: {
    server: {
      url: 'http://localhost:8080/api/v1',
    },
  },
}));

const handlers = [
  http.get('http://localhost:8080/api/v1/const/top-stocks', () => {
    return HttpResponse.json(TOP_STOCKS);
  }),
  http.get('http://localhost:8080/api/v1/auth/me', () => {
    return HttpResponse.json({});
  }),
];

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

describe('List Component', () => {
  test.only('List render', async () => {
    renderWithProviders(<List />);

    const heading = await screen.findByRole('heading', {
      name: /total buy price/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
