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
