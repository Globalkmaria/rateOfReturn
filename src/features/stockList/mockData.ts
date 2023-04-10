import { StockList } from './stockListSlice';

export const MOCK_DATA: { [key: string]: StockList } = {
  1: {
    mainInfo: {
      stockName: 'Google',
      currentPrice: 1000,
      stockId: '1',
    },
    purchasedItems: {
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
  },
  2: {
    mainInfo: {
      stockName: 'Apple',
      currentPrice: 2000,
      stockId: '2',
    },
    purchasedItems: {
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
  },
};

export const MOCK_DATA_NEXT_STOCK_ID = 3;
export const MOCK_DATA_PURCHASED_ID = 5;
