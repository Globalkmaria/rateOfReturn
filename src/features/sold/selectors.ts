import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSoldList = (state: RootState) => state.sold.list;
export const selectSoldItem = (id: string) =>
  createSelector([selectSoldList], soldList => soldList.byId[id]);
