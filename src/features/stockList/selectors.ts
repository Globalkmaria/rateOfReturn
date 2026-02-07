import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export const selectStockList = (state: RootState) => state.stockList;
export const selectNextStockId = (state: RootState) =>
  state.stockList.nextStockId + '';
export const selectNextPurchasedId = (state: RootState) =>
  state.stockList.nextPurchasedId + '';
export const selectStocks = (state: RootState) => state.stockList.stocks;
export const selectStockTags = (state: RootState) => state.stockList.tags;

export const selectStockInfoById =
  (stockId: string) => (state: RootState) =>
    state.stockList.stocks.byId[stockId];

const EMPTY_IDS: string[] = [];
export const selectStockPurchasedIds =
  (stockId: string | null) => (state: RootState) =>
    stockId === null
      ? EMPTY_IDS
      : (state.stockList.stocks.byId[stockId]?.purchasedItems?.allIds ??
        EMPTY_IDS);

export const selectNextIds = createSelector(
  [selectNextStockId, selectNextPurchasedId],
  (nextStockId, nextPurchasedId) => ({
    nextStockId,
    nextPurchasedId,
  }),
);
