import { RootState } from '@/store';
import { STOCKS_STATE } from './stocks';
import { USER_INITIAL_STATE } from '@/features/user/userSlice';
import { GROUPS_INFO } from './groups';
import { getInitialCheckedItemsInfo } from '@/features/checkedItems/utils';

export const MOCK_STATE: RootState = {
  stockList: STOCKS_STATE,
  user: USER_INITIAL_STATE,
  groups: GROUPS_INFO,
  checkedItems: getInitialCheckedItemsInfo({
    data: STOCKS_STATE.stocks,
    value: true,
  }),
};
