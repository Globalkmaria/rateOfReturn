import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA, GROUPS_MOCK_DATA_NEXT_GROUP_ID } from './mockData';

export type Group = {
  groupId: string;
  groupName: string;
  stocks: { byId: { [stockId: string]: string[] }; allIds: string[] };
};

export interface GroupsState {
  groups: { byId: { [groupId: string]: Group }; allIds: string[] };
  selectedGroupId: string;
}

export type AddGroupPayload = {
  groupName: string;
  selectedStocks: Group['stocks'];
};

export type EditGroupPurchaseItemPayload = {
  groupId: string;
  stockId: string;
  purchasedId: string;
  type: 'add' | 'delete';
};

const initialState: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: '1',
};

let nextGroupId = GROUPS_MOCK_DATA_NEXT_GROUP_ID;

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    addGroup: (state, action: PayloadAction<AddGroupPayload>) => {
      state.groups.byId[nextGroupId] = {
        groupId: nextGroupId + '',
        groupName: action.payload.groupName,
        stocks: action.payload.selectedStocks,
      };
      state.groups.allIds.push(nextGroupId + '');
      state.selectedGroupId = nextGroupId + '';
      nextGroupId++;
    },
  },
});

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

export const { updateSelectedGroupId, addGroup } = groupsSlice.actions;
export default groupsSlice.reducer;
