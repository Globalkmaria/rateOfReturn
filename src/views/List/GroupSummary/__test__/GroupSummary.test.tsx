import { screen, within } from '@testing-library/react';

import { CalculateStockSummaryResult, calculateGroupSummary } from '../utils';
import { renderWithProviders } from '../../../../__test__/renderUI';
import GroupSummary from '../GroupSummary';

jest.mock('../utils', () => ({
  calculateGroupSummary: jest.fn(),
}));

describe('GroupSummary Component', () => {
  test('Show summary values correctly', async () => {
    const mockData = {
      totalPurchasedPrice: 10000,
      totalCurrentValue: 12000,
      returnOfInvestment: 2000,
      returnOfInvestmentRatio: 20.123,
    };

    (calculateGroupSummary as jest.Mock).mockReturnValue(mockData);

    renderWithProviders(<GroupSummary />);

    const testCases = [
      {
        title: 'totalPurchasedPrice',
        headingName: /total buy price/i,
        valueText: '10,000',
      },
      {
        title: 'totalCurrentValue',
        headingName: /market value/i,
        valueText: '12,000',
      },
      {
        title: 'returnOfInvestment',
        headingName: /return/i,
        valueText: '2,000',
      },
      {
        title: 'returnOfInvestmentRatio',
        headingName: /rate of return/i,
        valueText: '20.123 %',
      },
    ];

    for (const { title, headingName, valueText } of testCases) {
      const section = screen.getByTitle(title, { exact: true });
      const withinSection = within(section);

      const heading = withinSection.getByRole('heading', {
        name: headingName,
      });
      expect(heading).toBeInTheDocument();

      const value = withinSection.getByText(valueText);
      expect(value).toBeInTheDocument();
    }
  });

  test('Return of Ration to show 0 % when the value is NaN', async () => {
    const mockData: CalculateStockSummaryResult = {
      totalPurchasedPrice: 10000,
      totalCurrentValue: 12000,
      returnOfInvestment: 2000,
      returnOfInvestmentRatio: NaN,
    };

    (calculateGroupSummary as jest.Mock).mockReturnValue(mockData);

    renderWithProviders(<GroupSummary />);

    const titleElement = screen.getByTitle(`returnOfInvestmentRatio`);
    const withInTitle = within(titleElement);

    const title = withInTitle.getByRole('heading', {
      name: /rate of return/i,
    });
    expect(title).toBeInTheDocument();
    const text = screen.getByText(/0 %/i);
    expect(text).toBeInTheDocument();
  });
});
