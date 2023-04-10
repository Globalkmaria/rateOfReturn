import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toDateInputValue } from '../../views/List/StockItem/utils';
import { getInitialCheckedItemsInfo } from './utils';
import {
  MOCK_DATA,
  MOCK_DATA_NEXT_STOCK_ID,
  MOCK_DATA_PURCHASED_ID,
} from './mockData';

type UpdateCheckedItemsInfoPayload =
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

type UpdateStockPayload<T extends keyof StockMainInfo> = {
  stockId: string;
  fieldName: T;
  value: StockMainInfo[T];
};
type UpdatePurchasedItemPayload<T extends keyof PurchasedItemInfo> = {
  stockId: string;
  purchasedId: string;
  fieldName: T;
  value: PurchasedItemInfo[T];
};

type DeletePurchasedItemPayload = { stockId: string; purchasedId: string };

export interface StockMainInfo {
  stockName: string;
  currentPrice: number;
  stockId: string;
}

export interface PurchasedItemInfo {
  purchasedId: string;
  purchasedDate: string;
  purchasedQuantity: number;
  purchasedPrice: number;
}

export interface StockList {
  mainInfo: StockMainInfo;
  purchasedItems: { [key: string]: PurchasedItemInfo };
}

export type CheckedItemsInfo = {
  allChecked: boolean;
  selectedItems: {
    [stockId: string]: { allChecked: boolean; items: string[] };
  };
};

export interface StockListState {
  stocks: { [key: string]: StockList };
  checkedItemsInfo: CheckedItemsInfo;
}

let nextStockId = MOCK_DATA_NEXT_STOCK_ID;
let nextPurchasedId = MOCK_DATA_PURCHASED_ID;

const initialState: StockListState = {
  stocks: MOCK_DATA,
  checkedItemsInfo: getInitialCheckedItemsInfo({
    data: MOCK_DATA,
    value: true,
  }),
};

export const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    updateCheckedItemsInfo: (
      state,
      action: PayloadAction<UpdateCheckedItemsInfoPayload>,
    ) => {
      const { checked } = action.payload;
      switch (action.payload.type) {
        case 'all':
          state.checkedItemsInfo = getInitialCheckedItemsInfo({
            data: state.stocks,
            value: checked,
          });
          break;
        case 'stock':
          const stock =
            state.checkedItemsInfo.selectedItems[action.payload.stockId];
          state.checkedItemsInfo.allChecked = false;
          state.checkedItemsInfo.selectedItems[
            action.payload.stockId
          ].allChecked = checked;
          if (checked) {
            stock.items = [
              ...Object.keys(
                state.stocks[action.payload.stockId].purchasedItems,
              ),
            ];
          } else {
            stock.items = [];
          }
          break;
        case 'purchased':
          const selectedStock =
            state.checkedItemsInfo.selectedItems[action.payload.stockId];

          state.checkedItemsInfo.allChecked = false;
          state.checkedItemsInfo.selectedItems[
            action.payload.stockId
          ].allChecked = false;

          checked
            ? selectedStock.items.push(action.payload.purchasedId)
            : selectedStock.items.splice(
                selectedStock.items.indexOf(action.payload.purchasedId),
                1,
              );
          break;
        default:
          break;
      }
    },
    addNewStock: (state) => {
      state.checkedItemsInfo.selectedItems[nextStockId] = {
        allChecked: true,
        items: [],
      };
      state.stocks[nextStockId] = {
        mainInfo: {
          stockName: '',
          currentPrice: 0,
          stockId: (nextStockId++).toString(),
        },
        purchasedItems: {
          [nextPurchasedId]: {
            purchasedId: (nextPurchasedId++).toString(),
            purchasedDate: toDateInputValue().toISOString(),
            purchasedQuantity: 0,
            purchasedPrice: 0,
          },
        },
      };
    },
    addPurchasedItem: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      state.checkedItemsInfo.selectedItems[stockId].items.push(
        nextPurchasedId.toString(),
      );
      state.stocks[stockId].purchasedItems[nextPurchasedId] = {
        purchasedId: nextPurchasedId.toString(),
        purchasedDate: toDateInputValue().toISOString(),
        purchasedQuantity: 0,
        purchasedPrice: 0,
      };
      nextPurchasedId++;
    },
    updateStock: <T extends keyof Omit<StockMainInfo, 'stockId'>>(
      state: StockListState,
      action: PayloadAction<UpdateStockPayload<T>>,
    ) => {
      const { stockId, fieldName, value } = action.payload;
      state.stocks[stockId].mainInfo[fieldName] = value;
    },
    updatePurchaseItem: <
      T extends keyof Omit<PurchasedItemInfo, 'purchasedId'>,
    >(
      state: StockListState,
      action: PayloadAction<UpdatePurchasedItemPayload<T>>,
    ) => {
      const { stockId, purchasedId, fieldName, value } = action.payload;
      state.stocks[stockId].purchasedItems[purchasedId][fieldName] = value;
    },

    deleteStock: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      delete state.checkedItemsInfo.selectedItems[stockId];
      delete state.stocks[stockId];
    },
    deletePurchasedItem: (
      state,
      action: PayloadAction<DeletePurchasedItemPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      if (Object(state.stocks[stockId].purchasedItems).keys().length === 1) {
        delete state.stocks[stockId];
        return;
      }
      const selectedItem = state.checkedItemsInfo.selectedItems[stockId];
      selectedItem.items.splice(selectedItem.items.indexOf(purchasedId), 1);
      delete state.stocks[stockId].purchasedItems[purchasedId];
    },
  },
});

export const {
  updateCheckedItemsInfo,
  addNewStock,
  addPurchasedItem,
  updateStock,
  updatePurchaseItem,
  deleteStock,
  deletePurchasedItem,
} = stockListSlice.actions;

export default stockListSlice.reducer;
