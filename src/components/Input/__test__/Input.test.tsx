import { screen } from '@testing-library/react';

import { renderWithStyle } from '../../../__test__/renderUI';
import userEvent from '@testing-library/user-event';
import TestInput from './TestInput';

describe('Input component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeAll(() => {
    user = userEvent.setup();
  });

  describe('when type is decimal', () => {
    test('have attribute text and initial value to be empty', () => {
      renderWithStyle(<TestInput type='decimal' />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('value', '');
    });

    test('Add a comma after every 3 digits as a separator', async () => {
      renderWithStyle(<TestInput type='decimal' />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, '1234');
      expect(input).toHaveAttribute('value', '1,234');
    });

    test('Can add dot', async () => {
      renderWithStyle(<TestInput type='decimal' />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, '1234.');
      expect(input).toHaveAttribute('value', '1,234.');
    });

    test('Cannot add more than 1 dot', async () => {
      renderWithStyle(<TestInput type='decimal' />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, '1234..');
      expect(input).toHaveAttribute('value', '1,234.');
    });

    test('ignore letters that are not dot and number', async () => {
      renderWithStyle(<TestInput type='decimal' />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'a');
      expect(input).toHaveAttribute('value', '');
    });
  });

  describe('when type is number', () => {
    test('have attribute text and initial value to be empty', () => {
      renderWithStyle(<TestInput type='number' />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('value', '');
    });

    test('Add a comma after every 3 digits as a separator', async () => {
      renderWithStyle(<TestInput type='number' />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, '1234');
      expect(input).toHaveAttribute('value', '1,234');
    });

    test('ignore letters that are not number', async () => {
      renderWithStyle(<TestInput type='number' />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, 'a');
      expect(input).toHaveAttribute('value', '');
    });

    test('ignore dot', async () => {
      renderWithStyle(<TestInput type='number' />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.type(input, '.');
      expect(input).toHaveAttribute('value', '');
    });
  });
});
