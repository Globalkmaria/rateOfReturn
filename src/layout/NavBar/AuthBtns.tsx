import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ContainedButton } from '../../components/Button';
import authService from '../../service/auth';
import { selectIsLoggedIn } from '../../features/user/selectors';
import { resetUser } from '../../features/user/userSlice';
import { cacheLoginPage, cacheSignupPage } from './utils';
import { resetUserData } from '@/features';
import { ContainedAnchor } from '@/components/Anchor';

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
        <>
          <ContainedAnchor
            to='/login'
            onMouseEnter={cacheLoginPage}
            size='s'
            mode='light'
            width={80}
          >
            Login
          </ContainedAnchor>
          <ContainedAnchor
            to='/signup'
            onMouseEnter={cacheSignupPage}
            size='s'
            width={80}
          >
            Sign up
          </ContainedAnchor>
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

  ${ContainedAnchor} {
    font-weight: 500;
  }
`;
