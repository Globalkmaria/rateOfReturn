import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SOLD_MOCK_DATA } from './mockData';
import { Sold, SoldState } from './type';

export const SOLD_INITIAL_STATE: SoldState = {
  list: {
    byId: {},
    allIds: [],
  },
};

export const SOLD_DATA_INITIAL_STATE_WITH_SAMPLE: SoldState = SOLD_MOCK_DATA;

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
  },
});

export const { resetSold, addNewSold, addSampleData, deleteSold, updateSold } =
  soldSlice.actions;

export const soldReducer = soldSlice.reducer;
