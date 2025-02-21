import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../features/user/selectors';
import { useInitWithLocalData } from '../views/List/hooks/hooks';
import useGetUserData from '../views/List/hooks/useGetUserData';

function useSyncUserData() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { getUserData } = useGetUserData();
  const initWithLocalData = useInitWithLocalData();

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    } else {
      initWithLocalData();
    }
  }, [isLoggedIn]);
}

export default useSyncUserData;
