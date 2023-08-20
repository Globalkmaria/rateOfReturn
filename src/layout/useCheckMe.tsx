import { useEffect } from 'react';
import authService from '../service/auth';
import { useDispatch } from 'react-redux';
import { setUsername } from '../features/user/userSlice';

export function useCheckMe() {
  const dispatch = useDispatch();
  const checkMe = async () => {
    const result = await authService.me();
    if (!result) return;
    dispatch(setUsername(result.user.username));
  };

  useEffect(() => {
    checkMe();
  }, []);
}
