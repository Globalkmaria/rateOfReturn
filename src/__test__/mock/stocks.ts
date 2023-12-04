import { StockListState } from '../../features/stockList/type';

export const STOCKS_DATA: StockListState['stocks'] = {
  byId: {
    '1': {
      mainInfo: {
        stockName: 'Google',
        currentPrice: 3400,
        stockId: '1',
      },
      purchasedItems: {
        byId: {
          '1': {
            purchasedId: '1',
            purchasedDate: '2023-01-01',
            purchasedQuantity: 2,
            purchasedPrice: 1800,
            purchasedTime: '09:57',
          },
          '2': {
            purchasedId: '2',
            purchasedDate: '2023-06-05',
            purchasedTime: '14:13',
            purchasedQuantity: 2,
            purchasedPrice: 2000,
          },
        },
        allIds: ['1', '2'],
      },
    },
    '2': {
      mainInfo: {
        stockName: 'Apple',
        currentPrice: 2000,
        stockId: '2',
      },
      purchasedItems: {
        byId: {
          '3': {
            purchasedId: '3',
            purchasedDate: '2023-05-26',
            purchasedQuantity: 1,
            purchasedPrice: 1000,
            purchasedTime: '13:01',
          },
          '4': {
            purchasedId: '4',
            purchasedDate: '2023-04-24',
            purchasedQuantity: 7,
            purchasedPrice: 1000,
            purchasedTime: '15:02',
          },
        },
        allIds: ['3', '4'],
      },
    },
  },
  allIds: ['1', '2'],
};

export const STOCKS_STATE: StockListState = {
  stocks: STOCKS_DATA,
  nextStockId: 3,
  nextPurchasedId: 5,
};
