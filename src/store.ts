import { combineReducers, configureStore } from '@reduxjs/toolkit';

import checkedItemsReducer from './features/checkedItems/checkedItemsSlice';
import { getInitialCheckedItemsInfo } from './features/checkedItems/utils';
import groupsReducerReducer, {
  GROUP_INITIAL_STATE,
} from './features/groups/groupsSlice';
import { NOTE_INITIAL_STATE, noteReducer } from './features/notes';
import { SOLD_INITIAL_STATE, soldReducer } from './features/solds';
import stockListReducer, {
  STOCK_INITIAL_STATE,
} from './features/stockList/stockListSlice';
import {
  TEMPORAL_STOCK_INITIAL_STATE,
  temporalStockReducer,
} from './features/temporalStockList/temporalStockListSlice';
import userSliceReducer, {
  USER_INITIAL_STATE,
} from './features/user/userSlice';

const rootReducer = combineReducers({
  stockList: stockListReducer,
  checkedItems: checkedItemsReducer,
  groups: groupsReducerReducer,
  user: userSliceReducer,
  solds: soldReducer,
  notes: noteReducer,
  temporalStockList: temporalStockReducer,
});

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
    user: userSliceReducer,
    solds: soldReducer,
    notes: noteReducer,
    temporalStockList: temporalStockReducer,
  },
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const preloadedStoreState: RootState = {
  stockList: STOCK_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  groups: GROUP_INITIAL_STATE,
  checkedItems: getInitialCheckedItemsInfo({
    data: STOCK_INITIAL_STATE.stocks,
    value: true,
  }),
  solds: SOLD_INITIAL_STATE,
  notes: NOTE_INITIAL_STATE,
  temporalStockList: TEMPORAL_STOCK_INITIAL_STATE,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
