import {
  TemporalPurchaseItems,
  TemporalStockList,
  TemporalStockListState,
} from './type';

export function getOrCreateStockEntry(
  state: TemporalStockListState,
  stockId: string,
) {
  if (!state.stockList[stockId]) {
    state.stockList[stockId] = {};
  }
  return state.stockList[stockId];
}

export function getOrCreateMainInfo(stockEntry: TemporalStockList) {
  if (!stockEntry.mainInfo) {
    stockEntry.mainInfo = {};
  }
  return stockEntry.mainInfo;
}

export function getOrCreatePurchasedItems(stockEntry: TemporalStockList) {
  if (!stockEntry.purchasedItems) {
    stockEntry.purchasedItems = {};
  }
  return stockEntry.purchasedItems;
}

export function getOrCreatePurchasedItem(
  purchasedItems: TemporalPurchaseItems,
  purchasedId: string,
) {
  if (!purchasedItems[purchasedId]) {
    purchasedItems[purchasedId] = {};
  }
  return purchasedItems[purchasedId];
}
