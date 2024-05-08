import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/__test__/renderUI';
import SoldTable from './SoldTable';
import { MOCK_STATE } from '@/__test__/mock/mockState';

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
    const row = await screen.findByRole('row', {
      name: /1 google/i,
    });

    expect(row).toBeInTheDocument();

    const ROW1_DISPLAY_TEXT = [
      '1',
      'Google',
      'stock',
      '2',
      '06/05/2023 02:13 PM',
      '2,000.0000',
      '4,000.0000',
      '',
      '',
      '4,400.0000',
      '400.0000',
      '10.00 %',
    ];
    const cells = within(row).getAllByRole('cell');
    for (let i = 0; i < ROW1_DISPLAY_TEXT.length; i++) {
      if (ROW1_DISPLAY_TEXT[i] === '') continue;
      expect(cells[i]).toHaveTextContent(ROW1_DISPLAY_TEXT[i]);
    }

    const soldDate = within(row).getByLabelText(/sold date/i);
    expect(soldDate).toHaveValue('2023-06-05');
    const soldTime = within(row).getByLabelText(/sold time/i);
    expect(soldTime).toHaveValue('14:14');
    const soldPrice = within(row).getByLabelText(/sold price/i);
    expect(soldPrice).toHaveValue('2,200.0000');
  });

  test('Update sold item', async () => {
    await renderAndWait(MOCK_STATE);
    const row = await screen.findByRole('row', {
      name: /1 google/i,
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
    const row = await screen.findByRole('row', {
      name: /1 google/i,
    });
    expect(row).toBeInTheDocument();

    const deleteBtn = within(row).getByRole('button', { name: /delete/i });
    await user.click(deleteBtn);

    const dialog = await screen.findByRole('dialog');
    const confirmBtn = within(dialog).getByRole('button', { name: /delete/i });
    await user.click(confirmBtn);

    expect(row).not.toBeInTheDocument();
  });
});
