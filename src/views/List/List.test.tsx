import { render, screen } from '@testing-library/react';
import List from '../../pages/List';
import { wrapper } from '../../test/renderUI';

describe('List Component', () => {
  test('List render', async () => {
    render(<List />, {
      wrapper: () => wrapper('/portfolio'),
    });

    expect(
      screen.getByRole('heading', {
        name: /total buy price/i,
      }),
    ).toBeInTheDocument();
  });
});
