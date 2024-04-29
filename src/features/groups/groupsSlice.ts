import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GROUPS_MOCK_DATA, GROUPS_MOCK_DATA_NEXT_GROUP_ID } from './mockData';
import { GroupsState, UpdateMainGroupPayload } from './type';
import {
  deletePurchasedItemFromGroup,
  deleteStockFromGroup,
  initGroupsWithData,
  validCheckGroupDelete,
} from './utils';
import {
  addGroup,
  addSampleData,
  deletePurchasedItem,
  deleteStock,
  initUserData,
  resetUserData,
  setBackupData,
} from '@/features';
import { addNewSold } from '../solds';

export const MAIN_GROUP_ID = '1';

export const GROUP_INITIAL_STATE: GroupsState = {
  groups: {
    byId: {},
    allIds: [],
  },
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: 2,
};
const INITIAL_STATE_WITH_SAMPLE: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: GROUPS_MOCK_DATA_NEXT_GROUP_ID,
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: INITIAL_STATE_WITH_SAMPLE,
  reducers: {
    initGroups: (
      state,
      action: PayloadAction<Omit<GroupsState, 'selectedGroupId'>>,
    ) => {
      initGroupsWithData(state, {
        selectedGroupId: MAIN_GROUP_ID,
        ...action.payload,
      });
    },

    updateSelectedGroupId: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
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

    deleteGroup: (state, action: PayloadAction<string>) => {
      const groupId = action.payload;
      if (!validCheckGroupDelete(state, groupId)) return;

      const selectedGroupIndex = state.groups.allIds.indexOf(groupId);
      delete state.groups.byId[groupId];
      state.groups.allIds.splice(selectedGroupIndex, 1);

      if (state.selectedGroupId === groupId)
        state.selectedGroupId = MAIN_GROUP_ID;
    },
  },
  extraReducers(builder) {
    builder.addCase(deletePurchasedItem, (state, { payload }) => {
      const { stockId, purchasedId } = payload;

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
    });
    builder.addCase(deleteStock, (state, { payload: stockId }) => {
      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];
        deleteStockFromGroup(group, stockId);
      }
    });
    builder.addCase(initUserData, (state, action) => {
      initGroupsWithData(state, {
        selectedGroupId: MAIN_GROUP_ID,
        ...action.payload.groups,
      });
    });
    builder.addCase(resetUserData, () => GROUP_INITIAL_STATE);
    builder.addCase(setBackupData, (state, action) => action.payload.groups);
    builder.addCase(addGroup, (state, action) => {
      const { groupInfo } = action.payload;
      state.groups.byId[groupInfo.groupId] = groupInfo;
      state.groups.allIds.push(groupInfo.groupId);

      state.selectedGroupId = groupInfo.groupId;
      state.nextGroupId += 1;
    });
    builder.addCase(addSampleData, () => INITIAL_STATE_WITH_SAMPLE);
    builder.addCase(addNewSold, (state, action) => {
      const { soldInfo, stockId } = action.payload;
      for (const groupId of state.groups.allIds) {
        const group = state.groups.byId[groupId];

        const isDeleted = deletePurchasedItemFromGroup(
          group,
          stockId,
          soldInfo.purchasedId,
        );
        if (!isDeleted) continue;

        const emptyPurchasedItems = !group.stocks.byId[stockId].length;
        if (emptyPurchasedItems) deleteStockFromGroup(group, stockId);
      }
    });
  },
});

export const {
  updateSelectedGroupId,
  deleteGroup,
  initGroups,
  updateMainGroup,
} = groupsSlice.actions;
export default groupsSlice.reducer;
