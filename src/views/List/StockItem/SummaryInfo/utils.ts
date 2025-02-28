import {
  PurchaseItemCollection,
  PurchasedItemInfo,
  StockMainInfo,
} from '@/features/stockList/type';

import { NewSold } from '@/repository/userSolds';
import { localStringToNumber } from '@/utils';

export const generateSoldItem = (
  mainInfo: StockMainInfo,
  purchasedItem: PurchasedItemInfo,
) => {
  return {
    ...purchasedItem,
    purchasedPrice: localStringToNumber(purchasedItem.purchasedPrice),
    purchasedQuantity: localStringToNumber(purchasedItem.purchasedQuantity),
    stockId: mainInfo.stockId,
    stockName: mainInfo.stockName,
    soldPrice: localStringToNumber(mainInfo.currentPrice),
    tag: mainInfo.tag,
  };
};

export const generateSoldItems = (
  mainInfo: StockMainInfo,
  purchasedItems: PurchaseItemCollection,
) => {
  return purchasedItems.allIds.map<NewSold>(purchasedId =>
    generateSoldItem(mainInfo, purchasedItems.byId[purchasedId]),
  );
};
