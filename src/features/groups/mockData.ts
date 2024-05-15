import { GroupsState } from './type';

export const MAIN_GROUP_ID = '1';

export const GROUPS_MOCK_DATA: GroupsState['groups'] = {
  byId: {
    '2': {
      groupId: '2',
      groupName: 'stocks',
      stocks: {
        byId: {
          '2': ['2', '3'],
          '15': ['15', '16'],
          '22': ['22'],
          '23': ['23'],
          '29': ['29', '30', '32'],
        },
        allIds: ['2', '15', '22', '23', '29'],
      },
    },
  },
  allIds: ['2'],
};

export const GROUPS_MOCK_DATA_NEXT_GROUP_ID = 4;

export const GROUP_STATE_SAMPLE: GroupsState = {
  groups: GROUPS_MOCK_DATA,
  selectedGroupId: MAIN_GROUP_ID,
  nextGroupId: GROUPS_MOCK_DATA_NEXT_GROUP_ID,
};
