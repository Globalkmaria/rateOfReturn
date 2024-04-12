import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA, GROUPS_MOCK_DATA_NEXT_GROUP_ID } from './mockData';
import { GroupsState, AddGroupPayload, UpdateMainGroupPayload } from './type';
import { deletePurchasedItemFromGroup, deleteStockFromGroup, initGroupsWithData, validCheckGroupDelete } from './utils';
import { deletePurchasedItem, deleteStock, initUserData, resetUserData, setBackupData } from '../actions';

export const MAIN_GROUP_ID = '1';

export const groupsInitialState: GroupsState = {
  groups: {
    byId: {},
    allIds: [],
  },
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: 2,
};

export const sampleAsInitialState: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: GROUPS_MOCK_DATA_NEXT_GROUP_ID,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: sampleAsInitialState,
  reducers: {
    addSampleGroups: state => {
      state.groups = GROUPS_MOCK_DATA;
      state.selectedGroupId = MAIN_GROUP_ID;
      state.nextGroupId = GROUPS_MOCK_DATA_NEXT_GROUP_ID;
    },
    initGroups: (state, action: PayloadAction<Omit<GroupsState, 'selectedGroupId'>>) => {
      initGroupsWithData(state, { selectedGroupId: MAIN_GROUP_ID, ...action.payload });
    },

    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    updateNextGroupId: state => {
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

      if (state.selectedGroupId === groupId) state.selectedGroupId = MAIN_GROUP_ID;
    },
  },
  extraReducers(builder) {
    builder.addCase(deletePurchasedItem, (state, { payload }) => {
      const { stockId, purchasedId } = payload;

      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];

        const isDeleted = deletePurchasedItemFromGroup(group, stockId, purchasedId);
        if (!isDeleted) continue;

        const emptyPurchasedItems = !group.stocks.byId[stockId].length;
        if (emptyPurchasedItems) deleteStockFromGroup(group, stockId);
      }
    });
    builder.addCase(deleteStock, (state, { payload: stockId }) => {
      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];
        deleteStockFromGroup(group, stockId);
      }
    });
    builder.addCase(initUserData, (state, action) => {
      initGroupsWithData(state, { selectedGroupId: MAIN_GROUP_ID, ...action.payload.groups });
    });
    builder.addCase(resetUserData, () => groupsInitialState);
    builder.addCase(setBackupData, (state, action) => action.payload.groups);
  },
});

export const {
  updateSelectedGroupId,
  updateNextGroupId,
  addGroup,
  deleteGroup,
  initGroups,
  updateMainGroup,
  addSampleGroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
