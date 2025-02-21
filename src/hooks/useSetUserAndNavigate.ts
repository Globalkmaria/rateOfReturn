import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUsername } from '../features/user/userSlice';
import { LoginRepRes } from '../repository/auth/type';

export const useSetUserAndNavigate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (user: LoginRepRes['user']) => {
    dispatch(setUsername(user.username));
    navigate('/');
  };

  return handleLogin;
};
