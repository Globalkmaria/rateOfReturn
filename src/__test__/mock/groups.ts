import { Group, Groups, GroupsState } from '../../features/groups/type';

export const GROUP: Group = {
  groupId: '2',
  groupName: 'Group1',
  stocks: {
    byId: {
      '1': ['1'],
      '2': ['3', '4'],
    },
    allIds: ['1', '2'],
  },
};

export const GROUPS_DATA: Groups = {
  byId: {
    '2': GROUP,
  },
  allIds: ['2'],
};

export const GROUPS_INFO: GroupsState = {
  groups: GROUPS_DATA,
  selectedGroupId: '1',
  nextGroupId: 3,
};
