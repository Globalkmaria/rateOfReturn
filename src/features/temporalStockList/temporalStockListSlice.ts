import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      if (!state.stockList[stockId]) state.stockList[stockId] = {};
      if (!state.stockList[stockId].mainInfo)
        state.stockList[stockId].mainInfo = {};

      state.stockList[stockId].mainInfo[name] = value;
    },

    updateTemporalPurchaseItem: (
      state: TemporalStockListState,
      action: PayloadAction<UpdateTemporalPurchasedPayload>,
    ) => {
      const { stockId, purchasedId, name, value } = action.payload;
      if (!state.stockList[stockId]) state.stockList[stockId] = {};
      if (!state.stockList[stockId].purchasedItems)
        state.stockList[stockId].purchasedItems = {};
      if (!state.stockList[stockId].purchasedItems[purchasedId])
        state.stockList[stockId].purchasedItems[purchasedId] = {};

      state.stockList[stockId].purchasedItems[purchasedId][name] = value;
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
