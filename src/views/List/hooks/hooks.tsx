import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initStockList } from '../../../features/stockList/stockListSlice';
import { initGroups } from '../../../features/groups/groupsSlice';
import { getInitialCheckedItemsInfo } from '../../../features/checkedItems/utils';
import { initCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectStockList } from '../../../features/stockList/selectors';
import { selectGroups } from '../../../features/groups/selectors';
import { selectIsLoggedIn } from '../../../features/user/selectors';

export const useInitWithLocalData = () => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);

  const initData = () => {
    const localStock = localStorage.getItem('stockList');
    const localGroups = localStorage.getItem('groups');
    localStock && dispatch(initStockList(JSON.parse(localStock)));
    localGroups && dispatch(initGroups(JSON.parse(localGroups)));

    const stocks = localStock
      ? JSON.parse(localStock).stocks
      : stockList.stocks;
    const checkedItemsInfo = getInitialCheckedItemsInfo({
      data: stocks,
      value: true,
    });
    dispatch(initCheckedItems(checkedItemsInfo));
  };
  return initData;
};

export const useSaveChangedGroupsData = (firstLoad: boolean) => {
  const groups = useSelector(selectGroups);
  const isLoggedIn = useSelector(selectIsLoggedIn());

  useEffect(() => {
    if (isLoggedIn) return;
    if (!firstLoad) localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups.groups, isLoggedIn]);
};

export const useSaveChangedStocksData = (firstLoad: boolean) => {
  const stockList = useSelector(selectStockList);
  const isLoggedIn = useSelector(selectIsLoggedIn());

  useEffect(() => {
    if (isLoggedIn) return;
    if (!firstLoad)
      localStorage.setItem('stockList', JSON.stringify(stockList));
  }, [stockList, isLoggedIn]);
};
