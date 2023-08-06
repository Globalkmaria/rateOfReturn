import { ChangeEvent, FormEvent, ReactElement } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { BorderButton, ContainedButton } from './Button';
import FormInput from './form/Input';
import Form from './form/form';
import { loginGoogleURL } from '../api/auth';
import { ValidityTextProps } from './form/ValidityText';

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

      <BorderButton size='m' fullWidth>
        <div className='google-btn'>
          <FcGoogle />
          <a className='google-btn__text' href={loginGoogleURL} role='button'>
            {googleBtnTitle}
          </a>
        </div>
      </BorderButton>

      <div className='other-option'>
        <span className='subtext'>{otherOptionSubtext}</span>
        <Link className='link' to={otherOptionLink}>
          {otherOptionTitle}
        </Link>
      </div>
    </StyledSignForm>
  );
};

export default SignForm;

const StyledSignForm = styled('div')`
  width: 400px;
  margin: 3rem auto;

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
`;
