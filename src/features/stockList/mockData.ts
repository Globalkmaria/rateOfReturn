import { StockListState } from './type';

export const MOCK_DATA: StockListState['stocks'] = {
  byId: {
    '1': {
      mainInfo: {
        stockName: 'Google',
        currentPrice: 3400,
        stockId: '1',
        tag: 'bond',
      },
      purchasedItems: {
        byId: {
          '2': {
            purchasedId: '2',
            purchasedDate: '2023-01-01',
            purchasedQuantity: 2,
            purchasedPrice: 1800,
            purchasedTime: '09:57',
          },
          '9': {
            purchasedId: '9',
            purchasedDate: '2023-06-05',
            purchasedTime: '14:13',
            purchasedQuantity: 2,
            purchasedPrice: 2000,
          },
        },
        allIds: ['2', '9'],
      },
    },
    '2': {
      mainInfo: {
        stockName: 'Apple',
        currentPrice: 2000,
        stockId: '2',
        tag: 'stock',
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
    '3': {
      mainInfo: {
        stockName: 'Tesla',
        currentPrice: 100,
        stockId: '3',
        tag: '',
      },
      purchasedItems: {
        byId: {
          '6': {
            purchasedId: '6',
            purchasedDate: '2023-06-04',
            purchasedQuantity: 13,
            purchasedPrice: 90,
            purchasedTime: '11:18',
          },
          '13': {
            purchasedId: '13',
            purchasedDate: '2023-06-07',
            purchasedTime: '15:26',
            purchasedQuantity: 3,
            purchasedPrice: 85,
          },
        },
        allIds: ['6', '13'],
      },
    },
    '4': {
      mainInfo: {
        stockName: 'MS',
        currentPrice: 4000,
        stockId: '4',
        tag: '',
      },
      purchasedItems: {
        byId: {
          '10': {
            purchasedId: '10',
            purchasedDate: '2023-06-05',
            purchasedQuantity: 1,
            purchasedPrice: 3400,
            purchasedTime: '14:15',
          },
          '14': {
            purchasedId: '14',
            purchasedDate: '2023-06-07',
            purchasedTime: '15:26',
            purchasedQuantity: 2,
            purchasedPrice: 4300,
          },
        },
        allIds: ['10', '14'],
      },
    },
    '5': {
      mainInfo: {
        stockName: 'TLT',
        currentPrice: 4000,
        stockId: '5',
        tag: 'bond',
      },
      purchasedItems: {
        byId: {
          '16': {
            purchasedId: '16',
            purchasedDate: '2024-02-22',
            purchasedQuantity: 1,
            purchasedPrice: 3400,
            purchasedTime: '14:15',
          },
          '17': {
            purchasedId: '17',
            purchasedDate: '2024-04-28',
            purchasedTime: '15:26',
            purchasedQuantity: 2,
            purchasedPrice: 4300,
          },
        },
        allIds: ['16', '17'],
      },
    },
  },
  allIds: ['1', '2', '3', '4', '5'],
};

export const MOCK_DATA_NEXT_STOCK_ID = 5;
export const MOCK_DATA_PURCHASED_ID = 18;
export const MOCK_DATA_TAGS = ['stock', 'bond'];

export const STOCK_STATE_SAMPLE: StockListState = {
  stocks: MOCK_DATA,
  nextStockId: MOCK_DATA_NEXT_STOCK_ID,
  nextPurchasedId: MOCK_DATA_PURCHASED_ID,
  tags: MOCK_DATA_TAGS,
};
