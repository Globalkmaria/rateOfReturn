import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SOLD_MOCK_DATA } from '@/features/solds';

import { MOCK_STATE } from '@/__test__/mock/mockState';
import { renderWithProviders } from '@/__test__/renderUI';

import SoldTable from './SoldTable';

describe('Sold Table', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeAll(() => {
    user = userEvent.setup();
  });

  const renderAndWait = async (preloadedState = {}) => {
    renderWithProviders(<SoldTable />, { preloadedState });
    await screen.findByRole('table', undefined, { timeout: 1500 });
  };

  test('Sold table display data correctly', async () => {
    await renderAndWait(MOCK_STATE);
    const name = new RegExp(SOLD_MOCK_DATA.list.byId['1'].stockName, 'i');
    const row = await screen.findByRole('row', {
      name,
    });

    expect(row).toBeInTheDocument();

    const ROW1_DISPLAY_TEXT = [
      '1',
      'APPLE',
      'stock',
      '12',
      '05/16/2024 12:53 AM',
      '161.7272',
      '1,940.7264',
      '',
      '',
      '2,167.2000',
      '226.4735',
      '11.67 %',
    ];
    const cells = within(row).getAllByRole('cell');
    for (let i = 0; i < ROW1_DISPLAY_TEXT.length; i++) {
      if (ROW1_DISPLAY_TEXT[i] === '') continue;
      expect(cells[i]).toHaveTextContent(ROW1_DISPLAY_TEXT[i]);
    }

    const soldDate = within(row).getByLabelText(/sold date/i);
    expect(soldDate).toHaveValue('2024-05-16');
    const soldTime = within(row).getByLabelText(/sold time/i);
    expect(soldTime).toHaveValue('00:53');
    const soldPrice = within(row).getByLabelText(/sold price/i);
    expect(soldPrice).toHaveValue('180.6000');
  });

  test('Update sold item', async () => {
    await renderAndWait(MOCK_STATE);
    const name = new RegExp(SOLD_MOCK_DATA.list.byId['1'].stockName, 'i');
    const row = await screen.findByRole('row', {
      name,
    });

    const editBtn = within(row).getByRole('button', { name: /edit/i });
    await user.click(editBtn);

    const soldPrice = within(row).getByLabelText(/sold price/i);
    await user.clear(soldPrice);
    await user.type(soldPrice, '3400');

    const saveBtn = within(row).getByRole('button', { name: /save/i });
    await user.click(saveBtn);

    expect(soldPrice).toHaveValue('3,400.0000');
  });

  test('Delete sold item', async () => {
    await renderAndWait(MOCK_STATE);
    const name = new RegExp(SOLD_MOCK_DATA.list.byId['1'].stockName, 'i');
    const row = await screen.findByRole('row', {
      name: name,
    });
    expect(row).toBeInTheDocument();

    const editBtn = within(row).getByRole('button', { name: /more/i });
    await user.click(editBtn);
    const deleteBtn = within(row).getByRole('button', { name: /delete/i });
    await user.click(deleteBtn);

    const dialog = await screen.findByRole('dialog');
    const confirmBtn = within(dialog).getByRole('button', { name: /delete/i });
    await user.click(confirmBtn);

    expect(row).not.toBeInTheDocument();
  });
});
