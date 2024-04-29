import { SoldsState } from './type';

export const SOLD_MOCK_DATA: SoldsState = {
  list: {
    byId: {
      '111': {
        stockName: 'Google',
        purchasedId: '111',
        purchasedDate: '2023-06-05',
        purchasedTime: '14:13',
        purchasedQuantity: 2,
        purchasedPrice: 2000,
        soldDate: '2023-06-05',
        soldTime: '14:14',
        soldPrice: 2200,
      },
      '112': {
        stockName: 'Google',
        purchasedId: '112',
        purchasedDate: '2023-06-03',
        purchasedTime: '14:13',
        purchasedQuantity: 4,
        purchasedPrice: 2000,
        soldDate: '2023-06-03',
        soldTime: '15:13',
        soldPrice: 2500,
      },
      '113': {
        stockName: 'Apple',
        purchasedId: '113',
        purchasedDate: '2023-06-05',
        purchasedTime: '16:12',
        purchasedQuantity: 6,
        purchasedPrice: 2000,
        soldDate: '2023-06-05',
        soldTime: '14:13',
        soldPrice: 1800,
      },
    },
    allIds: ['111', '112', '113'],
  },
};
