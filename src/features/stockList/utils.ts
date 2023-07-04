import { getCurrentDateAndTime } from '../../views/List/StockItem/utils';
import { PurchasedItemInfo, StockList, StockMainInfo } from './type';

export const objectToArray = (Obj: { [key: string | number]: any }) => {
  return Object.keys(Obj).map((ObjKey) => Obj[ObjKey]);
};

export const getNewMainInfo = (newStockId: string): StockMainInfo => {
  return {
    stockName: '',
    currentPrice: 0,
    stockId: newStockId,
  };
};

export const getNewPurchasedItemInfo = (
  newPurchasedId: string,
): PurchasedItemInfo => {
  const { date, time } = getCurrentDateAndTime();
  return {
    purchasedId: newPurchasedId,
    purchasedDate: date,
    purchasedQuantity: 0,
    purchasedPrice: 0,
    purchasedTime: time,
  };
};

export const getNewStockInfo = (
  newStockId: string,
  newPurchasedId: string,
): StockList => {
  return {
    mainInfo: getNewMainInfo(newStockId),
    purchasedItems: {
      byId: {
        [newPurchasedId]: getNewPurchasedItemInfo(newPurchasedId),
      },
      allIds: [newPurchasedId],
    },
  };
};
