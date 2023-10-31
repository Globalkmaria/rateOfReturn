import styled from 'styled-components/macro';
import SignupComponent from '../views/Signup/Signup';

const Signup = () => {
  return (
    <StyledSignup>
      <SignupComponent />
    </StyledSignup>
  );
};

export default Signup;
const StyledSignup = styled('div')`
  min-height: calc(100vh - 141px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.devices.tablet} {
    min-height: calc(100vh - 200px);
  }
`;
