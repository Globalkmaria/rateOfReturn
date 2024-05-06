import { Collections } from '../../typeUtils/typeGenerators';

export type StockMainPayload = {
  stockId: string;
  purchasedId: string;
};

export type UpdateStockPayload = {
  stockId: string;
  stockData: StockMainInfo;
};

export type UpdatePurchasedItemPayload = {
  purchasedData: PurchasedItemInfo;
} & StockMainPayload;

export interface StockMainInfo {
  stockName: string;
  currentPrice: number;
  stockId: string;
  needInit?: boolean;
  tag?: string;
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
  tags: string[];
}
