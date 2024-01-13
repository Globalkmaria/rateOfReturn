import { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';

import { BorderButton } from '../Button';
import { StyledSubText } from './SignForm';

type OtherOptionsProps = {
  otherOptionSubtext: string;
  otherOptionTitle: string;
  otherOptionLink: string;
};

export const OtherOptions = memo(function OtherOptions({
  otherOptionSubtext,
  otherOptionTitle,
  otherOptionLink,
}: OtherOptionsProps) {
  return (
    <StyledOtherOptions>
      <StyledSubText>{otherOptionSubtext}</StyledSubText>
      <StyledLink to={otherOptionLink}>{otherOptionTitle}</StyledLink>
    </StyledOtherOptions>
  );
});

const StyledOtherOptions = styled.div`
  margin-top: 3rem;
  text-align: center;

  @media ${({ theme }) => theme.devices.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  margin-left: 0.5rem;
  text-decoration: underline;
`;

type GoogleBtnProps = {
  googleBtnTitle: string;
  loginGoogleURL: string;
};

export const GoogleBtn = memo(function GoogleBtn({ loginGoogleURL, googleBtnTitle }: GoogleBtnProps) {
  return (
    <BorderButton size='m' fullWidth>
      <StyledContent>
        <FcGoogle />
        <StyledText href={loginGoogleURL} role='button'>
          {googleBtnTitle}
        </StyledText>
      </StyledContent>
    </BorderButton>
  );
});

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 1.5rem;
  }
`;

const StyledText = styled.a`
  font-weight: 500;
`;
