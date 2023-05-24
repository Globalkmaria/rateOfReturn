import { createSelector } from '@reduxjs/toolkit';
import { GroupsState } from './type';

export const selectGroups = (state: { groups: GroupsState }) => state.groups;
export const selectSelectedGroupId = (state: { groups: GroupsState }) =>
  state.groups.selectedGroupId;
export const selectIsMainGroupSelected = () =>
  createSelector(
    selectSelectedGroupId,
    (selectedGroupId) => selectedGroupId === '1',
  );
export const selectSelectedGroupInfo = () =>
  createSelector(
    [selectSelectedGroupId, selectGroups],
    (selectedGroupId, groupsInfo) => groupsInfo.groups.byId[selectedGroupId],
  );
