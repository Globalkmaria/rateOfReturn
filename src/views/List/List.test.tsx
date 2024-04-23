import { screen, waitFor } from '@testing-library/react';
import List from '../../pages/List';
import { renderWithProviders } from '../../__test__/renderUI';
import { TOP_STOCKS } from '../../__test__/mock/topStocks';
import { createServer } from '@/__test__/server';

describe('List Component', () => {
  createServer([
    {
      url: '/const/top-stocks',
      response: TOP_STOCKS,
    },
    {
      url: '/auth/me',
      response: {},
    },
  ]);

  test('List render', async () => {
    renderWithProviders(<List />);
    await waitFor(
      () => {
        const heading = screen.getByRole('heading', {
          name: /total buy price/i,
        });

        return expect(heading).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
