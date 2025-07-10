import styled from 'styled-components';

import SignupComponent from '@/views/Signup/Signup';

import { StyledPage } from './style';

const Signup = () => {
  return (
    <>
      <title>Sign up | ROR</title>
      <StyledSignup>
        <SignupComponent />
      </StyledSignup>
    </>
  );
};

export default Signup;
const StyledSignup = styled(StyledPage)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
