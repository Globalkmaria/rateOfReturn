import { ChangeEvent, FormEvent, ReactElement } from 'react';
import styled from 'styled-components/macro';
import { ContainedButton } from '../Button';
import FormInput from '../form/Input';
import Form from '../form/form';
import { ValidityTextProps } from '../form/ValidityText';
import { GoogleBtn, OtherOptions } from './components';
import { loginGoogleURL } from '../../api/auth';

type SignFormProps = {
  onSubmit: (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => void;
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
      <h1 className='title'>{title}</h1>
      <span className='subtext'>{titleSubtext}</span>

      <Form className='signup-form' onSubmit={onSubmit}>
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

        <ContainedButton
          type='submit'
          className='signup-btn'
          size='m'
          onClick={onSubmit}
        >
          {submitBtnTitle}
        </ContainedButton>
      </Form>
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

  .title {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  .subtext {
    color: ${({ theme }) => theme.colors.grey600};
  }

  .signup-form {
    margin: 3rem 0 1rem;
  }

  .signup-btn {
    margin-top: 1rem;
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    svg {
      font-size: 1.5rem;
    }

    .google-btn__text {
      font-weight: 500;
    }
  }

  .other-option {
    margin-top: 3rem;
    text-align: center;

    .link {
      margin-left: 0.5rem;
      text-decoration: underline;
    }
  }

  @media ${({ theme }) => theme.devices.mobile} {
    width: 70vw;
    min-width: 260px;

    .other-option {
      display: flex;
      flex-direction: column;
    }
  }
`;
