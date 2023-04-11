import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toDateInputValue } from '../../views/List/StockItem/utils';
import { getInitialCheckedItemsInfo } from './utils';
import {
  MOCK_DATA,
  MOCK_DATA_NEXT_STOCK_ID,
  MOCK_DATA_PURCHASED_ID,
} from './mockData';
import { RootState } from '../../store';

type UpdateCheckedItemsInfoPayload =
  | {
      type: 'all';
      checked: boolean;
    }
  | { type: 'stock'; stockId: string; checked: boolean }
  | {
      type: 'purchased';
      stockId: string;
      purchasedId: string;
      checked: boolean;
    };

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

export type CheckedItemsInfo = {
  allChecked: boolean;
  stocksCheckInfo: {
    [stockId: string]: { allChecked: boolean; checkedPurchasedItems: string[] };
  };
};

export interface StockListState {
  stocks: { byId: { [key: string]: StockList }; allIds: string[] };
  checkedItemsInfo: CheckedItemsInfo;
}

let nextStockId = MOCK_DATA_NEXT_STOCK_ID;
let nextPurchasedId = MOCK_DATA_PURCHASED_ID;

const initialState: StockListState = {
  stocks: MOCK_DATA,
  checkedItemsInfo: getInitialCheckedItemsInfo({
    data: MOCK_DATA,
    value: true,
  }),
};

export const stockListSlice = createSlice({
  name: 'stockList',
  initialState,
  reducers: {
    updateCheckedItemsInfo: (
      state,
      action: PayloadAction<UpdateCheckedItemsInfoPayload>,
    ) => {
      const { checked } = action.payload;
      switch (action.payload.type) {
        case 'all':
          state.checkedItemsInfo = getInitialCheckedItemsInfo({
            data: state.stocks,
            value: checked,
          });
          break;
        case 'stock':
          const checkedStock =
            state.checkedItemsInfo.stocksCheckInfo[action.payload.stockId];

          state.checkedItemsInfo.allChecked = false;
          checkedStock.allChecked = checked;

          if (checked) {
            checkedStock.checkedPurchasedItems =
              state.stocks.byId[action.payload.stockId].purchasedItems.allIds;
          } else {
            checkedStock.checkedPurchasedItems = [];
          }
          break;
        case 'purchased':
          const selectedStock =
            state.checkedItemsInfo.stocksCheckInfo[action.payload.stockId];

          state.checkedItemsInfo.allChecked = false;
          state.checkedItemsInfo.stocksCheckInfo[
            action.payload.stockId
          ].allChecked = false;

          checked
            ? selectedStock.checkedPurchasedItems.push(
                action.payload.purchasedId,
              )
            : selectedStock.checkedPurchasedItems.splice(
                selectedStock.checkedPurchasedItems.indexOf(
                  action.payload.purchasedId,
                ),
                1,
              );
          break;
        default:
          break;
      }
    },
    addNewStock: (state) => {
      const newStockId = (nextStockId++).toString();
      const newPurchaseId = (nextPurchasedId++).toString();

      state.checkedItemsInfo.stocksCheckInfo[newStockId] = {
        allChecked: true,
        checkedPurchasedItems: [newPurchaseId],
      };
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
              purchasedDate: toDateInputValue().toISOString(),
              purchasedQuantity: 0,
              purchasedPrice: 0,
            },
          },
          allIds: [newPurchaseId],
        },
      };
      state.stocks.allIds.push(newStockId);
    },
    addPurchasedItem: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      const newPurchaseId = (nextPurchasedId++).toString();
      state.checkedItemsInfo.stocksCheckInfo[
        stockId
      ].checkedPurchasedItems.push(newPurchaseId);
      state.stocks.byId[stockId].purchasedItems.byId[newPurchaseId] = {
        purchasedId: newPurchaseId,
        purchasedDate: toDateInputValue().toISOString(),
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
      delete state.checkedItemsInfo.stocksCheckInfo[stockId];
      delete state.stocks.byId[stockId];
      state.stocks.allIds.splice(state.stocks.allIds.indexOf(stockId), 1);
    },
    deletePurchasedItem: (
      { stocks, checkedItemsInfo },
      action: PayloadAction<DeletePurchasedItemPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      const purchasedItems = stocks.byId[stockId].purchasedItems;
      if (purchasedItems.allIds.length === 1) {
        delete stocks.byId[stockId];
        stocks.allIds.splice(stocks.allIds.indexOf(stockId), 1);

        const selectedStockInfo = checkedItemsInfo.stocksCheckInfo[stockId];
        selectedStockInfo.checkedPurchasedItems.splice(
          selectedStockInfo.checkedPurchasedItems.indexOf(purchasedId),
          1,
        );
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

export const selectCheckedItemsInfo = (state: RootState) =>
  state.stockList.checkedItemsInfo;
export const selectIsAllChecked = () =>
  createSelector(
    [selectCheckedItemsInfo],
    (checkedItemsInfo) => checkedItemsInfo,
  );
export const selectStockCheckedInfo = (stockId: string) =>
  createSelector(
    [selectCheckedItemsInfo],
    (checkedItemsInfo) => checkedItemsInfo.stocksCheckInfo[stockId],
  );
export const selectIsPurchasedItemChecked = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector([selectStockCheckedInfo(stockId)], (checkedStockInfo) =>
    checkedStockInfo.checkedPurchasedItems.includes(purchasedId),
  );

export const {
  updateCheckedItemsInfo,
  addNewStock,
  addPurchasedItem,
  updateStock,
  updatePurchaseItem,
  deleteStock,
  deletePurchasedItem,
} = stockListSlice.actions;

export default stockListSlice.reducer;
