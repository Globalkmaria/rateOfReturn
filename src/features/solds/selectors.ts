import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';

export const selectSolds = (state: RootState) => state.solds;
export const selectSoldList = (state: RootState) => state.solds.list;
export const selectSoldNextId = (state: RootState) => state.solds.nextId;
export const selectSoldItem = (id: string) =>
  createSelector([selectSoldList], soldList => soldList.byId[id]);
