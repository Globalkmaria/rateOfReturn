import { GroupsState } from './type';

export const GROUPS_MOCK_DATA: GroupsState['groups'] = {
  byId: {
    '2': {
      groupId: '2',
      groupName: 'Group1',
      stocks: {
        byId: { '1': ['2', '9'], '2': ['3', '4'] },
        allIds: ['1', '2'],
      },
    },
    '3': {
      groupId: '3',
      groupName: 'Group2',
      stocks: {
        byId: { '1': ['2'], '2': ['3', '4'], '3': ['13'], '4': ['14'] },
        allIds: ['1', '2', '3', '4'],
      },
    },
    '4': {
      groupId: '4',
      groupName: 'Hello Group',
      stocks: {
        byId: { '1': ['2'], '2': ['3'], '3': ['6', '13'] },
        allIds: ['1', '2', '3'],
      },
    },
  },
  allIds: ['2', '3', '4'],
};

export const GROUPS_MOCK_DATA_NEXT_GROUP_ID = 5;
