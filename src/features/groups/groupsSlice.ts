import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA } from './mockData';
import {
  GroupsState,
  AddGroupPayload,
  DeletePurchaseItemFromGroupPayload,
  UpdateMainGroupPayload,
} from './type';
import {
  deletePurchasedItemFromGroup,
  deleteStockFromGroup,
  validCheckGroupDelete,
} from './utils';

export const MAIN_GROUP_ID = '1';

const initialState: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: 2,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    initGroups: (state, action: PayloadAction<GroupsState['groups']>) => {
      state.groups = action.payload;
      state.selectedGroupId = MAIN_GROUP_ID;
      state.nextGroupId = 2;
    },
    resetGroups: () => initialState,
    setBackupGroups: (state, action: PayloadAction<GroupsState>) => {
      state.groups = action.payload.groups;
      state.selectedGroupId = action.payload.selectedGroupId;
      state.nextGroupId = action.payload.nextGroupId;
    },

    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    updateNextGroupId: (state) => {
      state.nextGroupId += 1;
    },
    updateMainGroup: (state, action: PayloadAction<UpdateMainGroupPayload>) => {
      const { type, stockId, purchasedId } = action.payload;
      const mainGroup = state.groups.byId[MAIN_GROUP_ID];
      if (type === 'stock') {
        mainGroup.stocks.allIds.push(stockId);
        mainGroup.stocks.byId[stockId] = [];
      }

      mainGroup.stocks.byId[stockId].push(purchasedId);
    },

    addGroup: (state, action: PayloadAction<AddGroupPayload>) => {
      const { groupInfo, groupId } = action.payload;
      state.groups.byId[groupId] = groupInfo;
      state.groups.allIds.push(groupId);
      state.selectedGroupId = groupId;
    },

    deleteGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;
      if (!validCheckGroupDelete(state, groupId)) return;

      const selectedGroupIndex = state.groups.allIds.indexOf(groupId);
      delete state.groups.byId[groupId];
      state.groups.allIds.splice(selectedGroupIndex, 1);

      if (state.selectedGroupId === groupId)
        state.selectedGroupId = MAIN_GROUP_ID;
    },
    deleteStockFromGroups: (state, action: PayloadAction<string>) => {
      const stockId = action.payload;

      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];
        deleteStockFromGroup(group, stockId);
      }
    },
    deletePurchaseItemFromGroups: (
      state,
      action: PayloadAction<DeletePurchaseItemFromGroupPayload>,
    ) => {
      const { stockId, purchasedId } = action.payload;

      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];

        const isDeleted = deletePurchasedItemFromGroup(
          group,
          stockId,
          purchasedId,
        );
        if (!isDeleted) continue;

        const emptyPurchasedItems = !group.stocks.byId[stockId].length;
        if (emptyPurchasedItems) deleteStockFromGroup(group, stockId);
      }
    },
  },
});

export const {
  setBackupGroups,
  updateSelectedGroupId,
  updateNextGroupId,
  addGroup,
  deletePurchaseItemFromGroups,
  deleteGroup,
  initGroups,
  deleteStockFromGroups,
  updateMainGroup,
  resetGroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
