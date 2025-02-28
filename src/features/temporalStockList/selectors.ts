import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export const selectTemporalStockList = (state: RootState) =>
  state.temporalStockList;
const selectTemporalStocks = (state: RootState) =>
  state.temporalStockList.stockList;

export const selectTemporalStockInfoById = (stockId: string) =>
  createSelector([selectTemporalStocks], stocks => stocks[stockId]);
export const selectTemporalStockMainInfoById = (stockId: string) =>
  createSelector(
    [selectTemporalStockInfoById(stockId)],
    stocks => stocks?.mainInfo,
  );
export const selectTemporalPurchasedItemsById = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector(
    [selectTemporalStockInfoById(stockId)],
    stocks => stocks?.purchasedItems?.[purchasedId],
  );

export const selectIsStockListEditMode = (state: RootState) =>
  state.temporalStockList.isEditMode;
