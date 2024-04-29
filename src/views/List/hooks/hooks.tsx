import { useDispatch, useSelector } from 'react-redux';

import { initStockList } from '../../../features/stockList/stockListSlice';
import { initGroups } from '../../../features/groups/groupsSlice';
import { getInitialCheckedItemsInfo } from '../../../features/checkedItems/utils';
import { initCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectStockList } from '../../../features/stockList/selectors';
import { getLocalStorageItem } from '../../../utils/getLocalStorage';
import { initSolds } from '@/features/solds';

export const useInitWithLocalData = () => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);

  const initData = () => {
    const localStock = getLocalStorageItem('stockList');
    localStock && dispatch(initStockList(localStock));

    const localGroups = getLocalStorageItem('groups');
    localGroups && dispatch(initGroups(localGroups));

    const localSolds = getLocalStorageItem('solds');
    localSolds && dispatch(initSolds(localSolds));

    const stocks = localStock?.stocks || stockList.stocks;
    const checkedItemsInfo = getInitialCheckedItemsInfo({
      data: stocks,
      value: true,
    });
    dispatch(initCheckedItems(checkedItemsInfo));
  };
  return initData;
};
