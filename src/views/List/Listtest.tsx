import { screen, within } from '@testing-library/react';
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
    await screen.findByRole('heading', { name: /total buy price/i });
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
        name: /add stock/i,
      });

      const preSummaries = screen.queryByRole('cell', { name: /summary/i });
      expect(preSummaries).not.toBeInTheDocument();

      await user.click(addStockBtn);

      const summaries = screen.getAllByRole('cell', { name: /summary/i });
      expect(summaries).toHaveLength(1);

      const purchaseItem = screen.getByRole('textbox', {
        name: /purchased quantity/i,
      });
      expect(purchaseItem).toBeInTheDocument();

      const addPurchaseItemBtn = screen.getByRole('button', {
        name: /add item/i,
      });

      await user.click(addPurchaseItemBtn);

      const purchaseItems = screen.getAllByRole('textbox', {
        name: /purchased quantity/i,
      });
      expect(purchaseItems).toHaveLength(2);
    });

    test('When stock is removed, stock and all the items included in stock is removed', async () => {
      await renderAndWait(MOCK_STATE);
      let items = screen.getAllByRole('row', {
        name: /google \d+/i,
      });
      expect(items).toHaveLength(2);

      const stock = screen.getByRole('row', {
        name: /google summary/i,
      });
      const removeBtn = within(stock).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn);

      const deleteModal = screen.getByRole('dialog');
      const modalDeleteButton = within(deleteModal).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton);

      const stockAfterDelete = screen.queryByRole('row', {
        name: /google summary/i,
      });
      expect(stockAfterDelete).toBeNull();

      items = screen.queryAllByRole('row', {
        name: /google \d+/i,
      });

      expect(items).toHaveLength(0);
    });

    describe('Edit Stock', () => {
      test('Stock name is changed Summary and purchased items names are changed too', async () => {
        await renderAndWait(MOCK_STATE);

        const googleItems = screen.getAllByRole('row', {
          name: /google \d+/i,
        });
        const googleItemLength = googleItems.length;

        const stock = screen.getByRole('row', {
          name: /google summary/i,
        });
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

        const teslaStock = screen.getByRole('row', {
          name: /tesla summary/i,
        });
        expect(teslaStock).toBeInTheDocument();

        const teslaItems = screen.getAllByRole('row', {
          name: /tesla \d+/i,
        });
        expect(teslaItems).toHaveLength(googleItemLength);
      });
    });
  });

  describe('Purchase item', () => {
    test('When add item button is clicked new item is added', async () => {
      await renderAndWait(MOCK_STATE);

      const prePurchaseItems = screen.getAllByRole('textbox', {
        name: /purchased quantity/i,
      });

      const addStockBtn = screen.getAllByRole('button', {
        name: /add item/i,
      });
      await user.click(addStockBtn[0]);

      const purchaseItems = screen.getAllByRole('textbox', {
        name: /purchased quantity/i,
      });
      expect(purchaseItems).toHaveLength(prePurchaseItems.length + 1);
    });

    test('Item is removed correctly', async () => {
      await renderAndWait(MOCK_STATE);

      const item = screen.getByRole('row', {
        name: /google 1/i,
      });
      const removeBtn = within(item).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn);

      const deleteModal = screen.getByRole('dialog');
      const modalDeleteButton = within(deleteModal).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton);

      const itemAfterDelete = screen.queryByRole('row', {
        name: /google 1/i,
      });
      expect(itemAfterDelete).toBeNull();
    });

    test('When there is 1 item in Stock and item is removed, stock is also removed', async () => {
      await renderAndWait(MOCK_STATE);

      const item1 = screen.getByRole('row', {
        name: /google 1/i,
      });
      const removeBtn1 = within(item1).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn1);

      const deleteModal1 = screen.getByRole('dialog');
      const modalDeleteButton1 = within(deleteModal1).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton1);

      const itemAfterDelete1 = screen.queryByRole('row', {
        name: /google 1/i,
      });
      expect(itemAfterDelete1).toBeNull();

      const stock = screen.getByRole('row', {
        name: /google summary/i,
      });
      expect(stock).toBeInTheDocument();

      const item2 = screen.getByRole('row', {
        name: /google 2/i,
      });
      const removeBtn2 = within(item2).getByRole('button', {
        name: /delete/i,
      });
      await user.click(removeBtn2);

      const deleteModal2 = screen.getByRole('dialog');
      const modalDeleteButton2 = within(deleteModal2).getByRole('button', {
        name: /delete/i,
      });
      await user.click(modalDeleteButton2);

      const item2AfterDelete = screen.queryByRole('row', {
        name: /google 2/i,
      });
      expect(item2AfterDelete).toBeNull();

      const stockAfterItem2Deleted = screen.queryByRole('row', {
        name: /google summary/i,
      });
      expect(stockAfterItem2Deleted).not.toBeInTheDocument();
    });
  });
});
