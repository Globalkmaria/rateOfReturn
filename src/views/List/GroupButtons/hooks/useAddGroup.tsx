import { useDispatch, useSelector } from 'react-redux';
import { selectCheckedPurchasedItems } from '../../../../features/checkedItems/selectors';
import { selectNextGroupId } from '../../../../features/groups/selectors';
import { changeCheckInfoToGroupFormat } from '../utils';
import { getNewGroupInfo } from '../../../../features/groups/utils';
import { getInitialCheckedItemsInfo } from '../../../../features/checkedItems/utils';
import {
  addGroup,
  updateNextGroupId,
} from '../../../../features/groups/groupsSlice';
import { initCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { closeStockModal } from '../../../../features/stockModal/stockModalSlice';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userGroupsService from '../../../../service/userGroups/userGroups';
import { selectStocks } from '../../../../features/stockList/selectors';

export function useAddGroup() {
  const dispatch = useDispatch();
  const stocks = useSelector(selectStocks);
  const checkedItems = useSelector(selectCheckedPurchasedItems());
  const isLogin = useSelector(selectIsLoggedIn());

  let nextGroupId = useSelector(selectNextGroupId);

  const onAddGroup = async (name: string) => {
    if (!name.trim().length) {
      alert('Group name is required');
      return;
    }

    const selectedStocks = changeCheckInfoToGroupFormat(checkedItems);
    if (selectedStocks.allIds.length === 0) {
      alert('Please select at least one stock');
      return;
    }

    if (isLogin) {
      const result = await userGroupsService.addNewUserGroup({
        group: {
          name: name,
          stocks: selectedStocks.byId,
        },
      });
      if (!result) return;

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

    dispatch(closeStockModal('AddGroupModal'));
  };

  return onAddGroup;
}
