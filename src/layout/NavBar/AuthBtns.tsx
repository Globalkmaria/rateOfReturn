import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ContainedButton } from '../../components/Button';
import authService from '../../service/auth';
import { selectIsLoggedIn } from '../../features/user/selectors';
import { resetUser } from '../../features/user/userSlice';
import { useResetUserData } from '../useResetUserData';
import { cacheLoginPage, cacheSignupPage } from './utils';

const AuthBtns = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const resetUserData = useResetUserData();

  const onLogout = async () => {
    await authService.logout();
    dispatch(resetUser());
    resetUserData();
    localStorage.clear();
  };

  return (
    <StyledAuthBtns>
      {isLoggedIn ? (
        <ContainedButton size='s' mode='light' width={80} onClick={onLogout}>
          Logout
        </ContainedButton>
      ) : (
        <>
          <Link to='/login' onMouseEnter={cacheLoginPage}>
            <ContainedButton as={'span'} size='s' mode='light' width={80}>
              Login
            </ContainedButton>
          </Link>
          <Link to='/signup' onMouseEnter={cacheSignupPage}>
            <ContainedButton as={'span'} size='s' width={80}>
              Sign up
            </ContainedButton>
          </Link>
        </>
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

  ${ContainedButton} {
    font-weight: 500;
  }
`;
