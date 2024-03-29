import { expect, test, describe } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Home from '../../pages/Home';
import { renderWithProviders } from '../../__test__/renderUI';
import { TOP_STOCKS } from '../../__test__/mock/topStocks';

describe('Home Component', () => {
  test('Home render and Show Card', async () => {
    renderWithProviders(<Home />);
    expect(await screen.findByRole('heading', { name: /apple/i })).toBeInTheDocument();
  });

  test('Expand Card when Card is clicked and close when clicked again', async () => {
    renderWithProviders(<Home />);
    const description = TOP_STOCKS[0].description;
    expect(screen.queryByText(description)).not.toBeInTheDocument();

    await userEvent.click(await screen.findByRole('heading', { name: /apple/i }));
    expect(await screen.findAllByLabelText(/expand close button/i)).toHaveLength(1);
    expect(await screen.findByText(description)).toBeInTheDocument();

    await userEvent.click(await screen.findByRole('heading', { name: /apple/i }));
    expect(await screen.findAllByLabelText(/expand open button/i)).toHaveLength(3);
  });

  test(`When invest link is clicked Card doesn't change it's expand state`, async () => {
    renderWithProviders(<Home />);

    expect(await screen.findAllByLabelText(/expand open button/i)).toHaveLength(3);

    await userEvent.click((await screen.findAllByRole('link', { name: 'investing.com' }))[0]);
    expect(await screen.findAllByLabelText(/expand open button/i)).toHaveLength(3);
  });
});
