import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA, GROUPS_MOCK_DATA_NEXT_GROUP_ID } from './mockData';
import {
  GroupsState,
  AddGroupPayload,
  DeletePurchaseItemFromGroupPayload,
  UpdateMainGroupPayload,
} from './type';
import { validCheckGroupDelete } from './utils';

export const MAIN_GROUP_ID = '1';

const initialState: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: GROUPS_MOCK_DATA_NEXT_GROUP_ID,
};

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
      state.selectedGroupId = MAIN_GROUP_ID;
      state.nextGroupId = action.payload.nextGroupId;
    },
    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    updateNextGroupId: (state) => {
      state.nextGroupId += 1;
    },
    addGroup: (state, action: PayloadAction<AddGroupPayload>) => {
      const { groupInfo, groupId } = action.payload;
      state.groups.byId[groupId] = groupInfo;
      state.groups.allIds.push(groupId);
      state.selectedGroupId = groupId;
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;
      if (validCheckGroupDelete(state, groupId)) return;

      const selectedGroupIndex = state.groups.allIds.indexOf(groupId);
      delete state.groups.byId[groupId];
      state.groups.allIds.splice(selectedGroupIndex, 1);

      if (state.selectedGroupId === groupId)
        state.selectedGroupId = MAIN_GROUP_ID;
    },
    deleteStockFromGroup: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;
      const groupAllIds = [...state.groups.allIds];
      for (let i = 0; i < groupAllIds.length; i++) {
        const groupId = groupAllIds[i];
        const group = state.groups.byId[groupId];
        const stockInGroup = group.stocks.byId[stockId];
        if (!stockInGroup) continue;

        delete group.stocks.byId[stockId];
        const stockAllIdsInGroup = group.stocks.allIds;
        const stockIndex = stockAllIdsInGroup.indexOf(stockId);
        stockAllIdsInGroup.splice(stockIndex, 1);
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
        if (group.groupId === MAIN_GROUP_ID) continue;

        delete state.groups.byId[groupId];
        state.groups.allIds.splice(state.groups.allIds.indexOf(groupId), 1);
      }
    },
    updateMainGroup: (state, action: PayloadAction<UpdateMainGroupPayload>) => {
      const { type, stockId, purchasedId } = action.payload;
      const mainGroup = state.groups.byId[MAIN_GROUP_ID];
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
  updateNextGroupId,
  addGroup,
  deletePurchaseItemFromGroup,
  deleteGroup,
  initGroups,
  deleteStockFromGroup,
  updateMainGroup,
  resetGroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
