import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getOrCreateMainInfo,
  getOrCreatePurchasedItem,
  getOrCreatePurchasedItems,
  getOrCreateStockEntry,
} from './helper';
import {
  TemporalStockListState,
  UpdateTemporalPurchasedPayload,
  UpdateTemporalStockPayload,
} from './type';

export const TEMPORAL_STOCK_INITIAL_STATE: TemporalStockListState = {
  stockList: {},
  isEditMode: false,
};

const temporalStockListSlice = createSlice({
  name: 'temporalStockList',
  initialState: { ...TEMPORAL_STOCK_INITIAL_STATE },
  reducers: {
    updateTemporalStockListEditMode: (
      state: TemporalStockListState,
      action: PayloadAction<boolean>,
    ) => {
      state.isEditMode = action.payload;
    },
    updateTemporalStock: (
      state: TemporalStockListState,
      action: PayloadAction<UpdateTemporalStockPayload>,
    ) => {
      const { stockId, name, value } = action.payload;
      const stockEntry = getOrCreateStockEntry(state, stockId);
      const mainInfo = getOrCreateMainInfo(stockEntry);
      mainInfo[name] = value;
    },

    updateTemporalPurchaseItem: (
      state: TemporalStockListState,
      action: PayloadAction<UpdateTemporalPurchasedPayload>,
    ) => {
      const { stockId, purchasedId, name, value } = action.payload;
      const stockEntry = getOrCreateStockEntry(state, stockId);
      const purchasedItems = getOrCreatePurchasedItems(stockEntry);
      const purchasedItem = getOrCreatePurchasedItem(
        purchasedItems,
        purchasedId,
      );
      purchasedItem[name] = value;
    },

    resetTemporalStockList: (state: TemporalStockListState) => {
      state.stockList = { ...TEMPORAL_STOCK_INITIAL_STATE['stockList'] };
    },
  },
});

export const {
  updateTemporalStock,
  updateTemporalPurchaseItem,
  updateTemporalStockListEditMode,
  resetTemporalStockList,
} = temporalStockListSlice.actions;

export const temporalStockReducer = temporalStockListSlice.reducer;
