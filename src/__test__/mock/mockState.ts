import { getInitialCheckedItemsInfo } from '@/features/checkedItems/utils';
import { SOLD_MOCK_DATA } from '@/features/solds';
import { USER_INITIAL_STATE } from '@/features/user/userSlice';

import { RootState } from '@/store';

import { GROUPS_INFO } from './groups';
import { NOTES_MOCK_DATA } from './notes';
import { STOCKS_STATE } from './stocks';

export const MOCK_STATE: RootState = {
  stockList: STOCKS_STATE,
  user: USER_INITIAL_STATE,
  groups: GROUPS_INFO,
  checkedItems: getInitialCheckedItemsInfo({
    data: STOCKS_STATE.stocks,
    value: true,
  }),
  solds: SOLD_MOCK_DATA,
  notes: NOTES_MOCK_DATA,
};
