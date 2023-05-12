import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCurrentDateAndTime } from '../../views/List/StockItem/utils';
import {
  MOCK_DATA,
  MOCK_DATA_NEXT_STOCK_ID,
  MOCK_DATA_PURCHASED_ID,
} from './mockData';
import { RootState } from '../../store';

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

const initialState: StockListState = {
  stocks: MOCK_DATA,
  nextStockId: MOCK_DATA_NEXT_STOCK_ID,
  nextPurchasedId: MOCK_DATA_PURCHASED_ID,
};

export const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    initStockList: (state, action: PayloadAction<StockListState>) => {
      state.stocks = action.payload.stocks;
      state.nextStockId = action.payload.nextStockId;
      state.nextPurchasedId = action.payload.nextPurchasedId;
      return state;
    },
    addNewStock: (state) => {
      const newStockId = (state.nextStockId++).toString();
      const newPurchaseId = (state.nextPurchasedId++).toString();
      const { date, time } = getCurrentDateAndTime();

      state.stocks.byId[newStockId] = {
        mainInfo: {
          stockName: '',
          currentPrice: 0,
          stockId: newStockId,
        },
        purchasedItems: {
          byId: {
            [newPurchaseId]: {
              purchasedId: newPurchaseId,
              purchasedDate: date,
              purchasedQuantity: 0,
              purchasedPrice: 0,
              purchasedTime: time,
            },
          },
          allIds: [newPurchaseId],
        },
      };
      state.stocks.allIds.push(newStockId);
    },
    addPurchasedItem: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      const newPurchaseId = (state.nextPurchasedId++).toString();
      const { date, time } = getCurrentDateAndTime();

      state.stocks.byId[stockId].purchasedItems.byId[newPurchaseId] = {
        purchasedId: newPurchaseId,
        purchasedDate: date,
        purchasedTime: time,
        purchasedQuantity: 0,
        purchasedPrice: 0,
      };
      state.stocks.byId[stockId].purchasedItems.allIds.push(newPurchaseId);
    },
    updateStock: <T extends keyof Omit<StockMainInfo, 'stockId'>>(
      state: StockListState,
      action: PayloadAction<UpdateStockPayload<T>>,
    ) => {
      const { stockId, fieldName, value } = action.payload;
      state.stocks.byId[stockId].mainInfo[fieldName] = value;
    },
    updatePurchaseItem: <
      T extends keyof Omit<PurchasedItemInfo, 'purchasedId'>,
    >(
      state: StockListState,
      action: PayloadAction<UpdatePurchasedItemPayload<T>>,
    ) => {
      const { stockId, purchasedId, fieldName, value } = action.payload;
      state.stocks.byId[stockId].purchasedItems.byId[purchasedId][fieldName] =
        value;
    },

    deleteStock: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      delete state.stocks.byId[stockId];
      state.stocks.allIds.splice(state.stocks.allIds.indexOf(stockId), 1);
    },
    deletePurchasedItem: (
      { stocks },
      action: PayloadAction<DeletePurchasedItemPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      const purchasedItems = stocks.byId[stockId].purchasedItems;
      if (purchasedItems.allIds.length === 1) {
        delete stocks.byId[stockId];
        stocks.allIds.splice(stocks.allIds.indexOf(stockId), 1);

        return;
      }

      delete purchasedItems.byId[purchasedId];
      purchasedItems.allIds.splice(
        purchasedItems.allIds.indexOf(purchasedId),
        1,
      );
    },
  },
});

export const selectStockList = (state: RootState) => state.stockList;
export const selectStocks = (state: RootState) => state.stockList.stocks;
export const selectStockInfoById = (stockId: string) =>
  createSelector([selectStocks], (stocks) => stocks.byId[stockId]);
export const selectPurchasedItemsById = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector([selectStockInfoById(stockId)], (stocks) => ({
    mainInfo: stocks.mainInfo,
    purchasedItem: stocks.purchasedItems.byId[purchasedId],
  }));

export const {
  addNewStock,
  addPurchasedItem,
  updateStock,
  updatePurchaseItem,
  deleteStock,
  deletePurchasedItem,
  initStockList,
} = stockListSlice.actions;

export default stockListSlice.reducer;
