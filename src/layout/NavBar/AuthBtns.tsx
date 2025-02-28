import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { resetUserData } from '@/features';

import Personal from './Personal';
import { ContainedButton } from '../../components/Button';
import { selectIsLoggedIn } from '../../features/user/selectors';
import { resetUser } from '../../features/user/userSlice';
import authService from '../../service/auth';

const AuthBtns = () => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onLogout = async () => {
    await authService.logout();
    dispatch(resetUser());
    dispatch(resetUserData());
    localStorage.clear();
    router('/');
  };

  return (
    <StyledAuthBtns>
      {isLoggedIn ? (
        <ContainedButton size='s' mode='light' width={80} onClick={onLogout}>
          Logout
        </ContainedButton>
      ) : (
        <Personal />
      )}
    </StyledAuthBtns>
  );
};

export default AuthBtns;

const StyledAuthBtns = styled('div')`
  display: flex;
  justify-content: end;
  gap: 10px;
  grid-area: auth-btns;
`;
