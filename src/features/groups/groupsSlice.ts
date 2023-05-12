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

export type DeletePurchaseItemFromGroupPayload = {
  stockId: string;
  purchasedId: string;
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
    deleteGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;
      if (groupId === '1') return;

      delete state.groups.byId[groupId];
      state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      if (state.selectedGroupId === groupId) state.selectedGroupId = '1';
    },
    deletePurchaseItemFromGroup: (
      state,
      action: PayloadAction<DeletePurchaseItemFromGroupPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];
        if (!group.stocks.byId[stockId]) continue;
        const purchasedIds = group.stocks.byId[stockId];
        const index = purchasedIds.indexOf(purchasedId);

        if (index !== -1) {
          purchasedIds.splice(index, 1);

          if (!purchasedIds.length) {
            delete group.stocks.byId[stockId];
            group.stocks.allIds.splice(group.stocks.allIds.indexOf(stockId), 1);

            if (!group.stocks.allIds.length) {
              delete state.groups.byId[groupId];
              state.groups.allIds.splice(
                state.groups.allIds.indexOf(groupId),
                1,
              );
            }
          }
        }
      }
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

export const {
  updateSelectedGroupId,
  addGroup,
  deletePurchaseItemFromGroup,
  deleteGroup,
} = groupsSlice.actions;
export default groupsSlice.reducer;
