import { configureStore } from '@reduxjs/toolkit';

import stockListReducer from './features/stockList/stockListSlice';
import checkedItemsReducer from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer from './features/groups/groupsSlice';
import userSliceReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
    user: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
