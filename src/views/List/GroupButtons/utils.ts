import { Group, GroupsState } from '../../../features/groups/type';

export const getOptions = (groups: GroupsState) => {
  return groups.groups.allIds.map((groupId) => {
    return {
      value: groupId,
      label: groups.groups.byId[groupId].groupName,
    };
  });
};

export const changeCheckInfoToGroupFormat = (
  checkInfo: {
    stockId: string;
    purchasedId: string;
  }[],
): Group['stocks'] => {
  const stocks: Group['stocks']['byId'] = {};
  const allIds = new Set<string>();
  for (const { stockId, purchasedId } of checkInfo) {
    if (!stocks[stockId]) {
      stocks[stockId] = [];
    }
    stocks[stockId].push(purchasedId);
    allIds.add(stockId);
  }

  return { byId: stocks, allIds: Array.from(allIds) };
};
