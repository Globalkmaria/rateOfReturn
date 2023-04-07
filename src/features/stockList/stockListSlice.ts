import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toDateInputValue } from '../../views/List/StockItem/utils';

type UpdateStockPayload<T extends keyof StockMainInfo> = {
  stockIdx: number;
  fieldName: T;
  value: StockMainInfo[T];
};
type UpdatePurchasedItemPayload<T extends keyof PurchasedItemInfo> = {
  stockIdx: number;
  purchasedIdx: number;
  fieldName: T;
  value: PurchasedItemInfo[T];
};

export type StockMainInfo = {
  stockName: string;
  currentPrice: number;
  stockId: number;
};

export interface PurchasedItemInfo {
  purchasedId: number;
  purchasedDate: string;
  purchasedQuantity: number;
  purchasedPrice: number;
}

export interface StockList {
  mainInfo: StockMainInfo;
  purchasedItems: PurchasedItemInfo[];
}

export type StockListState = {
  stocks: StockList[];
};

const initialState: StockListState = { stocks: [] };

let nextStockId = 0;
let nextPurchasedId = 0;

export const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    addNewStock: (state) => {
      state.stocks.push({
        mainInfo: {
          stockName: '',
          currentPrice: 0,
          stockId: nextStockId++,
        },
        purchasedItems: [
          {
            purchasedId: nextPurchasedId++,
            purchasedDate: toDateInputValue().toISOString(),
            purchasedQuantity: 0,
            purchasedPrice: 0,
          },
        ],
      });
    },
    addPurchasedItem: (state, action: PayloadAction<number>) => {
      const stockId = action.payload;
      const stockIdx = state.stocks.findIndex(
        (stock) => stock.mainInfo.stockId === stockId,
      );
      state.stocks[stockIdx].purchasedItems.push({
        purchasedId: nextPurchasedId++,
        purchasedDate: toDateInputValue().toISOString(),
        purchasedQuantity: 0,
        purchasedPrice: 0,
      });
    },
    updateStock: <T extends keyof Omit<StockMainInfo, 'stockId'>>(
      state: StockListState,
      action: PayloadAction<UpdateStockPayload<T>>,
    ) => {
      const { stockIdx, fieldName, value } = action.payload;
      state.stocks[stockIdx].mainInfo[fieldName] = value;
    },
    updatePurchaseItem: <
      T extends keyof Omit<PurchasedItemInfo, 'purchasedId'>,
    >(
      state: StockListState,
      action: PayloadAction<UpdatePurchasedItemPayload<T>>,
    ) => {
      const { stockIdx, purchasedIdx, fieldName, value } = action.payload;
      state.stocks[stockIdx].purchasedItems[purchasedIdx][fieldName] = value;
    },

    deleteStock: (state, action: PayloadAction<number>) => {
      state.stocks.splice(action.payload, 1);
    },
    deletePurchasedItem: (
      state,
      action: PayloadAction<{ stockIdx: number; purchasedIdx: number }>,
    ) => {
      const { stockIdx, purchasedIdx } = action.payload;
      if (state.stocks[stockIdx].purchasedItems.length === 1) {
        state.stocks.splice(stockIdx, 1);
        return;
      }
      state.stocks[stockIdx].purchasedItems.splice(purchasedIdx, 1);
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

// const MOCK_DATA: StockList[] = [
//   {
//     mainInfo: {
//       stockName: 'Google',
//       currentPrice: 1000,
//       stockId: 1,
//     },
//     purchasedItems: [
//       {
//         purchasedId: 1,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//       {
//         purchasedId: 2,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//     ],
//   },
//   {
//     mainInfo: {
//       stockName: 'Apple',
//       currentPrice: 2000,
//       stockId: 2,
//     },
//     purchasedItems: [
//       {
//         purchasedId: 3,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//       {
//         purchasedId: 4,
//         purchasedDate: '2023-04-04T09:57',
//         purchasedQuantity: 10,
//         purchasedPrice: 1000,
//       },
//     ],
//   },
// ];

// when mock data is used
// let nextStockId = 3;
// let nextPurchasedId = 5;

// const initialState: StockListState = { stocks: MOCK_DATA };
