import { PreloadedState, configureStore } from '@reduxjs/toolkit';

import stockListReducer, { STOCK_INITIAL_STATE } from './features/stockList/stockListSlice';
import checkedItemsReducer, { CHECKED_INITIAL_STATE } from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer, { GROUP_INITIAL_STATE } from './features/groups/groupsSlice';
import userSliceReducer, { USER_INITIAL_STATE } from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
    user: userSliceReducer,
  },
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      stockList: stockListReducer,
      checkedItems: checkedItemsReducer,
      groups: groupsReducerReducer,
      user: userSliceReducer,
    },
    preloadedState,
  });
}

export const preloadedStoreState: RootState = {
  stockList: STOCK_INITIAL_STATE,
  user: USER_INITIAL_STATE,
  groups: GROUP_INITIAL_STATE,
  checkedItems: CHECKED_INITIAL_STATE,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
