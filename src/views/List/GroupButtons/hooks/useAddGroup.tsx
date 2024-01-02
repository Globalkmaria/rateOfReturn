import { useDispatch, useSelector } from 'react-redux';

import { selectCheckedPurchasedItems } from '../../../../features/checkedItems/selectors';
import { selectNextGroupId } from '../../../../features/groups/selectors';
import { getNewGroupInfo } from '../../../../features/groups/utils';
import { getInitialCheckedItemsInfo } from '../../../../features/checkedItems/utils';
import { addGroup, updateNextGroupId } from '../../../../features/groups/groupsSlice';
import { initCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userGroupsService from '../../../../service/userGroups/userGroups';
import { selectStocks } from '../../../../features/stockList/selectors';
import { changeCheckInfoToGroupFormat } from '../utils';

export function useAddGroup() {
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);
  const checkedItems = useSelector(selectCheckedPurchasedItems);
  const isLogin = useSelector(selectIsLoggedIn);

  let nextGroupId = useSelector(selectNextGroupId);

  const onAddGroup = async (name: string): Promise<boolean> => {
    if (!name.trim().length) {
      alert('Group name is required');
      return false;
    }

    const selectedStocks = changeCheckInfoToGroupFormat(checkedItems);
    if (selectedStocks.allIds.length === 0) {
      alert('Please select at least one stock');
      return false;
    }

    if (isLogin) {
      const result = await userGroupsService.addNewUserGroup({
        group: {
          name: name,
          stocks: selectedStocks.byId,
        },
      });
      if (!result) return false;

      nextGroupId = result.groupId;
    }

    const newGroupInfo = getNewGroupInfo(nextGroupId, name, selectedStocks);
    const initCheckedItemsInfo = getInitialCheckedItemsInfo({
      data: stocks,
      value: true,
    });

    dispatch(addGroup({ groupInfo: newGroupInfo, groupId: nextGroupId }));
    dispatch(initCheckedItems(initCheckedItemsInfo));
    dispatch(updateNextGroupId());

    return true;
  };

  return onAddGroup;
}
