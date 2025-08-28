import { Collections } from '../../typeUtils/typeGenerators';

export type StockMainPayload = {
  stockId: string;
  purchasedId: string;
};

export interface StockMainInfo {
  stockId: string;
  symbol: string;
  stockName: string;
  currentPrice: string;
  tag?: string;
}

export type PurchasedItemInfo = {
  purchasedId: string;

  purchasedDate: string;
  purchasedTime: string;
  purchasedQuantity: string;
  purchasedPrice: string;
};

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
