import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export const selectCheckedItems = (state: RootState) => state.checkedItems;
export const selectCheckItemsInfo = (state: RootState) =>
  state.checkedItems.stocksCheckInfo;
export const selectIsAllChecked = (state: RootState) =>
  state.checkedItems.allChecked;

export const selectStockCheckedInfo = (stockId: string) =>
  createSelector(
    [selectCheckItemsInfo],
    stocksCheckInfo => stocksCheckInfo[stockId],
  );
export const selectIsPurchasedItemChecked = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector(
    [selectStockCheckedInfo(stockId)],
    checkedStockInfo => checkedStockInfo.purchasedItems[purchasedId],
  );

export const selectCheckedPurchasedItems = createSelector(
  [selectCheckItemsInfo],
  stocksCheckInfo => {
    const checkedPurchasedItems: { stockId: string; purchasedId: string }[] =
      [];

    Object.keys(stocksCheckInfo).forEach(stockId => {
      const purchasedItems = stocksCheckInfo[stockId].purchasedItems;
      Object.keys(purchasedItems).forEach(purchasedId => {
        if (purchasedItems[purchasedId]) {
          checkedPurchasedItems.push({ stockId, purchasedId });
        }
      });
    });
    return checkedPurchasedItems;
  },
);
