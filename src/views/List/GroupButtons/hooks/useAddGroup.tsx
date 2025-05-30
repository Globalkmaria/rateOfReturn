import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addGroup } from '@/features';

import { selectCheckedPurchasedItems } from '../../../../features/checkedItems/selectors';
import { getInitialCheckedItemsInfo } from '../../../../features/checkedItems/utils';
import { selectNextGroupId } from '../../../../features/groups/selectors';
import { getNewGroupInfo } from '../../../../features/groups/utils';
import { selectStocks } from '../../../../features/stockList/selectors';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userGroupsService from '../../../../service/userGroups/userGroups';
import { changeCheckInfoToGroupFormat } from '../utils';

export function useAddGroup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    dispatch(
      addGroup({ groupInfo: newGroupInfo, checkedItems: initCheckedItemsInfo }),
    );

    navigate(`groups/${nextGroupId}`);
    return true;
  };

  return onAddGroup;
}
