import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectStockList = (state: RootState) => {
  return {
    ...state.stockList,
    nextStockId: state.stockList.nextStockId + '',
    nextPurchasedId: state.stockList.nextPurchasedId + '',
  };
};
export const selectNextStockId = (state: RootState) => state.stockList.nextStockId + '';
export const selectNextPurchasedId = (state: RootState) => state.stockList.nextPurchasedId + '';
export const selectStocks = (state: RootState) => state.stockList.stocks;

export const selectStockInfoById = (stockId: string) => createSelector([selectStocks], stocks => stocks.byId[stockId]);
export const selectPurchasedItemsById = (stockId: string, purchasedId: string) =>
  createSelector([selectStockInfoById(stockId)], stocks => ({
    mainInfo: stocks.mainInfo,
    purchasedItem: stocks.purchasedItems.byId[purchasedId],
  }));
export const selectNextIds = () =>
  createSelector([selectNextStockId, selectNextPurchasedId], (nextStockId, nextPurchasedId) => ({
    nextStockId,
    nextPurchasedId,
  }));
