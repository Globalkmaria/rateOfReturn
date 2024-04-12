import { createAction } from '@reduxjs/toolkit';
import { UserDataServiceRes } from '../service/userData/type';
import { PurchasedItemInfo, StockList } from './stockList/type';
import { StockCheckInfo } from './checkedItems/type';

export const deletePurchasedItem = createAction<{ stockId: string; purchasedId: string }>('stock/deletePurchasedItem');
export const deleteStock = createAction<string>('stock/deleteStock');
export const initUserData = createAction<UserDataServiceRes>('stock/initUserData');
export const resetUserData = createAction('stock/resetUserData');
export const addNewStock = createAction<{ stockId: string; stockInfo: StockList; stockCheckInfo: StockCheckInfo }>(
  'stock/addNewStock',
);
export const addPurchasedItem = createAction<{
  stockId: string;
  purchasedId: string;
  purchasedItem: PurchasedItemInfo;
}>('stock/addPurchasedItem');
