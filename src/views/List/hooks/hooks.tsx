import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initStockList } from '../../../features/stockList/stockListSlice';
import { initGroups } from '../../../features/groups/groupsSlice';
import { getInitialCheckedItemsInfo } from '../../../features/checkedItems/utils';
import { initCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectStockList } from '../../../features/stockList/selectors';
import { selectGroups } from '../../../features/groups/selectors';

export const useInitData = (setFirstLoad: (value: boolean) => void) => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);

  useEffect(() => {
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
    setFirstLoad(false);
  }, []);
};

export const useSaveChangedGroupsData = (firstLoad: boolean) => {
  const groups = useSelector(selectGroups);

  useEffect(() => {
    if (!firstLoad) localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups.groups]);
};

export const useSaveChangedStocksData = (firstLoad: boolean) => {
  const stockList = useSelector(selectStockList);

  useEffect(() => {
    if (!firstLoad)
      localStorage.setItem('stockList', JSON.stringify(stockList));
  }, [stockList]);
};
