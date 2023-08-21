import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../features/user/selectors';
import { openStockModal } from '../features/stockModal/stockModalSlice';
import { isLocalStorageEmpty } from '../utils/isLocalStorageEmpty';

export function useMergeLocalData() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn());

  const mergeLocalData = () => {
    if (!isLoggedIn || isLocalStorageEmpty()) return;
    dispatch(openStockModal({ modalName: 'MergeLocalDataModal' }));
  };

  return mergeLocalData;
}
