import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectStockList = (state: RootState) => state.stockList;
export const selectNextStockId = (state: RootState) =>
  state.stockList.nextStockId + '';
export const selectNextPurchasedId = (state: RootState) =>
  state.stockList.nextPurchasedId + '';
export const selectStocks = (state: RootState) => state.stockList.stocks;
export const selectStockTags = (state: RootState) => state.stockList.tags;

export const selectStockInfoById = (stockId: string) =>
  createSelector([selectStocks], stocks => stocks.byId[stockId]);
export const selectPurchasedItemsById = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector([selectStockInfoById(stockId)], stocks => ({
    mainInfo: stocks.mainInfo,
    purchasedItem: stocks.purchasedItems.byId[purchasedId],
  }));
export const selectNextIds = () =>
  createSelector(
    [selectNextStockId, selectNextPurchasedId],
    (nextStockId, nextPurchasedId) => ({
      nextStockId,
      nextPurchasedId,
    }),
  );
