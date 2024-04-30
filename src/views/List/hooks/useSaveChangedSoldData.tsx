import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../features/user/selectors';
import { setLocalStorageItem } from '../../../utils/getLocalStorage';
import { selectSolds } from '@/features/solds';

const useSaveChangedSoldsData = (firstLoad: boolean) => {
  const solds = useSelector(selectSolds);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) return;
    if (!firstLoad) setLocalStorageItem('solds', solds);
  }, [solds, isLoggedIn]);
};

export default useSaveChangedSoldsData;
