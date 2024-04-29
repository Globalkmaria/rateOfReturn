import { SoldState } from './type';

export const SOLD_MOCK_DATA: SoldState = {
  list: {
    byId: {
      '1': {
        stockName: 'Google',
        purchaseId: '1',
        purchasedDate: '2023-06-05',
        purchasedTime: '14:13',
        purchasedQuantity: 2,
        purchasedPrice: 2000,
        soldDate: '2023-06-05',
        soldTime: '14:14',
        soldPrice: 2200,
      },
      '2': {
        stockName: 'Google',
        purchaseId: '2',
        purchasedDate: '2023-06-03',
        purchasedTime: '14:13',
        purchasedQuantity: 4,
        purchasedPrice: 2000,
        soldDate: '2023-06-03',
        soldTime: '15:13',
        soldPrice: 2500,
      },
      '3': {
        stockName: 'Apple',
        purchaseId: '3',
        purchasedDate: '2023-06-05',
        purchasedTime: '16:12',
        purchasedQuantity: 6,
        purchasedPrice: 2000,
        soldDate: '2023-06-05',
        soldTime: '14:13',
        soldPrice: 1800,
      },
    },
    allIds: ['1', '2', '3'],
  },
};
