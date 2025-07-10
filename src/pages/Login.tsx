import styled from 'styled-components';

import { StyledPage } from './style';
import LoginComponent from '../views/Login/Login';

const Login = () => {
  return (
    <>
      <title>Log in | ROR</title>
      <StyledLogin>
        <LoginComponent />
      </StyledLogin>
    </>
  );
};

export default Login;

const StyledLogin = styled(StyledPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
