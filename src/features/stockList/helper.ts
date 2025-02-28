import { StockList, StockMainInfo } from './type';
import { TemporalPurchaseItems } from '../temporalStockList/type';

export const updateStockMainInfo = (
  stock: StockList,
  updates: Partial<StockMainInfo>,
) => {
  stock.mainInfo = { ...stock.mainInfo, ...updates };
};

export const updatePurchasedItems = (
  stock: StockList,
  purchasedUpdates: TemporalPurchaseItems,
) => {
  const purchasedItems = stock.purchasedItems;
  Object.keys(purchasedUpdates).forEach(purchasedId => {
    purchasedItems.byId[purchasedId] = {
      ...purchasedItems.byId[purchasedId],
      ...purchasedUpdates[purchasedId],
    };
  });
};
