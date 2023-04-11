import { StockListState } from './stockListSlice';

export const MOCK_DATA: StockListState['stocks'] = {
  byId: {
    1: {
      mainInfo: {
        stockName: 'Google',
        currentPrice: 1000,
        stockId: '1',
      },
      purchasedItems: {
        byId: {
          1: {
            purchasedId: '1',
            purchasedDate: '2023-04-04T09:57',
            purchasedQuantity: 10,
            purchasedPrice: 1000,
          },
          2: {
            purchasedId: '2',
            purchasedDate: '2023-04-04T09:57',
            purchasedQuantity: 10,
            purchasedPrice: 1000,
          },
        },
        allIds: ['1', '2'],
      },
    },
    2: {
      mainInfo: {
        stockName: 'Apple',
        currentPrice: 2000,
        stockId: '2',
      },
      purchasedItems: {
        byId: {
          3: {
            purchasedId: '3',
            purchasedDate: '2023-04-04T09:57',
            purchasedQuantity: 10,
            purchasedPrice: 1000,
          },
          4: {
            purchasedId: '4',
            purchasedDate: '2023-04-04T09:57',
            purchasedQuantity: 10,
            purchasedPrice: 1000,
          },
        },
        allIds: ['3', '4'],
      },
    },
  },
  allIds: ['1', '2'],
};

export const MOCK_DATA_NEXT_STOCK_ID = 3;
export const MOCK_DATA_PURCHASED_ID = 5;
