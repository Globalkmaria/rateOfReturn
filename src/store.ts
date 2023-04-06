import { configureStore } from '@reduxjs/toolkit';
import stockListReducer from './features/stockList/stockListSlice';

export const store = configureStore({
  reducer: {
    stockList: stockListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
