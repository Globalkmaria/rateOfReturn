import { vi } from 'vitest';
import { screen } from '@testing-library/react';

import { calculateGroupSummary } from '../utils';
import { renderWithProviders } from '../../../../__test__/renderUI';
import GroupSummary from '../GroupSummary';

vi.mock('../utils', () => ({
  calculateGroupSummary: vi.fn(),
}));

describe('GroupSummary Component', () => {
  test('GroupSummary render with correct summary values when returnOfInvestmentRatio is NaN', async () => {
    const mockData = {
      totalPurchasedPrice: 10000,
      totalCurrentValue: 12000,
      returnOfInvestment: 2000,
      returnOfInvestmentRatio: NaN,
    };

    (calculateGroupSummary as jest.Mock).mockReturnValue(mockData);

    renderWithProviders(<GroupSummary />, '/portfolio');

    const titleElement = screen.getByTitle(`returnOfInvestmentRatio`);
    expect(titleElement).toHaveTextContent('Return of Ration');
    expect(titleElement).toHaveTextContent('0 %');
  });

  test('GroupSummary render with correct summary values', async () => {
    const mockData = {
      totalPurchasedPrice: 10000,
      totalCurrentValue: 12000,
      returnOfInvestment: 2000,
      returnOfInvestmentRatio: 20.123,
    };

    (calculateGroupSummary as jest.Mock).mockReturnValue(mockData);

    renderWithProviders(<GroupSummary />, '/portfolio');

    const totalPurchasedPrice = screen.getByTitle(`totalPurchasedPrice`);
    expect(totalPurchasedPrice).toHaveTextContent('Total Buy Price');
    expect(totalPurchasedPrice).toHaveTextContent('10,000');

    const totalCurrentValue = screen.getByTitle(`totalCurrentValue`);
    expect(totalCurrentValue).toHaveTextContent('Total Current Value');
    expect(totalCurrentValue).toHaveTextContent('12,000');

    const returnOfInvestment = screen.getByTitle(`returnOfInvestment`);
    expect(returnOfInvestment).toHaveTextContent('Return');
    expect(returnOfInvestment).toHaveTextContent('2,000');

    const returnOfInvestmentRatio = screen.getByTitle(`returnOfInvestmentRatio`);
    expect(returnOfInvestmentRatio).toHaveTextContent('Return of Ration');
    expect(returnOfInvestmentRatio).toHaveTextContent('20.123 %');
  });
});
