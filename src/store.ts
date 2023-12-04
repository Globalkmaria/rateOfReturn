import { PreloadedState, configureStore } from '@reduxjs/toolkit';

import stockListReducer, { stockInitialState } from './features/stockList/stockListSlice';
import checkedItemsReducer, { checkedInitialState } from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer, { groupsInitialState } from './features/groups/groupsSlice';
import userSliceReducer, { userInitialState } from './features/user/userSlice';

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
  stockList: stockInitialState,
  user: userInitialState,
  groups: groupsInitialState,
  checkedItems: checkedInitialState,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
