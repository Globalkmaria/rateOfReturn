import getDateAndTime from '@/utils/getDateAndTime';
import {
  PurchaseItemCollection,
  PurchasedItemInfo,
  StockMainInfo,
} from '../stockList/type';
import { Sold } from './type';
import { localStringToNumber } from '@/utils';

export const generateSoldInfoFromPurchasedInfo = (
  stock: StockMainInfo,
  purchased: PurchasedItemInfo,
): Omit<Sold, 'id'> => {
  const { date, time } = getDateAndTime();

  return {
    stockId: stock.stockId,
    stockName: stock.stockName,
    purchasedId: purchased.purchasedId,
    purchasedQuantity: localStringToNumber(purchased.purchasedQuantity),

    purchasedDate: purchased.purchasedDate,
    purchasedTime: purchased.purchasedTime,
    purchasedPrice: localStringToNumber(purchased.purchasedPrice),

    soldDate: date,
    soldTime: time,
    soldPrice: stock.currentPrice || '0',
    tag: stock.tag,
  };
};

export const generateSoldListWithStockInfo = (
  mainInfo: StockMainInfo,
  purchasedItems: PurchaseItemCollection,
) =>
  purchasedItems.allIds.map(purchasedItem => {
    return generateSoldInfoFromPurchasedInfo(
      mainInfo,
      purchasedItems.byId[purchasedItem],
    );
  });
