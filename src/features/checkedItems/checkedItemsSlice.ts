import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getInitialCheckedItemsInfo, initCheckedItemsWithData, updateCheckedItemsState } from './utils';
import {
  AddStockCheckInfoPayload,
  CheckedItemsInfo,
  CheckedItemsState,
  CheckInfoPayload,
  UpdateCheckedItemsInfoPayload,
} from './type';
import { MOCK_DATA } from '../stockList/mockData';
import { deletePurchasedItem, deleteStock, initUserData } from '../actions';

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
    resetCheckedItems: () => checkedInitialState,
    initCheckedItems: (state, action: PayloadAction<CheckedItemsInfo>) => {
      initCheckedItemsWithData(state, action.payload);
    },
    setBackupCheckedItems: (state, action: PayloadAction<CheckedItemsState>) => {
      state.allChecked = action.payload.allChecked;
      state.stocksCheckInfo = action.payload.stocksCheckInfo;
    },
    addStockCheckInfo: (state, action: PayloadAction<AddStockCheckInfoPayload>) => {
      const { stockId, stockCheckInfo } = action.payload;
      state.stocksCheckInfo[stockId] = stockCheckInfo;
    },
    addPurchasedItemsCheckInfo: (state, action: PayloadAction<CheckInfoPayload>) => {
      const { stockId, purchasedId } = action.payload;
      state.stocksCheckInfo[stockId].purchasedItems[purchasedId] = true;
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
  },
});

export const {
  setBackupCheckedItems,
  initCheckedItems,
  updateCheckedItems,
  addStockCheckInfo,
  addPurchasedItemsCheckInfo,
  resetCheckedItems,
  addSampleCheckedItems,
} = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
