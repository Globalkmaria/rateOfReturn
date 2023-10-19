import styled from 'styled-components';
import { ContainedButton } from '../../components/Button';
import { Link } from 'react-router-dom';
import authService from '../../service/auth';
import { selectIsLoggedIn } from '../../features/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../features/user/userSlice';
import { useResetUserData } from '../useResetUserData';

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
          <Link to='/login'>
            <ContainedButton size='s' mode='light' width={80}>
              Login
            </ContainedButton>
          </Link>
          <Link to='/signup'>
            <ContainedButton size='s' width={80}>
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
