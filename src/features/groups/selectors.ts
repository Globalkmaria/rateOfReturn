import { createSelector } from '@reduxjs/toolkit';

import { getGroupStockInfo } from './filters';
import { GroupsState } from './type';
import { selectStocks } from '../stockList/selectors';

export const selectGroups = (state: { groups: GroupsState }) => state.groups;
export const selectGroupsIds = (state: { groups: GroupsState }) =>
  state.groups.groups.allIds;

export const selectNextGroupId = (state: { groups: GroupsState }) =>
  state.groups.nextGroupId + '';

export const selectGroupInfo = (groupId: string) =>
  createSelector([selectGroups], groupsInfo => groupsInfo.groups.byId[groupId]);

export const selectGroupStockInfo = (groupId: string) =>
  createSelector([selectStocks, selectGroups], (stock, group) =>
    getGroupStockInfo(stock, group, groupId),
  );
