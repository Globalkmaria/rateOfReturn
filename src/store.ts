import { configureStore } from '@reduxjs/toolkit';
import stockListReducer from './features/stockList/stockListSlice';
import checkedItemsReducer from './features/checkedItems/checkedItemsSlice';
import groupsReducerReducer from './features/groups/groupsSlice';
import stockModalReducer from './features/stockModal/stockModalSlice';
import languageReducer from './features/language/languageSlice';

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
    checkedItems: checkedItemsReducer,
    groups: groupsReducerReducer,
    stockModals: stockModalReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
