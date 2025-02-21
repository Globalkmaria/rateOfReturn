import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectStockList } from '../../../features/stockList/selectors';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import { setLocalStorageItem } from '../../../utils/getLocalStorage';

const useSaveChangedStocksData = (firstLoad: boolean) => {
  const stockList = useSelector(selectStockList);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) return;
    if (!firstLoad) setLocalStorageItem('stockList', stockList);
  }, [stockList, isLoggedIn]);
};

export default useSaveChangedStocksData;
