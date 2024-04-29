import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SOLD_MOCK_DATA } from './mockData';
import { Sold, SoldsState } from './type';
import { initUserData, setBackupData } from '../actions';

export const SOLD_INITIAL_STATE: SoldsState = {
  list: {
    byId: {},
    allIds: [],
  },
};

export const SOLD_DATA_INITIAL_STATE_WITH_SAMPLE: SoldsState = SOLD_MOCK_DATA;

const soldSlice = createSlice({
  name: 'solds',
  initialState: SOLD_DATA_INITIAL_STATE_WITH_SAMPLE,
  reducers: {
    resetSold: () => SOLD_INITIAL_STATE,
    addSampleData: () => SOLD_DATA_INITIAL_STATE_WITH_SAMPLE,
    addNewSold: (
      state,
      action: PayloadAction<{ soldInfo: Sold; stockId: string }>,
    ) => {
      const { soldInfo } = action.payload;
      state.list.byId[soldInfo.purchasedId] = soldInfo;
      state.list.allIds.push(soldInfo.purchasedId);
    },
    deleteSold: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      delete state.list.byId[itemId];
      const idx = state.list.allIds.indexOf(itemId);
      state.list.allIds.splice(idx, 1);
    },
    updateSold: (state, action: PayloadAction<Sold>) => {
      const soldInfo = action.payload;
      state.list.byId[soldInfo.purchasedId] = soldInfo;
    },
    initSolds: (state, action: PayloadAction<SoldsState>) => action.payload,
  },
  extraReducers(builder) {
    builder.addCase(initUserData, (state, action) => action.payload.solds);
    builder.addCase(setBackupData, (state, action) => action.payload.solds);
  },
});

export const {
  resetSold,
  addNewSold,
  addSampleData,
  deleteSold,
  updateSold,
  initSolds,
} = soldSlice.actions;

export const soldReducer = soldSlice.reducer;
