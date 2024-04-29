import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  MOCK_DATA,
  MOCK_DATA_NEXT_STOCK_ID,
  MOCK_DATA_PURCHASED_ID,
} from './mockData';
import {
  StockListState,
  UpdateStockPayload,
  UpdatePurchasedItemPayload,
  StockMainPayload,
} from './type';
import {
  addNewStock,
  addPurchasedItem,
  addSampleData,
  deletePurchasedItem,
  deleteStock,
  initUserData,
  resetUserData,
  setBackupData,
} from '@/features';
import { addNewSold } from '../sold';

export const STOCK_INITIAL_STATE: StockListState = {
  stocks: {
    byId: {},
    allIds: [],
  },
  nextStockId: 1,
  nextPurchasedId: 1,
};

export const INITIAL_STATE_WITH_SAMPLE = {
  stocks: MOCK_DATA,
  nextStockId: MOCK_DATA_NEXT_STOCK_ID,
  nextPurchasedId: MOCK_DATA_PURCHASED_ID,
};

const stockListSlice = createSlice({
  name: 'stockList',
  initialState: INITIAL_STATE_WITH_SAMPLE,
  reducers: {
    initStockList: (state, action: PayloadAction<StockListState>) =>
      action.payload,
    updateStock: (
      state: StockListState,
      action: PayloadAction<UpdateStockPayload>,
    ) => {
      const { stockId, stockData } = action.payload;
      state.stocks.byId[stockId].mainInfo = stockData;
    },
    updatePurchaseItem: (
      state: StockListState,
      action: PayloadAction<UpdatePurchasedItemPayload>,
    ) => {
      const { stockId, purchasedId, purchasedData } = action.payload;
      state.stocks.byId[stockId].purchasedItems.byId[purchasedId] =
        purchasedData;
    },

    updateStockNeedInit: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      if (!state.stocks.byId[stockId]) return;
      state.stocks.byId[stockId].mainInfo.needInit = false;
    },

    updatePurchaseItemNeedInit: (
      state,
      action: PayloadAction<StockMainPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      const purchasedItem =
        state.stocks.byId[stockId]?.purchasedItems?.byId[purchasedId];
      if (purchasedItem)
        state.stocks.byId[stockId].purchasedItems.byId[purchasedId].needInit =
          false;
    },
  },
  extraReducers(builder) {
    builder.addCase(deletePurchasedItem, (state, { payload }) => {
      const { stockId, purchasedId } = payload;
      const purchasedItems = state.stocks.byId[stockId].purchasedItems;

      const stockIdx = state.stocks.allIds.indexOf(stockId);
      if (purchasedItems.allIds.length === 1) {
        delete state.stocks.byId[stockId];
        state.stocks.allIds.splice(stockIdx, 1);
        return;
      }

      const purchasedItemIdx = purchasedItems.allIds.indexOf(purchasedId);
      delete purchasedItems.byId[purchasedId];
      purchasedItems.allIds.splice(purchasedItemIdx, 1);
    });
    builder.addCase(deleteStock, (state, { payload }) => {
      const stockId = payload;
      delete state.stocks.byId[stockId];
      state.stocks.allIds.splice(state.stocks.allIds.indexOf(stockId), 1);
    });
    builder.addCase(initUserData, (state, action) => action.payload.stocks);
    builder.addCase(resetUserData, () => STOCK_INITIAL_STATE);
    builder.addCase(addNewStock, (state, action) => {
      const { stockId, stockInfo } = action.payload;
      state.stocks.byId[stockId] = stockInfo;
      state.stocks.allIds.push(stockId);
      state.nextStockId = Number(state.nextStockId) + 1;
      state.nextPurchasedId = Number(state.nextPurchasedId) + 1;
    });
    builder.addCase(addPurchasedItem, (state, action) => {
      const { stockId, purchasedId, purchasedItem } = action.payload;
      const purchasedItems = state.stocks.byId[stockId].purchasedItems;
      purchasedItems.byId[purchasedId] = purchasedItem;
      purchasedItems.allIds.push(purchasedId);

      state.nextPurchasedId = Number(state.nextPurchasedId) + 1;
    });
    builder.addCase(setBackupData, (state, action) => action.payload.stockList);
    builder.addCase(addSampleData, () => INITIAL_STATE_WITH_SAMPLE);
    builder.addCase(addNewSold, (state, action) => {
      const { soldInfo, stockId } = action.payload;
      const purchasedItems = state.stocks.byId[stockId].purchasedItems;

      if (purchasedItems.allIds.length === 1) {
        const stockIdx = state.stocks.allIds.indexOf(stockId);
        delete state.stocks.byId[stockId];
        state.stocks.allIds.splice(stockIdx, 1);
        return;
      }

      const purchasedItemIdx = purchasedItems.allIds.indexOf(
        soldInfo.purchasedId,
      );
      delete purchasedItems.byId[soldInfo.purchasedId];
      purchasedItems.allIds.splice(purchasedItemIdx, 1);
    });
  },
});

export const {
  updateStock,
  updatePurchaseItem,
  initStockList,
  updateStockNeedInit,
  updatePurchaseItemNeedInit,
} = stockListSlice.actions;

export default stockListSlice.reducer;
