import { useState } from 'react';
import { useSelector } from 'react-redux';

import userDataService from '../../../service/userData/userData';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import useInitUserData from '../../../features/useInitUserData';

const useGetUserData = () => {
  const isLoggingIn = useSelector(selectIsLoggedIn);
  const [loading, setLoading] = useState(false);
  const initUserData = useInitUserData();

  const getUserData = async () => {
    setLoading(true);

    if (!isLoggingIn) {
      setLoading(false);
      return;
    }
    const result = await userDataService.getUserData();

    if (!result) {
      alert('Something went wrong, please try again later.');
      return;
    }

    initUserData(result);

    setLoading(false);
  };

  return { loading, getUserData };
};

export default useGetUserData;
