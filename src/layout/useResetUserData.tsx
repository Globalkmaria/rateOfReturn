import { useDispatch } from 'react-redux';
import { restStockList } from '../features/stockList/stockListSlice';
import { resetCheckedItems } from '../features/checkedItems/checkedItemsSlice';
import { resetGroups } from '../features/groups/groupsSlice';

export function useResetUserData() {
  const dispatch = useDispatch();

  const resetUserData = () => {
    dispatch(restStockList());
    dispatch(resetCheckedItems());
    dispatch(resetGroups());
  };

  return resetUserData;
}
