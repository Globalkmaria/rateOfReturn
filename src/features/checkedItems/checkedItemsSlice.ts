import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getInitialCheckedItemsInfo, initCheckedItemsWithData, updateCheckedItemsState } from './utils';
import { CheckedItemsInfo, CheckedItemsState, UpdateCheckedItemsInfoPayload } from './type';
import { MOCK_DATA } from '../stockList/mockData';
import {
  addGroup,
  addNewStock,
  addPurchasedItem,
  deletePurchasedItem,
  deleteStock,
  initUserData,
  resetUserData,
  setBackupData,
} from '../actions';

export const checkedInitialState: CheckedItemsState = {
  allChecked: true,
  stocksCheckInfo: {},
};

export const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState: checkedInitialState,
  reducers: {
    addSampleCheckedItems: state => {
      state.allChecked = true;
      state.stocksCheckInfo = getInitialCheckedItemsInfo({
        data: MOCK_DATA,
        value: true,
      }).stocksCheckInfo;
    },
    initCheckedItems: (state, action: PayloadAction<CheckedItemsInfo>) => {
      initCheckedItemsWithData(state, action.payload);
    },
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
    builder.addCase(initUserData, (state, action) => {
      initCheckedItemsWithData(state, action.payload.checkedItems);
    });
    builder.addCase(resetUserData, () => checkedInitialState);
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
  },
});

export const { initCheckedItems, updateCheckedItems, addSampleCheckedItems } = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
