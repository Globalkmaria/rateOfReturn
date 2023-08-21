import { GroupsState } from '../features/groups/type';
import {
  ReplaceUserDataRepReq,
  UserGroup,
  UserGroups,
} from '../repository/userData/type';

const formatGroupAsServerFormat = (
  groups: GroupsState,
): ReplaceUserDataRepReq['groups'] | null => {
  if (!groups?.groups?.byId) return null;

  const formattedGroups: UserGroups = {};
  for (const groupId in groups.groups.byId) {
    const group = groups.groups.byId[groupId];
    const { groupName, stocks } = group;
    const formattedGroup: UserGroup = {
      id: groupId,
      name: groupName,
      stocks: stocks.byId,
    };

    formattedGroups[groupId] = formattedGroup;
  }
  return { groups: formattedGroups, nextGroupId: groups.nextGroupId };
};

export default formatGroupAsServerFormat;
