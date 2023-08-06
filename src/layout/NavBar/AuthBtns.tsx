import styled from 'styled-components';
import { ContainedButton } from '../../components/Button';
import { Link } from 'react-router-dom';
import authService from '../../service/auth';
import { selectIsUserLoggedIn } from '../../features/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../features/user/userSlice';

const AuthBtns = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsUserLoggedIn());

  const onLogout = async () => {
    await authService.logout();
    dispatch(resetUser());
  };
  return (
    <StyledAuthBtns>
      {isLoggedIn ? (
        <ContainedButton size='s' mode='light' width={80} onClick={onLogout}>
          Logout
        </ContainedButton>
      ) : (
        <>
          <ContainedButton size='s' mode='light' width={80}>
            <Link to='/login'>Login</Link>
          </ContainedButton>
          <ContainedButton size='s' width={80}>
            <Link to='/signup'>Sign up</Link>
          </ContainedButton>
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
  width: 170px;

  ${ContainedButton} {
    font-weight: 500;
  }
`;
