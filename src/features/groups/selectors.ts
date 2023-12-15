import { createSelector } from '@reduxjs/toolkit';

import { GroupsState } from './type';
import { selectStocks } from '../stockList/selectors';
import { getGroupStockInfo } from './filters';

export const selectGroups = (state: { groups: GroupsState }) => state.groups;
export const selectSelectedGroupId = (state: { groups: GroupsState }) => state.groups.selectedGroupId;
export const selectNextGroupId = (state: { groups: GroupsState }) => state.groups.nextGroupId + '';
export const selectIsMainGroupSelected = createSelector(
  selectSelectedGroupId,
  selectedGroupId => selectedGroupId === '1',
);
export const selectSelectedGroupInfo = createSelector(
  [selectSelectedGroupId, selectGroups],
  (selectedGroupId, groupsInfo) => groupsInfo.groups.byId[selectedGroupId],
);
export const selectGroupStockInfo = (groupId: string) =>
  createSelector([selectStocks, selectGroups], (stock, group) => getGroupStockInfo(stock, group, groupId));
