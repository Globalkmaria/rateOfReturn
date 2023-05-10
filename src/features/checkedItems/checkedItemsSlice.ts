import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  getInitialCheckedItemsInfo,
  updateAllCheckedItems,
  updatePurchasedCheckedItems,
  updateStockCheckedItems,
} from './utils';
import { RootState } from '../../store';
import { StockListState } from '../stockList/stockListSlice';

export type CheckedItemsInfo = {
  allChecked: boolean;
  stocksCheckInfo: {
    [stockId: string]: {
      allChecked: boolean;
      purchasedItems: { [purchasedId: string]: boolean };
    };
  };
};

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

export type DeletePurchaseItemFromCheckInfoPayload = {
  stockId: string;
  purchasedId: string;
};

export type CheckedItemsState = CheckedItemsInfo;

const initialState: CheckedItemsState = {
  allChecked: false,
  stocksCheckInfo: {},
};

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    initCheckedItems: (
      state,
      action: PayloadAction<StockListState['stocks']>,
    ) => {
      const initData = getInitialCheckedItemsInfo({
        data: action.payload,
        value: true,
      });
      state.allChecked = initData.allChecked;
      state.stocksCheckInfo = initData.stocksCheckInfo;
    },
    addStockCheckInfo: (
      state,
      action: PayloadAction<{ stockId: string; purchasedId: string }>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      state.stocksCheckInfo[stockId] = {
        allChecked: true,
        purchasedItems: { [purchasedId]: true },
      };
    },
    addPurchasedItemsCheckInfo: (
      state,
      action: PayloadAction<{ stockId: string; purchasedId: string }>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = true;
    },
    updateCheckedItems: (
      state,
      action: PayloadAction<UpdateCheckedItemsInfoPayload>,
    ) => {
      const { checked, type } = action.payload;
      switch (type) {
        case 'all':
          state = updateAllCheckedItems({
            state: state,
            value: checked,
          });
          break;
        case 'stock':
          state = updateStockCheckedItems({
            state: state,
            stockId: action.payload.stockId,
            value: checked,
          });
          break;
        case 'purchased':
          state = updatePurchasedCheckedItems({
            state: state,
            stockId: action.payload.stockId,
            purchasedId: action.payload.purchasedId,
            value: checked,
          });
          break;
        default:
          break;
      }
    },
    deleteCheckedItems: (
      state,
      action: PayloadAction<DeletePurchaseItemFromCheckInfoPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      const stockInfo = state.stocksCheckInfo[stockId];
      if (Object.keys(stockInfo.purchasedItems).length === 1) {
        delete state.stocksCheckInfo[stockId];
      }
      delete stockInfo.purchasedItems[purchasedId];
    },
  },
});

export const selectCheckedItems = (state: RootState) => state.checkedItems;
export const selectCheckItemsInfo = () =>
  createSelector(
    [selectCheckedItems],
    (checkedItemsInfo) => checkedItemsInfo.stocksCheckInfo,
  );
export const selectIsAllChecked = () =>
  createSelector(
    [selectCheckedItems],
    (checkedItems) => checkedItems.allChecked,
  );

export const selectStockCheckedInfo = (stockId: string) =>
  createSelector(
    [selectCheckItemsInfo()],
    (stocksCheckInfo) => stocksCheckInfo[stockId],
  );
export const selectIsPurchasedItemChecked = (
  stockId: string,
  purchasedId: string,
) =>
  createSelector(
    [selectStockCheckedInfo(stockId)],
    (checkedStockInfo) => checkedStockInfo.purchasedItems[purchasedId],
  );

export const selectCheckedPurchasedItems = () =>
  createSelector([selectCheckItemsInfo()], (stocksCheckInfo) => {
    const checkedPurchasedItems: { stockId: string; purchasedId: string }[] =
      [];

    Object.keys(stocksCheckInfo).forEach((stockId) => {
      const purchasedItems = stocksCheckInfo[stockId].purchasedItems;
      Object.keys(purchasedItems).forEach((purchasedId) => {
        if (purchasedItems[purchasedId]) {
          checkedPurchasedItems.push({ stockId, purchasedId });
        }
      });
    });
    return checkedPurchasedItems;
  });

export const {
  initCheckedItems,
  updateCheckedItems,
  addStockCheckInfo,
  addPurchasedItemsCheckInfo,
  deleteCheckedItems,
} = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
