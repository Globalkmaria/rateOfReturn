import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../features/user/selectors';
import useGetUserData from '../views/List/hooks/useGetUserData';
import { useInitWithLocalData } from '../views/List/hooks/hooks';
import { useMergeLocalData } from './useMergeLocalData';

function useSyncUserData() {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const mergeLocalData = useMergeLocalData();
  const { getUserData } = useGetUserData();
  const initWithLocalData = useInitWithLocalData();

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
      mergeLocalData();
    } else {
      initWithLocalData();
    }
  }, [isLoggedIn]);
}

export default useSyncUserData;
