import { screen } from '@testing-library/react';

import { Input } from '../Input';
import { renderWithStyle } from '../../../__test__/renderUI';

describe('Input component', () => {
  let onChange: jest.Mock;
  let onBlur: jest.Mock;

  beforeEach(() => {
    onChange = jest.fn();
    onBlur = jest.fn();
  });

  describe('when type is number', () => {
    test('have attribute text and initial value to be 0', () => {
      renderWithStyle(<Input type='number' onChange={onChange} onBlur={onBlur} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('value', '0');
    });
  });
});
