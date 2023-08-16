import { useDispatch } from 'react-redux';
import userDataService from '../../../service/userData/userData';
import { initStockList } from '../../../features/stockList/stockListSlice';
import { initCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { initGroups } from '../../../features/groups/groupsSlice';
import { useEffect, useState } from 'react';

const useGetUserData = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getUserData = async () => {
    setLoading(true);
    const result = await userDataService.getUserData();

    if (!result) {
      alert('Something went wrong, please try again later.');
      return;
    }

    dispatch(initStockList(result.stocks));
    dispatch(initCheckedItems(result.checkedItems));
    dispatch(initGroups(result.groups));
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return { loading };
};

export default useGetUserData;
