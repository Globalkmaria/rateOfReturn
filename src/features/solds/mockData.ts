import { SoldsState } from './type';

export const SOLD_MOCK_DATA: SoldsState = {
  list: {
    byId: {
      '1': {
        stockId: '34',
        stockName: 'APPLE',
        symbol: 'AAPL',
        purchasedId: '34',
        purchasedQuantity: 12,
        purchasedDate: '2024-05-16',
        purchasedTime: '00:53',
        purchasedPrice: 161.7272,
        soldDate: '2024-05-16',
        soldTime: '00:53',
        soldPrice: '180.6000',
        tag: 'stock',
        id: '1',
      },
      '2': {
        stockId: '29',
        stockName: 'Tesla',
        symbol: 'TSLA',
        purchasedId: '31',
        purchasedQuantity: 7,
        purchasedDate: '2024-04-24',
        purchasedTime: '00:52',
        purchasedPrice: 173.71,
        soldDate: '2024-05-16',
        soldTime: '01:21',
        soldPrice: '174.9500',
        tag: 'stock',
        id: '2',
      },
    },
    allIds: ['1', '2'],
  },
  nextId: 3,
};
