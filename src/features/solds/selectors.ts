import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSolds = (state: RootState) => state.solds;
export const selectSoldList = (state: RootState) => state.solds.list;
export const selectSoldItem = (id: string) =>
  createSelector([selectSoldList], soldList => soldList.byId[id]);
