import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  MOCK_DATA,
  MOCK_DATA_NEXT_STOCK_ID,
  MOCK_DATA_PURCHASED_ID,
} from './mockData';
import {
  StockListState,
  StockMainInfo,
  UpdateStockPayload,
  PurchasedItemInfo,
  UpdatePurchasedItemPayload,
  DeletePurchasedItemPayload,
  AddNewStockPayload,
  AddNewPurchasedItemPayload,
} from './type';

const initialState: StockListState = {
  stocks: MOCK_DATA,
  nextStockId: MOCK_DATA_NEXT_STOCK_ID,
  nextPurchasedId: MOCK_DATA_PURCHASED_ID,
};

const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    updateNextStockId: (state) => {
      state.nextStockId = Number(state.nextStockId) + 1;
    },
    updateNextPurchasedId: (state) => {
      state.nextPurchasedId = Number(state.nextPurchasedId) + 1;
    },

    setBackupStockList: (state, action: PayloadAction<StockListState>) => {
      state.stocks = action.payload.stocks;
      state.nextStockId = action.payload.nextStockId;
      state.nextPurchasedId = action.payload.nextPurchasedId;
    },
    restStockList: () => initialState,
    initStockList: (state, action: PayloadAction<StockListState['stocks']>) => {
      state.stocks = action.payload;
    },

    addNewStock: (state, action: PayloadAction<AddNewStockPayload>) => {
      const { stockId, stockInfo } = action.payload;
      state.stocks.byId[stockId] = stockInfo;
      state.stocks.allIds.push(stockId);
    },
    addPurchasedItem: (
      state,
      action: PayloadAction<AddNewPurchasedItemPayload>,
    ) => {
      const { stockId, purchasedId, purchasedItem } = action.payload;
      const curStock = state.stocks.byId[stockId];
      curStock.purchasedItems.byId[purchasedId] = purchasedItem;
      curStock.purchasedItems.allIds.push(purchasedId);
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

      const stockIdx = stocks.allIds.indexOf(stockId);
      if (purchasedItems.allIds.length === 1) {
        delete stocks.byId[stockId];
        stocks.allIds.splice(stockIdx, 1);
        return;
      }

      const purchasedItemIdx = purchasedItems.allIds.indexOf(purchasedId);
      delete purchasedItems.byId[purchasedId];
      purchasedItems.allIds.splice(purchasedItemIdx, 1);
    },
  },
});

export const {
  setBackupStockList,
  addNewStock,
  addPurchasedItem,
  updateStock,
  updatePurchaseItem,
  deleteStock,
  deletePurchasedItem,
  initStockList,
  restStockList,
  updateNextStockId,
  updateNextPurchasedId,
} = stockListSlice.actions;

export default stockListSlice.reducer;
