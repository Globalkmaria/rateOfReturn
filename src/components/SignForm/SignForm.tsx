import { ChangeEvent, FormEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../Button';
import FormInput from '../form/Input';
import Form from '../form/form';
import { ValidityTextProps } from '../form/ValidityText';
import { AuthSubmitButton, GoogleBtn, OtherOptions } from './components';
import { loginGoogleURL } from '../../api/auth';

type SignFormProps = {
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  titleSubtext: string;
  submitBtnTitle: string;
  googleBtnTitle: string;
  otherOptionSubtext: string;
  otherOptionTitle: string;
  otherOptionLink: string;
  AdditionalFormInput?: ReactElement;
  emailValidConfig?: ValidityTextProps;
  passwordValidConfig?: ValidityTextProps;
};

const SignForm = ({
  onSubmit,
  onChange,
  title,
  titleSubtext,
  submitBtnTitle,
  googleBtnTitle,
  otherOptionSubtext,
  otherOptionTitle,
  otherOptionLink,
  AdditionalFormInput,
  emailValidConfig,
  passwordValidConfig,
}: SignFormProps) => {
  return (
    <StyledSignForm>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubText>{titleSubtext}</StyledSubText>

      <StyledForm action={onSubmit}>
        <FormInput
          labelText='Email'
          id='email'
          placeholder='Enter your email address'
          type='email'
          name='username'
          onChange={onChange}
          validityConfig={emailValidConfig}
          required
        />
        <FormInput
          labelText='Password'
          id='password'
          placeholder='Enter your password'
          type='password'
          name='password'
          onChange={onChange}
          validityConfig={passwordValidConfig}
          required
        />
        {AdditionalFormInput}

        <AuthSubmitButton submitBtnTitle={submitBtnTitle} />
      </StyledForm>
      <GoogleBtn
        googleBtnTitle={googleBtnTitle}
        loginGoogleURL={loginGoogleURL}
      />
      <OtherOptions
        otherOptionSubtext={otherOptionSubtext}
        otherOptionTitle={otherOptionTitle}
        otherOptionLink={otherOptionLink}
      />
    </StyledSignForm>
  );
};

export default SignForm;

const StyledSignForm = styled('div')`
  width: 500px;
  padding: 20px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 70vw;
    min-width: 260px;
  }
`;

const StyledForm = styled(Form)`
  margin: 3rem 0 1rem;
`;

const StyledTitle = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

export const StyledSubText = styled.span`
  color: ${({ theme }) => theme.colors.grey600};
`;
