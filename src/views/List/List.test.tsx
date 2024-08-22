import {
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import List from '../../pages/List';
import { renderWithProviders } from '../../__test__/renderUI';
import { TOP_STOCKS } from '../../__test__/mock/topStocks';
import { createServer } from '@/__test__/server';
import userEvent from '@testing-library/user-event';
import { MOCK_STATE } from '@/__test__/mock/mockState';

describe('List Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  createServer([
    { url: '/const/top-stocks', response: TOP_STOCKS },
    { url: '/auth/me', response: {} },
  ]);

  beforeAll(() => {
    user = userEvent.setup();
  });

  const renderAndWait = async (preloadedState = {}) => {
    renderWithProviders(<List />, { preloadedState });
    await screen.findByRole(
      'heading',
      { name: /total buy price/i },
      {
        timeout: 1500,
      },
    );
  };

  test('List Component is loaded correctly after Suspense', async () => {
    await renderAndWait();
    const heading = screen.getByRole('heading', {
      name: /total buy price/i,
    });
    expect(heading).toBeInTheDocument();
  });

  describe('Stock', () => {
    test('When add stock is clicked stock summary and new item is added', async () => {
      await renderAndWait();

      const addStockBtn = screen.getByRole('button', {
        name: /add new stock/i,
      });
      await user.click(addStockBtn);

      const summaries = screen.getAllByTestId('current__stock-summary');
      expect(summaries).toHaveLength(1);

      const purchaseItem = screen.getByTestId('current__purchased');
      expect(purchaseItem).toBeInTheDocument();
    });

    test('When add same stock is clicked, new purchased item is added', async () => {
      await renderAndWait(MOCK_STATE);

      const beforePurchasedItems =
        screen.getAllByTestId('current__purchased').length;

      const summaries = screen.getAllByTestId('current__stock-summary');
      const firstSummary = summaries[0];
      const withinFirstSummary = within(firstSummary);

      const moreBtn = withinFirstSummary.getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);

      const addSameStockBtn = withinFirstSummary.getByRole('button', {
        name: /add same stock/i,
      });
      await user.click(addSameStockBtn);

      const afterPurchasedItems =
        screen.getAllByTestId('current__purchased').length;

      expect(afterPurchasedItems).toBe(beforePurchasedItems + 1);
    });

    test('When stock is removed, stock and all the items included in stock is removed', async () => {
      await renderAndWait(MOCK_STATE);
      let items = screen.getAllByRole('row', {
        name: /google/i,
      });
      expect(items).toHaveLength(3);

      const stock = screen.getAllByRole('row', {
        name: /google/i,
      })[0];

      const moreBtn = within(stock).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);

      const removeBtn = within(stock).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn);

      const deleteModal = screen.getByRole('dialog');
      const modalDeleteButton = within(deleteModal).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton);

      expect(stock).not.toBeInTheDocument();

      items = screen.queryAllByRole('row', {
        name: /google \d+/i,
      });

      expect(items).toHaveLength(0);
    });

    describe('Edit Stock', () => {
      test('Stock name is changed Summary and purchased items names are changed too', async () => {
        await renderAndWait(MOCK_STATE);

        const noTeslaStock = screen.queryByRole('row', {
          name: /tesla/i,
        });
        expect(noTeslaStock).not.toBeInTheDocument();

        const googleItems = screen.getAllByRole('row', {
          name: /google /i,
        });
        const googleItemLength = googleItems.length;

        const stock = screen.getAllByRole('row', {
          name: /google/i,
        })[0];
        const editBtn = within(stock).getByRole('button', {
          name: /edit/i,
        });
        await user.click(editBtn);

        const stockNameInput = within(stock).getByRole('textbox', {
          name: /stock name/i,
        });
        await user.type(stockNameInput, 'Tesla');

        const saveBtn = screen.getByRole('button', { name: /save/i });
        await user.click(saveBtn);

        const teslaItems = screen.getAllByRole('row', {
          name: /tesla/i,
        });
        expect(teslaItems).toHaveLength(googleItemLength);
      });
    });
  });

  describe('Purchase item', () => {
    test('Item is removed correctly', async () => {
      await renderAndWait(MOCK_STATE);

      const item = screen.getByRole('row', {
        name: /google 1/i,
      });
      const moreBtn = within(item).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);
      const removeBtn = within(item).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn);

      const deleteModal = screen.getByRole('dialog');
      const modalDeleteButton = within(deleteModal).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton);

      expect(item).not.toBeInTheDocument();
    });

    test('When there is 1 item in Stock and item is removed, stock is also removed', async () => {
      await renderAndWait(MOCK_STATE);

      const item1 = screen.getAllByRole('row', {
        name: /google/i,
      })[1];

      const moreBtn = within(item1).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);

      const removeBtn1 = within(item1).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn1);

      const deleteModal1 = screen.getByRole('dialog');
      const modalDeleteButton1 = within(deleteModal1).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton1);

      expect(item1).not.toBeInTheDocument();

      const stock = screen.getAllByRole('row', {
        name: /google/i,
      })[0];
      expect(stock).toBeInTheDocument();
      const item2 = screen.getAllByRole('row', {
        name: /google/i,
      })[1];

      const moreBtn2 = within(item2).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn2);
      const removeBtn2 = within(item2).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn2);

      const deleteModal2 = screen.getByRole('dialog');
      const modalDeleteButton2 = within(deleteModal2).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton2);

      expect(item2).not.toBeInTheDocument();
      expect(stock).not.toBeInTheDocument();
    });
  });

  describe('When sold', () => {
    test('When current item is sold, item is removed from List page', async () => {
      await renderAndWait(MOCK_STATE);

      const item = screen.getByRole('row', {
        name: /google 1/i,
      });

      const moreBtn = within(item).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);

      const soldBtn = within(item).getByRole('button', {
        name: /sold/i,
      });
      await user.click(soldBtn);

      expect(item).not.toBeInTheDocument();
    });

    test('When current item is sold, and there is no more item in stock. Stock is removed.', async () => {
      await renderAndWait(MOCK_STATE);
      const stock = screen.getAllByRole('row', {
        name: /google/i,
      })[0];
      expect(stock).toBeInTheDocument();

      const items = screen.getAllByRole('row', {
        name: /google \d+ purchased/i,
      });

      expect(items).toHaveLength(2);

      // sell item 1
      const item1 = items[0];
      const moreBtn = within(item1).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);

      const soldBtn = within(item1).getByRole('button', {
        name: /sold/i,
      });
      await user.click(soldBtn);

      const itemsAfterSold = screen.getAllByRole('row', {
        name: /google \d+ purchased/i,
      });
      expect(itemsAfterSold).toHaveLength(1);

      expect(stock).toBeInTheDocument();

      // sell item2
      const item2 = items[1];
      const moreBtn2 = within(item2).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn2);
      const soldBtn2 = within(item2).getByRole('button', {
        name: /sold/i,
      });
      await user.click(soldBtn2);

      const itemsAfterSold2 = screen.queryAllByRole('row', {
        name: /google \d+/i,
      });
      expect(itemsAfterSold2).toHaveLength(0);

      expect(stock).not.toBeInTheDocument();
    });

    test('When stock is sold, stock is removed from List page', async () => {
      await renderAndWait(MOCK_STATE);

      const stock = screen.getAllByRole('row', {
        name: /google/i,
      })[0];
      const moreBtn = within(stock).getByRole('button', {
        name: /more/i,
      });
      await user.click(moreBtn);

      waitForElementToBeRemoved(stock);
      const items = screen.queryAllByRole('row', { name: /google \d+/i });
      waitForElementToBeRemoved(items);
    });
  });
});
