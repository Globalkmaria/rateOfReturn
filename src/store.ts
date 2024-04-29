import { combineReducers, configureStore } from '@reduxjs/toolkit';

import stockListReducer, {
  STOCK_INITIAL_STATE,
} from './features/stockList/stockListSlice';
import checkedItemsReducer from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer, {
  GROUP_INITIAL_STATE,
} from './features/groups/groupsSlice';
import userSliceReducer, {
  USER_INITIAL_STATE,
} from './features/user/userSlice';
import { getInitialCheckedItemsInfo } from './features/checkedItems/utils';
import { SOLD_INITIAL_STATE, soldReducer } from './features/sold';

const rootReducer = combineReducers({
  stockList: stockListReducer,
  checkedItems: checkedItemsReducer,
  groups: groupsReducerReducer,
  user: userSliceReducer,
  sold: soldReducer,
});

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
    user: userSliceReducer,
    sold: soldReducer,
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
  sold: SOLD_INITIAL_STATE,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
