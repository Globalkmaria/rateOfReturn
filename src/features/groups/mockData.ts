import { GroupsState } from './groupsSlice';

export const GROUPS_MOCK_DATA: GroupsState['groups'] = {
  byId: {
    '1': {
      groupId: '1',
      groupName: 'Main Group',
      stocks: {
        byId: {
          '1': ['1', '2'],
          '2': ['3', '4'],
        },
        allIds: ['1', '2'],
      },
    },
    '2': {
      groupId: '2',
      groupName: 'Group 2',
      stocks: {
        byId: {
          '1': ['1'],
          '2': ['3'],
        },
        allIds: ['1', '2'],
      },
    },
  },
  allIds: ['1', '2'],
};

export const GROUPS_MOCK_DATA_NEXT_GROUP_ID = 3;
