import { Collections } from '../../typeUtils/typeGenerators';

export type StockMainPayload = {
  stockId: string;
  purchasedId: string;
};

export type AddNewStockPayload = {
  stockId: string;
  stockInfo: StockList;
};

export type AddNewPurchasedItemPayload = {
  purchasedItem: PurchasedItemInfo;
} & StockMainPayload;

export type UpdateStockPayload<T extends keyof StockMainInfo> = {
  stockId: string;
  fieldName: T;
  value: StockMainInfo[T];
};

export type UpdatePurchasedItemPayload = {
  purchasedData: PurchasedItemInfo;
} & StockMainPayload;

export type DeletePurchasedItemPayload = StockMainPayload;

export interface StockMainInfo {
  stockName: string;
  currentPrice: number;
  stockId: string;
  needInit?: boolean;
}

export interface PurchasedItemInfo {
  purchasedId: string;
  purchasedDate: string;
  purchasedTime: string;
  purchasedQuantity: number;
  purchasedPrice: number;
  needInit?: boolean;
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
