import styled from 'styled-components/macro';
import LoginComponent from '../views/Login/Login';

const Login = () => {
  return (
    <StyledLogin>
      <LoginComponent />
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled('div')`
  min-height: calc(100vh - 141px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
