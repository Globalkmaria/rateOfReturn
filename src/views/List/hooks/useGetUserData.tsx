import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userDataService from '../../../service/userData/userData';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import { initUserData } from '../../../features/actions';

const useGetUserData = () => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector(selectIsLoggedIn);
  const [loading, setLoading] = useState(false);

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

    dispatch(initUserData(result));
    setLoading(false);
  };

  return { loading, getUserData };
};

export default useGetUserData;
