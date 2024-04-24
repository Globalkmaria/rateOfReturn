import { screen, waitFor } from '@testing-library/react';
import List from '../../pages/List';
import { renderWithProviders } from '../../__test__/renderUI';
import { TOP_STOCKS } from '../../__test__/mock/topStocks';
import { createServer } from '@/__test__/server';
import userEvent from '@testing-library/user-event';
import { MOCK_STATE } from '@/__test__/mock/mockState';

describe('List Component is rendered correctly after suspense', () => {
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

  test('List Component is loaded correctly after Suspense', async () => {
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

describe('When add stock is clicked', () => {
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

  test('Stock summary and new item is added correctly', async () => {
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

    const addStockBtn = screen.getByRole('button', {
      name: /add stock/i,
    });

    const Summaries = screen.queryByRole('cell', { name: /summary/i });
    expect(Summaries).not.toBeInTheDocument();

    userEvent.click(addStockBtn);
    await waitFor(() => {
      const Summaries = screen.getAllByRole('cell', { name: /summary/i });
      expect(Summaries).toHaveLength(1);

      const purchaseItem = screen.getByRole('textbox', { name: /purchased quantity/i });
      expect(purchaseItem).toBeInTheDocument();
    });

    const addPurchaseItemBtn = screen.getByRole('button', {
      name: /add item/i,
    });

    userEvent.click(addPurchaseItemBtn);

    await waitFor(() => {
      const purchaseItems = screen.getAllByRole('textbox', { name: /purchased quantity/i });
      expect(purchaseItems).toHaveLength(2);
    });
  });
});

test('When add item is clicked new item is added correctly ', async () => {
  renderWithProviders(<List />, { preloadedState: MOCK_STATE });
  await waitFor(
    () => {
      const heading = screen.getByRole('heading', {
        name: /total buy price/i,
      });

      return expect(heading).toBeInTheDocument();
    },
    { timeout: 2000 },
  );

  const prePurchaseItems = screen.getAllByRole('textbox', { name: /purchased quantity/i });

  const addStockBtn = screen.getAllByRole('button', {
    name: /add item/i,
  });
  userEvent.click(addStockBtn[0]);

  waitFor(() => {
    const purchaseItems = screen.getAllByRole('textbox', { name: /purchased quantity/i });
    expect(purchaseItems).toHaveLength(prePurchaseItems.length + 1);
  });
});
