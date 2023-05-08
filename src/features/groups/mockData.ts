import { Group } from './groupsSlice';

export const GROUPS_MOCK_DATA: Group[] = [
  {
    groupId: '1',
    groupName: 'ALL',
    stocks: [
      ['1', ['1', '2']],
      ['2', ['3', '4']],
    ],
  },
  {
    groupId: '2',
    groupName: 'Group 1',
    stocks: [
      ['1', ['2']],
      ['2', ['4']],
    ],
  },
];

export const GROUPS_MOCK_DATA_NEXT_GROUP_ID = 3;
