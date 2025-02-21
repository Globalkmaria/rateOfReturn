import { PurchasedItemInfo, StockList, StockMainInfo } from './type';

export const getNewMainInfo = (newStockId: string): StockMainInfo => {
  return {
    stockName: '',
    currentPrice: '',
    stockId: newStockId,
    needInit: true,
  };
};

export const getNewPurchasedItemInfo = (
  newPurchasedId: string,
  date: string,
  time: string,
): PurchasedItemInfo => {
  return {
    purchasedId: newPurchasedId,
    purchasedDate: date,
    purchasedQuantity: '',
    purchasedPrice: '',
    purchasedTime: time,
    needInit: true,
  };
};

export const getNewStockInfo = (
  newStockId: string,
  newPurchasedId: string,
  date: string,
  time: string,
): StockList => {
  return {
    mainInfo: getNewMainInfo(newStockId),
    purchasedItems: {
      byId: {
        [newPurchasedId]: getNewPurchasedItemInfo(newPurchasedId, date, time),
      },
      allIds: [newPurchasedId],
    },
  };
};
