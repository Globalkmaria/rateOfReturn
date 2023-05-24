import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectStockList = (state: RootState) => state.stockList;
export const selectStocks = (state: RootState) => state.stockList.stocks;
export const selectStockInfoById = (stockId: string) =>
  createSelector([selectStocks], (stocks) => stocks.byId[stockId]);
export const selectPurchasedItemsById = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector([selectStockInfoById(stockId)], (stocks) => ({
    mainInfo: stocks.mainInfo,
    purchasedItem: stocks.purchasedItems.byId[purchasedId],
  }));
