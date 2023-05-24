import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA, GROUPS_MOCK_DATA_NEXT_GROUP_ID } from './mockData';
import {
  GroupsState,
  AddGroupPayload,
  DeletePurchaseItemFromGroupPayload,
  UpdateMainGroupPayload,
  Group,
} from './type';

const initialState: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: '1',
  nextGroupId: GROUPS_MOCK_DATA_NEXT_GROUP_ID,
};

const mainGroupId = '1';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    resetGroups: () => initialState,
    setBackupGroups: (state, action: PayloadAction<GroupsState>) => {
      state.groups = action.payload.groups;
      state.selectedGroupId = action.payload.selectedGroupId;
      state.nextGroupId = action.payload.nextGroupId;
    },
    initGroups: (state, action: PayloadAction<GroupsState>) => {
      state.groups = action.payload.groups;
      state.selectedGroupId = '1';
      state.nextGroupId = action.payload.nextGroupId;
    },
    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    addGroup: (state, action: PayloadAction<AddGroupPayload>) => {
      const nextGroupId = state.nextGroupId++ + '';
      const newGroupInfo: Group = {
        groupId: nextGroupId,
        groupName: action.payload.groupName,
        stocks: action.payload.selectedStocks,
      };
      state.groups.byId[nextGroupId] = newGroupInfo;
      state.groups.allIds.push(nextGroupId);
      state.selectedGroupId = nextGroupId;
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;
      if (groupId === mainGroupId) return;

      delete state.groups.byId[groupId];
      state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      if (state.selectedGroupId === groupId)
        state.selectedGroupId = mainGroupId;
    },
    deleteStockFromGroup: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      const groupAllIds = [...state.groups.allIds];
      for (let i = 0; i < groupAllIds.length; i++) {
        const groupId = groupAllIds[i];
        const group = state.groups.byId[groupAllIds[i]];
        const stockAllIds = group.stocks.allIds;
        if (!group.stocks.byId[stockId]) continue;

        delete group.stocks.byId[stockId];
        stockAllIds.splice(group.stocks.allIds.indexOf(stockId), 1);
        if (group.stocks.allIds.length) continue;
        if (group.groupId === mainGroupId) continue;

        delete state.groups.byId[groupId];
        state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      }
    },

    deletePurchaseItemFromGroup: (
      state,
      action: PayloadAction<DeletePurchaseItemFromGroupPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;
      const groupAllIds = [...state.groups.allIds];
      for (let i = 0; i < groupAllIds.length; i++) {
        const groupId = groupAllIds[i];
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
        if (group.groupId === mainGroupId) continue;

        delete state.groups.byId[groupId];
        state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      }
    },
    updateMainGroup: (state, action: PayloadAction<UpdateMainGroupPayload>) => {
      const { type, stockId, purchasedId } = action.payload;
      const mainGroup = state.groups.byId[mainGroupId];
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

export const {
  setBackupGroups,
  updateSelectedGroupId,
  addGroup,
  deletePurchaseItemFromGroup,
  deleteGroup,
  initGroups,
  deleteStockFromGroup,
  updateMainGroup,
  resetGroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
