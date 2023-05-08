import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA, GROUPS_MOCK_DATA_NEXT_GROUP_ID } from './mockData';

export type Group = {
  groupId: string;
  groupName: string;
  stocks: [stockId: string, purchaseIds: string[]][];
};

export interface GroupsState {
  groups: Group[];
  selectedGroupId: string;
}

export type AddGroupPayload = {
  groupName: string;
  selectedStocks: Group['stocks'];
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
      state.groups.push({
        groupId: nextGroupId++ + '',
        groupName: action.payload.groupName,
        stocks: action.payload.selectedStocks,
      });
    },
  },
});

export const selectGroups = (state: { groups: GroupsState }) => state.groups;
export const selectSelectedGroupId = (state: { groups: GroupsState }) =>
  state.groups.selectedGroupId;

export const { updateSelectedGroupId, addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
