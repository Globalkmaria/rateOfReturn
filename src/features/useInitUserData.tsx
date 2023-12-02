import { useDispatch } from 'react-redux';
import { initStockList } from './stockList/stockListSlice';
import { initCheckedItems } from './checkedItems/checkedItemsSlice';
import { initGroups } from './groups/groupsSlice';
import { UserDataServiceRes } from '../service/userData/type';
import { useCallback } from 'react';

const useInitUserData = () => {
  const dispatch = useDispatch();

  const initUserData = useCallback(
    (userData: UserDataServiceRes) => {
      dispatch(initStockList(userData.stocks));
      dispatch(initCheckedItems(userData.checkedItems));
      dispatch(initGroups(userData.groups));
    },
    [dispatch],
  );

  return initUserData;
};

export default useInitUserData;
