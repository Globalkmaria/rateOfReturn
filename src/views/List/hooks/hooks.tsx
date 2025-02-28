import { useDispatch, useSelector } from 'react-redux';

import { initNotes } from '@/features/notes';
import { initSolds } from '@/features/solds';

import { initCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { getInitialCheckedItemsInfo } from '../../../features/checkedItems/utils';
import { initGroups } from '../../../features/groups/groupsSlice';
import { selectStockList } from '../../../features/stockList/selectors';
import { initStockList } from '../../../features/stockList/stockListSlice';
import { getLocalStorageItem } from '../../../utils/getLocalStorage';

export const useInitWithLocalData = () => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);

  const initData = () => {
    const localStock = getLocalStorageItem('stockList');
    if (localStock) dispatch(initStockList(localStock));

    const localGroups = getLocalStorageItem('groups');
    if (localGroups) dispatch(initGroups(localGroups));

    const localSolds = getLocalStorageItem('solds');
    if (localSolds) dispatch(initSolds(localSolds));

    const localNotes = getLocalStorageItem('notes');
    if (localNotes) dispatch(initNotes(localNotes));

    const stocks = localStock?.stocks || stockList.stocks;
    const checkedItemsInfo = getInitialCheckedItemsInfo({
      data: stocks,
      value: true,
    });
    dispatch(initCheckedItems(checkedItemsInfo));
  };
  return initData;
};
