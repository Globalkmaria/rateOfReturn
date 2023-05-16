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
  nextGroupId: number;
}

export type AddGroupPayload = {
  groupName: string;
  selectedStocks: Group['stocks'];
};

export type DeletePurchaseItemFromGroupPayload = {
  stockId: string;
  purchasedId: string;
};
export type UpdateMainGroupPayload = {
  type: 'stock' | 'purchase';
  stockId: string;
  purchasedId: string;
};

const initialState: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: '1',
  nextGroupId: GROUPS_MOCK_DATA_NEXT_GROUP_ID,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    initGroups: (state, action: PayloadAction<GroupsState>) => {
      state.groups = action.payload.groups;
      state.selectedGroupId = '1';
      state.nextGroupId = action.payload.nextGroupId;
    },
    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    addGroup: (state, action: PayloadAction<AddGroupPayload>) => {
      state.groups.byId[state.nextGroupId] = {
        groupId: state.nextGroupId + '',
        groupName: action.payload.groupName,
        stocks: action.payload.selectedStocks,
      };
      state.groups.allIds.push(state.nextGroupId + '');
      state.selectedGroupId = state.nextGroupId + '';
      state.nextGroupId++;
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;
      if (groupId === '1') return;

      delete state.groups.byId[groupId];
      state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      if (state.selectedGroupId === groupId) state.selectedGroupId = '1';
    },
    deleteStockFromGroup: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];
        if (!group.stocks.byId[stockId]) continue;

        delete group.stocks.byId[stockId];
        group.stocks.allIds.splice(group.stocks.allIds.indexOf(stockId), 1);
        if (group.stocks.allIds.length) continue;
        if (group.groupId === '1') continue;

        delete state.groups.byId[groupId];
        state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      }
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
        if (index === -1) continue;

        purchasedIds.splice(index, 1);
        if (purchasedIds.length) continue;

        delete group.stocks.byId[stockId];
        group.stocks.allIds.splice(group.stocks.allIds.indexOf(stockId), 1);
        if (group.stocks.allIds.length) continue;
        if (group.groupId === '1') continue;

        delete state.groups.byId[groupId];
        state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      }
    },
    updateMainGroup: (state, action: PayloadAction<UpdateMainGroupPayload>) => {
      const { type, stockId, purchasedId } = action.payload;
      const mainGroup = state.groups.byId['1'];
      if (type === 'stock') {
        mainGroup.stocks.allIds.push(stockId);
        mainGroup.stocks.byId[stockId] = [purchasedId];
      }

      if (type === 'purchase') {
        mainGroup.stocks.byId[stockId].push(purchasedId);
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
  initGroups,
  deleteStockFromGroup,
  updateMainGroup,
} = groupsSlice.actions;
export default groupsSlice.reducer;
