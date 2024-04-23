import { screen } from '@testing-library/react';

import List from '../../pages/List';
import { renderWithProviders } from '../../__test__/renderUI';

describe('List Component', () => {
  test('List render', async () => {
    renderWithProviders(<List />);

    const heading = await screen.findByRole('heading', {
      name: /total buy price/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
