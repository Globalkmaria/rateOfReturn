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

export interface StockList {
  mainInfo: StockMainInfo;
  purchasedItems: {
    byId: { [purchasedId: string]: PurchasedItemInfo };
    allIds: string[];
  };
}

export interface StockListState {
  stocks: { byId: { [key: string]: StockList }; allIds: string[] };
  nextStockId: number;
  nextPurchasedId: number;
}
