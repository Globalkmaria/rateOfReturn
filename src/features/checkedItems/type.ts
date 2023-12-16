export type StockCheckInfo = {
  allChecked: boolean;
  purchasedItems: { [purchasedId: string]: boolean };
};

export type CheckedItemsInfo = {
  allChecked: boolean;
  stocksCheckInfo: {
    [stockId: string]: StockCheckInfo;
  };
};
export type UpdateCheckedItemsInfoPayload =
  | {
      type: 'all';
      checked: boolean;
    }
  | { type: 'stock'; stockId: string; checked: boolean }
  | {
      type: 'purchased';
      stockId: string;
      purchasedId: string;
      checked: boolean;
    };

export type AddStockCheckInfoPayload = {
  stockId: string;
  stockCheckInfo: StockCheckInfo;
};
export type CheckInfoPayload = {
  stockId: string;
  purchasedId: string;
};

export type CheckedItemsState = CheckedItemsInfo;

export type getCheckedItemsInfoProps<T> = {
  value: boolean;
  data: T;
  getStockIds: (data: T) => string[];
  getPurchasedIds: (data: T, stockId: string) => string[];
};
