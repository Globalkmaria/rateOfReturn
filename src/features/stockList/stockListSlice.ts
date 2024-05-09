import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { STOCK_STATE_SAMPLE } from './mockData';
import {
  StockListState,
  UpdateStockPayload,
  UpdatePurchasedItemPayload,
  StockMainPayload,
} from './type';
import {
  addNewStock,
  addPurchasedItem,
  addStockSampleData,
  deletePurchasedItem,
  deleteStock,
  initUserData,
  resetUserData,
  setBackupData,
} from '@/features';
import { addNewSold } from '../solds';

export const STOCK_INITIAL_STATE: StockListState = {
  stocks: {
    byId: {},
    allIds: [],
  },
  nextStockId: 1,
  nextPurchasedId: 1,
  tags: [],
};

const stockListSlice = createSlice({
  name: 'stockList',
  initialState: STOCK_STATE_SAMPLE,
  reducers: {
    initStockList: (state, action: PayloadAction<StockListState>) => ({
      ...state,
      ...action.payload,
    }),
    updateStock: (
      state: StockListState,
      action: PayloadAction<UpdateStockPayload>,
    ) => {
      const { stockId, stockData } = action.payload;
      state.stocks.byId[stockId].mainInfo = stockData;
    },
    deleteStockTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      const idx = state.tags.indexOf(tag);
      if (idx === -1) return;
      state.tags.splice(idx, 1);

      state.stocks.allIds.forEach(stockId => {
        if (state.stocks.byId[stockId].mainInfo.tag === tag) {
          state.stocks.byId[stockId].mainInfo.tag = '';
        }
      });
    },
    addStockTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      if (state.tags.indexOf(tag) !== -1) return;
      state.tags.push(tag);
    },
    updateStocksCurrentPrice: (
      state: StockListState,
      action: PayloadAction<{
        [key: string]: number;
      }>,
    ) => {
      const changedPrices = action.payload;

      Object.keys(changedPrices).forEach(stockId => {
        state.stocks.byId[stockId].mainInfo.currentPrice =
          changedPrices[stockId];
      });
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
    builder.addCase(initUserData, (state, action) => ({
      ...STOCK_INITIAL_STATE,
      ...action.payload.stocks,
    }));
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
    builder.addCase(setBackupData, (state, action) => ({
      ...STOCK_INITIAL_STATE,
      ...action.payload.stockList,
    }));
    builder.addCase(addStockSampleData, () => STOCK_STATE_SAMPLE);
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
  updateStocksCurrentPrice,
  deleteStockTag,
  addStockTag,
} = stockListSlice.actions;

export default stockListSlice.reducer;
