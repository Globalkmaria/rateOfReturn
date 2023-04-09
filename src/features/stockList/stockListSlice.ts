import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toDateInputValue } from '../../views/List/StockItem/utils';

type UpdateStockPayload<T extends keyof StockMainInfo> = {
  stockId: number;
  fieldName: T;
  value: StockMainInfo[T];
};
type UpdatePurchasedItemPayload<T extends keyof PurchasedItemInfo> = {
  stockId: number;
  purchasedId: number;
  fieldName: T;
  value: PurchasedItemInfo[T];
};

type DeletePurchasedItemPayload = { stockId: number; purchasedId: number };

export interface StockMainInfo {
  stockName: string;
  currentPrice: number;
  stockId: number;
}

export interface PurchasedItemInfo {
  purchasedId: number;
  purchasedDate: string;
  purchasedQuantity: number;
  purchasedPrice: number;
}

export interface StockList {
  mainInfo: StockMainInfo;
  purchasedItems: { [key: number]: PurchasedItemInfo };
}

export interface StockListState {
  stocks: { [key: number]: StockList };
}

const initialState: StockListState = { stocks: [] };

let nextStockId = 0;
let nextPurchasedId = 0;

export const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    addNewStock: (state) => {
      state.stocks[nextStockId] = {
        mainInfo: {
          stockName: '',
          currentPrice: 0,
          stockId: nextStockId++,
        },
        purchasedItems: {
          [nextPurchasedId]: {
            purchasedId: nextPurchasedId++,
            purchasedDate: toDateInputValue().toISOString(),
            purchasedQuantity: 0,
            purchasedPrice: 0,
          },
        },
      };
    },
    addPurchasedItem: (state, action: PayloadAction<number>) => {
      const stockId = action.payload;
      state.stocks[stockId].purchasedItems[nextPurchasedId] = {
        purchasedId: nextPurchasedId++,
        purchasedDate: toDateInputValue().toISOString(),
        purchasedQuantity: 0,
        purchasedPrice: 0,
      };
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

    deleteStock: (state, action: PayloadAction<number>) => {
      const stockId = action.payload;
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
      delete state.stocks[stockId].purchasedItems[purchasedId];
    },
  },
});

export const {
  addNewStock,
  addPurchasedItem,
  updateStock,
  updatePurchaseItem,
  deleteStock,
  deletePurchasedItem,
} = stockListSlice.actions;

export default stockListSlice.reducer;

// const MOCK_DATA: { [key: number]: StockList } = {
//   1: {
//     mainInfo: {
//       stockName: 'Google',
//       currentPrice: 1000,
//       stockId: 1,
//     },
//     purchasedItems: {
//       1: {
//         purchasedId: 1,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//       2: {
//         purchasedId: 2,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//     },
//   },
//   2: {
//     mainInfo: {
//       stockName: 'Apple',
//       currentPrice: 2000,
//       stockId: 2,
//     },
//     purchasedItems: {
//       3: {
//         purchasedId: 3,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//       4: {
//         purchasedId: 4,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//     },
//   },
// };

// // when mock data is used
// let nextStockId = 3;
// let nextPurchasedId = 5;

// const initialState: StockListState = { stocks: MOCK_DATA };
