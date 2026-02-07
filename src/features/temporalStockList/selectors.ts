import { RootState } from '../../store';

export const selectTemporalStockList = (state: RootState) =>
  state.temporalStockList;

export const selectTemporalStockInfoById =
  (stockId: string) => (state: RootState) =>
    state.temporalStockList.stockList[stockId];

export const selectTemporalStockMainInfoById =
  (stockId: string) => (state: RootState) =>
    state.temporalStockList.stockList[stockId]?.mainInfo;

export const selectTemporalPurchasedItemsById =
  (stockId: string, purchasedId: string) => (state: RootState) =>
    state.temporalStockList.stockList[stockId]?.purchasedItems?.[purchasedId];

export const selectIsStockListEditMode = (state: RootState) =>
  state.temporalStockList.isEditMode;
