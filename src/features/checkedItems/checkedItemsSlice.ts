import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getInitialCheckedItemsInfo,
  updateAllCheckedItems,
  updatePurchasedCheckedItems,
  updateStockCheckedItems,
} from './utils';
import { StockListState } from '../stockList/type';
import {
  CheckedItemsState,
  CheckInfoPayload,
  UpdateCheckedItemsInfoPayload,
} from './type';

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
    addStockCheckInfo: (state, action: PayloadAction<CheckInfoPayload>) => {
      const { stockId, purchasedId } = action.payload;
      const newStockCheckInfo = {
        allChecked: true,
        purchasedItems: { [purchasedId]: true },
      };
      state.stocksCheckInfo[stockId] = newStockCheckInfo;
    },
    addPurchasedItemsCheckInfo: (
      state,
      action: PayloadAction<CheckInfoPayload>,
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
    deleteCheckedItems: (state, action: PayloadAction<CheckInfoPayload>) => {
      const { stockId, purchasedId } = action.payload;
      const stockInfo = state.stocksCheckInfo[stockId];
      if (Object.keys(stockInfo.purchasedItems).length === 1) {
        delete state.stocksCheckInfo[stockId];
      }
      delete stockInfo.purchasedItems[purchasedId];
    },
    deleteStockCheck: (state, action: PayloadAction<string>) => {
      delete state.stocksCheckInfo[action.payload];
    },
  },
});

export const {
  initCheckedItems,
  updateCheckedItems,
  addStockCheckInfo,
  addPurchasedItemsCheckInfo,
  deleteCheckedItems,
  deleteStockCheck,
} = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
