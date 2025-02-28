import { PurchasedItemInfo, StockMainInfo } from '../stockList/type';

export type TemporalPurchaseItems = {
  [purchasedId: string]: Partial<PurchasedItemInfo>;
};

export interface TemporalStockList {
  mainInfo?: Partial<StockMainInfo>;
  purchasedItems?: TemporalPurchaseItems;
}

export type TemporalStockListState = {
  isEditMode: boolean;
  stockList: {
    [stockId: string]: TemporalStockList;
  };
};

export type UpdateTemporalStockPayload = {
  stockId: string;
  name: keyof StockMainInfo;
  value: string;
};

export type UpdateTemporalPurchasedPayload = {
  name: keyof PurchasedItemInfo;
  value: string;
  stockId: string;
  purchasedId: string;
};
