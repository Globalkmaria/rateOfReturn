import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../pages/Home';
import { renderWithProviders } from '../../__test__/renderUI';
import { TOP_STOCKS } from '../../__test__/mock/topStocks';
import { createServer } from '@/__test__/server';

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

describe('Home page', () => {
  test('Cards are showed correctly', async () => {
    renderWithProviders(<Home />);
    expect(await screen.findByRole('heading', { name: /apple/i })).toBeInTheDocument();
  });

  test('Expand Card when Card is clicked and close when clicked again', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    const description = TOP_STOCKS[0].description;
    expect(screen.queryByText(description)).not.toBeInTheDocument();

    let apple = await screen.findByRole('heading', { name: /apple/i });

    await user.click(apple);
    expect(await screen.findAllByLabelText(/expand close button/i)).toHaveLength(1);
    expect(await screen.findByText(description)).toBeInTheDocument();

    apple = await screen.findByRole('heading', { name: /apple/i });
    await user.click(apple);
    expect(await screen.findAllByLabelText(/expand open button/i)).toHaveLength(3);
  });

  test(`When invest link is clicked Card doesn't change it's expand state`, async () => {
    const user = userEvent.setup();
    renderWithProviders(<Home />);

    let expendButton = await screen.findAllByLabelText(/expand open button/i);
    expect(expendButton).toHaveLength(3);

    const link = (await screen.findAllByRole('link', { name: 'investing.com' }))[0];
    await user.click(link);
    expendButton = await screen.findAllByLabelText(/expand open button/i);
    expect(expendButton).toHaveLength(3);
  });
});
