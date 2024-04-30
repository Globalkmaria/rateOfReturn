import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SOLD_MOCK_DATA } from './mockData';
import { Sold, SoldsState } from './type';
import { initUserData, resetUserData, setBackupData } from '../actions';

export const SOLD_INITIAL_STATE: SoldsState = {
  list: {
    byId: {},
    allIds: [],
  },
  nextId: 1,
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
      action: PayloadAction<{ soldInfo: Omit<Sold, 'id'>; stockId: string }>,
    ) => {
      const { soldInfo } = action.payload;
      const id = state.nextId.toString();
      state.list.byId[state.nextId] = {
        ...soldInfo,
        id,
      };
      state.list.allIds.push(id);
      state.nextId++;
    },
    deleteSold: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.list.byId[id];
      const idx = state.list.allIds.indexOf(id);
      state.list.allIds.splice(idx, 1);
    },
    updateSold: (state, action: PayloadAction<Sold>) => {
      const soldInfo = action.payload;
      state.list.byId[soldInfo.id] = soldInfo;
    },
    initSolds: (state, action: PayloadAction<SoldsState>) => action.payload,
  },
  extraReducers(builder) {
    builder.addCase(initUserData, (state, action) => action.payload.solds);
    builder.addCase(setBackupData, (state, action) => action.payload.solds);
    builder.addCase(resetUserData, (state, action) => SOLD_INITIAL_STATE);
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
