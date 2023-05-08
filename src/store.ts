import { configureStore } from '@reduxjs/toolkit';
import stockListReducer from './features/stockList/stockListSlice';
import checkedItemsReducer from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer from './features/groups/groupsSlice';

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
