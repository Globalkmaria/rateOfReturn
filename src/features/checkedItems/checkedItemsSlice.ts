import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getInitialCheckedItemsInfo, updateCheckedItemsState } from './utils';
import { CheckedItemsInfo, CheckedItemsState, UpdateCheckedItemsInfoPayload } from './type';
import { MOCK_DATA } from '../stockList/mockData';
import {
  addGroup,
  addNewStock,
  addPurchasedItem,
  addSampleData,
  deletePurchasedItem,
  deleteStock,
  initUserData,
  resetUserData,
  setBackupData,
} from '../actions';

export const CHECKED_INITIAL_STATE: CheckedItemsState = {
  allChecked: true,
  stocksCheckInfo: {},
};

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState: CHECKED_INITIAL_STATE,
  reducers: {
    initCheckedItems: (state, action: PayloadAction<CheckedItemsInfo>) => action.payload,
    updateCheckedItems: (state, action: PayloadAction<UpdateCheckedItemsInfoPayload>) => {
      updateCheckedItemsState(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(deletePurchasedItem, (state, { payload }) => {
      const { stockId, purchasedId } = payload;
      const stockInfo = state.stocksCheckInfo[stockId];
      delete stockInfo.purchasedItems[purchasedId];

      const purchasedItemsExist = Object.keys(stockInfo.purchasedItems).length;
      if (!purchasedItemsExist) delete state.stocksCheckInfo[stockId];
    });
    builder.addCase(deleteStock, (state, { payload }) => {
      delete state.stocksCheckInfo[payload];
    });
    builder.addCase(initUserData, (state, action) => action.payload.checkedItems);
    builder.addCase(resetUserData, () => CHECKED_INITIAL_STATE);
    builder.addCase(addNewStock, (state, action) => {
      const { stockId, stockCheckInfo } = action.payload;
      state.stocksCheckInfo[stockId] = stockCheckInfo;
    });
    builder.addCase(addPurchasedItem, (state, action) => {
      const { stockId, purchasedId } = action.payload;
      state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = true;
    });
    builder.addCase(setBackupData, (state, action) => action.payload.checkedItems);
    builder.addCase(addGroup, (state, action) => action.payload.checkedItems);
    builder.addCase(addSampleData, () =>
      getInitialCheckedItemsInfo({
        data: MOCK_DATA,
        value: true,
      }),
    );
  },
});

export const { initCheckedItems, updateCheckedItems } = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
