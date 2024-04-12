import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MOCK_DATA, MOCK_DATA_NEXT_STOCK_ID, MOCK_DATA_PURCHASED_ID } from './mockData';
import {
  StockListState,
  UpdateStockPayload,
  UpdatePurchasedItemPayload,
  AddNewPurchasedItemPayload,
  StockMainPayload,
} from './type';
import {
  addNewStock,
  addPurchasedItem,
  deletePurchasedItem,
  deleteStock,
  initUserData,
  resetUserData,
} from '../actions';
import { initStock } from './utils';

export const stockInitialState: StockListState = {
  stocks: {
    byId: {},
    allIds: [],
  },
  nextStockId: 1,
  nextPurchasedId: 1,
};

export const sampleAsInitialState = {
  stocks: MOCK_DATA,
  nextStockId: MOCK_DATA_NEXT_STOCK_ID,
  nextPurchasedId: MOCK_DATA_PURCHASED_ID,
};

const stockListSlice = createSlice({
  name: 'stockList',
  initialState: sampleAsInitialState,
  reducers: {
    addSampleStockList: state => {
      state.stocks = MOCK_DATA;
      state.nextStockId = MOCK_DATA_NEXT_STOCK_ID;
      state.nextPurchasedId = MOCK_DATA_PURCHASED_ID;
    },

    setBackupStockList: (state, action: PayloadAction<StockListState>) => {
      state.stocks = action.payload.stocks;
      state.nextStockId = action.payload.nextStockId;
      state.nextPurchasedId = action.payload.nextPurchasedId;
    },
    initStockList: (state, action: PayloadAction<StockListState>) => {
      initStock(state, action.payload);
    },

    updateStock: (state: StockListState, action: PayloadAction<UpdateStockPayload>) => {
      const { stockId, stockData } = action.payload;
      state.stocks.byId[stockId].mainInfo = stockData;
    },
    updatePurchaseItem: (state: StockListState, action: PayloadAction<UpdatePurchasedItemPayload>) => {
      const { stockId, purchasedId, purchasedData } = action.payload;
      state.stocks.byId[stockId].purchasedItems.byId[purchasedId] = purchasedData;
    },

    updateStockNeedInit: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      if (!state.stocks.byId[stockId]) return;
      state.stocks.byId[stockId].mainInfo.needInit = false;
    },

    updatePurchaseItemNeedInit: (state, action: PayloadAction<StockMainPayload>) => {
      const { stockId, purchasedId } = action.payload;
      const purchasedItem = state.stocks.byId[stockId]?.purchasedItems?.byId[purchasedId];
      if (purchasedItem) state.stocks.byId[stockId].purchasedItems.byId[purchasedId].needInit = false;
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
    builder.addCase(initUserData, (state, action) => {
      initStock(state, action.payload.stocks);
    });
    builder.addCase(resetUserData, () => stockInitialState);
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
  },
});

export const {
  addSampleStockList,
  setBackupStockList,
  updateStock,
  updatePurchaseItem,
  initStockList,
  updateStockNeedInit,
  updatePurchaseItemNeedInit,
} = stockListSlice.actions;

export default stockListSlice.reducer;
