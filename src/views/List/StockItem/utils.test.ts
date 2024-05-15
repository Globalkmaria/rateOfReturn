import { getFixedLocaleString } from '@/utils';
import { STOCKS_DATA } from '../../../__test__/mock/stocks';
import { getGroupPurchasedData, getStockSummaryInfo } from './utils';

describe('getStockSummaryInfo should return correct data', () => {
  test('when main group is selected', () => {
    expect(getStockSummaryInfo(STOCKS_DATA.byId[1], true)).toEqual({
      purchaseQuantitySum: 4,
      purchasePriceAverage: 1900,
      totalPurchasePrice: 7600,
      evaluationPrice: 13600,
      evaluationProfit: 6000,
      profitRate: 78.94736842105263,
    });
  });
  test('when group is selected', () => {
    expect(getStockSummaryInfo(STOCKS_DATA.byId[1], false, ['1'])).toEqual({
      purchaseQuantitySum: 2,
      purchasePriceAverage: 1800,
      totalPurchasePrice: 3600,
      evaluationPrice: 6800,
      evaluationProfit: 3200,
      profitRate: 88.88888888888889,
    });
  });
});

describe('getGroupPurchasedData should return correct data', () => {
  test('when all data is chosen', () => {
    expect(
      getGroupPurchasedData(STOCKS_DATA.byId['1'].purchasedItems, ['1', '2']),
    ).toEqual({
      allIds: ['1', '2'],
      byId: {
        '1': {
          purchasedId: '1',
          purchasedDate: '2023-01-01',
          purchasedQuantity: (2).toLocaleString(),
          purchasedPrice: getFixedLocaleString(1800),
          purchasedTime: '09:57',
        },
        '2': {
          purchasedId: '2',
          purchasedDate: '2023-06-05',
          purchasedTime: '14:13',
          purchasedQuantity: (2).toLocaleString(),
          purchasedPrice: getFixedLocaleString(2000),
        },
      },
    });
  });

  test('when 1 item is chosen', () => {
    expect(
      getGroupPurchasedData(STOCKS_DATA.byId['1'].purchasedItems, ['1']),
    ).toEqual({
      allIds: ['1'],
      byId: {
        '1': {
          purchasedId: '1',
          purchasedDate: '2023-01-01',
          purchasedQuantity: (2).toLocaleString(),
          purchasedPrice: getFixedLocaleString(1800),
          purchasedTime: '09:57',
        },
      },
    });
  });
});
