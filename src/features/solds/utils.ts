import getDateAndTime from '@/utils/getDateAndTime';
import { PurchasedItemInfo, StockMainInfo } from '../stockList/type';
import { Sold } from './type';

export const getSoldInfoFromPurchasedInfo = (
  stock: StockMainInfo,
  purchased: PurchasedItemInfo,
): Omit<Sold, 'id'> => {
  const { date, time } = getDateAndTime();

  return {
    stockId: stock.stockId,
    stockName: stock.stockName,
    purchasedId: purchased.purchasedId,
    purchasedQuantity: purchased.purchasedQuantity,

    purchasedDate: purchased.purchasedDate,
    purchasedTime: purchased.purchasedTime,
    purchasedPrice: purchased.purchasedPrice,

    soldDate: date,
    soldTime: time,
    soldPrice: stock.currentPrice || 0,
    tag: stock.tag,
  };
};
