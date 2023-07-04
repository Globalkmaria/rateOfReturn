import { MAIN_GROUP_ID } from './groupsSlice';
import { Group, GroupsState } from './type';

export const getNewGroupInfo = (
  groupId: string,
  groupName: string,
  stocks: Group['stocks'],
): Group => {
  return {
    groupId,
    groupName,
    stocks,
  };
};

export const validCheckGroupDelete = (state: GroupsState, groupId: string) => {
  const notMainGroup = groupId !== MAIN_GROUP_ID;
  const selectedGroup = state.groups.byId[groupId];
  return notMainGroup && selectedGroup;
};

export const deletePurchasedItemFromGroup = (
  group: Group,
  stockId: string,
  purchasedId: string,
) => {
  const purchasedIds = group.stocks.byId[stockId];
  if (!purchasedIds) return false;

  const purchasedIdx = purchasedIds.indexOf(purchasedId);
  if (purchasedIdx === -1) return false;

  purchasedIds.splice(purchasedIdx, 1);
  return true;
};

export const deleteStockFromGroup = (group: Group, stockId: string) => {
  if (!group.stocks.byId[stockId]) return;

  delete group.stocks.byId[stockId];
  const stockAllIdsInGroup = group.stocks.allIds;
  const stockIndex = stockAllIdsInGroup.indexOf(stockId);
  stockAllIdsInGroup.splice(stockIndex, 1);
};
