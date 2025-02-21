import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUsername } from '../features/user/userSlice';
import authService from '../service/auth';

export function useCheckMe() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMe = async () => {
      const result = await authService.me();
      if (!result) return;
      dispatch(setUsername(result.user.username));
    };

    checkMe();
  }, []);
}
