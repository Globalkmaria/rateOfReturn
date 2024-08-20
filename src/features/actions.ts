import { createAction } from '@reduxjs/toolkit';
import { UserDataServiceRes } from '../service/userData/type';
import { PurchasedItemInfo, StockList, StockListState } from './stockList/type';
import { CheckedItemsInfo, StockCheckInfo } from './checkedItems/type';
import { Group, GroupsState } from './groups/type';
import { SoldsState } from './solds';
import { NotesState } from './notes';

export const initUserData =
  createAction<UserDataServiceRes>('stock/initUserData');
export const resetUserData = createAction('stock/resetUserData');
export const setBackupData = createAction<{
  stockList: StockListState;
  groups: GroupsState;
  checkedItems: CheckedItemsInfo;
  solds: SoldsState;
  notes: NotesState;
}>('stock/setBackupData');

export const addNewStock = createAction<{
  stockId: string;
  stockInfo: StockList;
  stockCheckInfo: StockCheckInfo;
}>('stock/addNewStock');
export const addPurchasedItem = createAction<{
  stockId: string;
  purchasedId: string;
  purchasedItem: PurchasedItemInfo;
}>('stock/addPurchasedItem');
export const addGroup = createAction<{
  groupInfo: Group;
  checkedItems: CheckedItemsInfo;
}>('stock/addGroup');
export const addStockSampleData = createAction('stock/addSampleData');

export const deletePurchasedItem = createAction<{
  stockId: string;
  purchasedId: string;
}>('stock/deletePurchasedItem');
export const deleteStock = createAction<string>('stock/deleteStock');
