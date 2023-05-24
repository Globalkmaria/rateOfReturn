import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getCurrentDateAndTime } from '../../views/List/StockItem/utils';
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
  StockList,
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
    setBackupStockList: (state, action: PayloadAction<StockListState>) => {
      state.stocks = action.payload.stocks;
      state.nextStockId = action.payload.nextStockId;
      state.nextPurchasedId = action.payload.nextPurchasedId;
    },
    restStockList: () => initialState,
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
      const newStockMainInfo: StockMainInfo = {
        stockName: '',
        currentPrice: 0,
        stockId: newStockId,
      };
      const newPurchasedItemsInfo: StockList['purchasedItems'] = {
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
      };

      state.stocks.byId[newStockId] = {
        mainInfo: newStockMainInfo,
        purchasedItems: newPurchasedItemsInfo,
      };
      state.stocks.allIds.push(newStockId);
    },
    addPurchasedItem: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      const newPurchaseId = (state.nextPurchasedId++).toString();
      const { date, time } = getCurrentDateAndTime();
      const initialPurchaseItem: PurchasedItemInfo = {
        purchasedId: newPurchaseId,
        purchasedDate: date,
        purchasedTime: time,
        purchasedQuantity: 0,
        purchasedPrice: 0,
      };
      const curStock = state.stocks.byId[stockId];

      curStock.purchasedItems.byId[newPurchaseId] = initialPurchaseItem;
      curStock.purchasedItems.allIds.push(newPurchaseId);
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
} = stockListSlice.actions;

export default stockListSlice.reducer;
