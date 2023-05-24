export type CheckedItemsInfo = {
  allChecked: boolean;
  stocksCheckInfo: {
    [stockId: string]: {
      allChecked: boolean;
      purchasedItems: { [purchasedId: string]: boolean };
    };
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
export type CheckInfoPayload = {
  stockId: string;
  purchasedId: string;
};

export type CheckedItemsState = CheckedItemsInfo;
