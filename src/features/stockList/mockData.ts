import { StockListState } from './type';

export const MOCK_DATA: StockListState['stocks'] = {
  byId: {
    '2': {
      mainInfo: {
        stockName: 'SPDR S&P 500',
        currentPrice: '523.3000',
        stockId: '2',
        needInit: false,
        tag: 'stock etf',
      },
      purchasedItems: {
        byId: {
          '2': {
            purchasedId: '2',
            purchasedDate: '2023-03-24',
            purchasedQuantity: '4',
            purchasedPrice: '399.3250',
            purchasedTime: '23:26',
            needInit: false,
          },
          '3': {
            purchasedId: '3',
            purchasedDate: '2023-03-27',
            purchasedQuantity: '9',
            purchasedPrice: '395.6061',
            purchasedTime: '23:30',
            needInit: false,
          },
        },
        allIds: ['2', '3'],
      },
    },
    '4': {
      mainInfo: {
        stockName: 'TLT',
        currentPrice: '90.8600',
        stockId: '4',
        needInit: false,
        tag: 'bond',
      },
      purchasedItems: {
        byId: {
          '5': {
            purchasedId: '5',
            purchasedDate: '2023-09-23',
            purchasedQuantity: '8',
            purchasedPrice: '93.7700',
            purchasedTime: '23:31',
            needInit: false,
          },
          '12': {
            purchasedId: '12',
            purchasedDate: '2023-03-07',
            purchasedQuantity: '10',
            purchasedPrice: '94.5800',
            purchasedTime: '23:32',
            needInit: false,
          },
        },
        allIds: ['5', '12'],
      },
    },
    '14': {
      mainInfo: {
        stockName: 'IEF',
        currentPrice: '92.8800',
        stockId: '14',
        needInit: false,
        tag: 'bond',
      },
      purchasedItems: {
        byId: {
          '14': {
            purchasedId: '14',
            purchasedDate: '2023-10-11',
            purchasedQuantity: '8',
            purchasedPrice: '90.5500',
            purchasedTime: '23:36',
            needInit: false,
          },
        },
        allIds: ['14'],
      },
    },
    '15': {
      mainInfo: {
        stockName: 'QQQ',
        currentPrice: '445.9300',
        stockId: '15',
        needInit: false,
        tag: 'stock etf',
      },
      purchasedItems: {
        byId: {
          '15': {
            purchasedId: '15',
            purchasedDate: '2023-05-25',
            purchasedQuantity: '2',
            purchasedPrice: '341.9650',
            purchasedTime: '23:40',
            needInit: false,
          },
          '16': {
            purchasedId: '16',
            purchasedDate: '2023-05-16',
            purchasedQuantity: '7',
            purchasedPrice: '327.2728',
            purchasedTime: '23:42',
            needInit: false,
          },
        },
        allIds: ['15', '16'],
      },
    },
    '22': {
      mainInfo: {
        stockName: 'Alphabet',
        currentPrice: '171.9300',
        stockId: '22',
        needInit: false,
        tag: 'stock',
      },
      purchasedItems: {
        byId: {
          '22': {
            purchasedId: '22',
            purchasedDate: '2023-07-21',
            purchasedQuantity: '24',
            purchasedPrice: '120.5643',
            purchasedTime: '00:44',
            needInit: false,
          },
        },
        allIds: ['22'],
      },
    },
    '23': {
      mainInfo: {
        stockName: 'Amazon',
        currentPrice: '187.0700',
        stockId: '23',
        needInit: false,
        tag: 'stock',
      },
      purchasedItems: {
        byId: {
          '23': {
            purchasedId: '23',
            purchasedDate: '2023-10-23',
            purchasedQuantity: '18',
            purchasedPrice: '133.4882',
            purchasedTime: '00:44',
            needInit: false,
          },
        },
        allIds: ['23'],
      },
    },
    '29': {
      mainInfo: {
        stockName: 'Tesla',
        currentPrice: '174.9500',
        stockId: '29',
        needInit: false,
        tag: 'stock',
      },
      purchasedItems: {
        byId: {
          '29': {
            purchasedId: '29',
            purchasedDate: '2024-02-20',
            purchasedQuantity: '8',
            purchasedPrice: '191.2300',
            purchasedTime: '00:47',
            needInit: false,
          },
          '30': {
            purchasedId: '30',
            purchasedDate: '2024-02-24',
            purchasedQuantity: '4',
            purchasedPrice: '199.4700',
            purchasedTime: '00:49',
            needInit: false,
          },
          '32': {
            purchasedId: '32',
            purchasedDate: '2024-04-24',
            purchasedQuantity: '6',
            purchasedPrice: '173.8700',
            purchasedTime: '02:49',
            needInit: false,
          },
        },
        allIds: ['29', '30', '32'],
      },
    },
  },
  allIds: ['2', '4', '14', '15', '22', '23', '29'],
};

export const MOCK_DATA_NEXT_STOCK_ID = 35;
export const MOCK_DATA_PURCHASED_ID = 20;
export const MOCK_DATA_TAGS = ['bond', 'stock', 'stock etf'];

export const STOCK_STATE_SAMPLE: StockListState = {
  stocks: MOCK_DATA,
  nextStockId: MOCK_DATA_NEXT_STOCK_ID,
  nextPurchasedId: MOCK_DATA_PURCHASED_ID,
  tags: MOCK_DATA_TAGS,
};
