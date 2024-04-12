import { createAction } from '@reduxjs/toolkit';
import { UserDataServiceRes } from '../service/userData/type';

export const deletePurchasedItem = createAction<{ stockId: string; purchasedId: string }>('stock/deletePurchasedItem');
export const deleteStock = createAction<string>('stock/deleteStock');
export const initUserData = createAction<UserDataServiceRes>('stock/initUserData');
export const resetUserData = createAction('stock/resetUserData');
