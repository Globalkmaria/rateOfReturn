import { Collections } from '../../typeUtils/typeGenerators';

export type AddNewStockPayload = {
  stockId: string;
  stockInfo: StockList;
};

export type AddNewPurchasedItemPayload = {
  stockId: string;
  purchasedId: string;
  purchasedItem: PurchasedItemInfo;
};

export type UpdateStockPayload<T extends keyof StockMainInfo> = {
  stockId: string;
  fieldName: T;
  value: StockMainInfo[T];
};
export type UpdatePurchasedItemPayload<T extends keyof PurchasedItemInfo> = {
  stockId: string;
  purchasedId: string;
  fieldName: T;
  value: PurchasedItemInfo[T];
};

export type DeletePurchasedItemPayload = {
  stockId: string;
  purchasedId: string;
};

export interface StockMainInfo {
  stockName: string;
  currentPrice: number;
  stockId: string;
}

export interface PurchasedItemInfo {
  purchasedId: string;
  purchasedDate: string;
  purchasedTime: string;
  purchasedQuantity: number;
  purchasedPrice: number;
}

export type PurchaseItemCollection = Collections<PurchasedItemInfo>;

export interface StockList {
  mainInfo: StockMainInfo;
  purchasedItems: PurchaseItemCollection;
}

export type StocksCollection = Collections<StockList>;

export interface StockListState {
  stocks: StocksCollection;
  nextStockId: number;
  nextPurchasedId: number;
}
