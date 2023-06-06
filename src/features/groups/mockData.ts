import { GroupsState } from './type';

export const GROUPS_MOCK_DATA: GroupsState['groups'] = {
  byId: {
    '1': {
      groupId: '1',
      groupName: 'Main Group',
      stocks: {
        byId: {
          '1': ['2', '9'],
          '2': ['3', '4'],
          '3': ['6', '13'],
          '4': ['10', '14'],
        },
        allIds: ['1', '2', '3', '4'],
      },
    },
    '8': {
      groupId: '8',
      groupName: 'Gorup1',
      stocks: {
        byId: { '1': ['2', '9'], '2': ['3', '4'] },
        allIds: ['1', '2'],
      },
    },
    '9': {
      groupId: '9',
      groupName: 'Group2',
      stocks: {
        byId: { '1': ['2'], '2': ['3', '4'], '3': ['13'], '4': ['14'] },
        allIds: ['1', '2', '3', '4'],
      },
    },
    '10': {
      groupId: '10',
      groupName: 'Hello Group',
      stocks: {
        byId: { '1': ['2'], '2': ['3'], '3': ['6', '13'] },
        allIds: ['1', '2', '3'],
      },
    },
  },
  allIds: ['1', '8', '9', '10'],
};

export const GROUPS_MOCK_DATA_NEXT_GROUP_ID = 11;
