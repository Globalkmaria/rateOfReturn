import { configureStore } from '@reduxjs/toolkit';
import stockListReducer from './features/stockList/stockListSlice';
import checkedItemsReducer from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer from './features/groups/groupsSlice';
import stockModalSliceReducer from './features/stockModal/stockModalSlice';

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
    stockModals: stockModalSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
