import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../../service/auth';
import FormInput from '../../components/form/Input';
import SignForm from '../../components/SignForm';
import {
  checkSignFormValidity,
  getEmailValidConfig,
  getPasswordValidConfig,
} from './helper';

export type SignupInfoState = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState<SignupInfoState>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async () => {
    const validity = checkSignFormValidity(signupInfo);
    if (!validity.isValid) {
      alert(validity.message);
      return;
    }

    const result = await authService.signup(
      signupInfo.username,
      signupInfo.password,
    );

    // TODO should add user to auth store
    if (result) {
      navigate('/');
      return;
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInfo({
      ...signupInfo,
      [e.target.name]: e.target.value,
    });
  };

  const emailValidConfig = getEmailValidConfig(signupInfo);
  const passwordValidConfig = getPasswordValidConfig(signupInfo);

  return (
    <SignForm
      onSubmit={onSubmit}
      onChange={onChange}
      title={TITLE}
      titleSubtext={TITLE_SUBTEXT}
      submitBtnTitle={SUBMIT_BTN_TITLE}
      googleBtnTitle={GOOGLE_BTN_TITLE}
      otherOptionSubtext={OTHER_OPTION_SUBTEXT}
      otherOptionTitle={OTHER_OPTION_TITLE}
      otherOptionLink={OTHER_OPTION_LINK}
      AdditionalFormInput={
        <ConfirmInput onChange={onChange} signupInfo={signupInfo} />
      }
      emailValidConfig={emailValidConfig}
      passwordValidConfig={passwordValidConfig}
    />
  );
};

export default Signup;

const TITLE = 'Get started';
const TITLE_SUBTEXT = 'Create your account';
const SUBMIT_BTN_TITLE = 'Sign up';
const GOOGLE_BTN_TITLE = 'Sign up with Google';
const OTHER_OPTION_SUBTEXT = 'Already have an account?';
const OTHER_OPTION_TITLE = 'Log in';
const OTHER_OPTION_LINK = '/login';

type ConfirmInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  signupInfo: SignupInfoState;
};

const ConfirmInput = ({ onChange, signupInfo }: ConfirmInputProps) => {
  const { password, confirmPassword } = signupInfo;
  const isValid = password === confirmPassword;
  const validPassword = confirmPassword.length > 0;

  const validText = validPassword
    ? isValid
      ? 'Matched!'
      : 'Check your password'
    : '';

  const validityConfig = {
    text: validText,
    isValid: isValid,
  };

  return (
    <FormInput
      labelText='Confirm Password'
      id='password-conform'
      placeholder='Confirm your password'
      type='password'
      className='form-input'
      name='confirmPassword'
      onChange={onChange}
      validityConfig={validityConfig}
      required
    />
  );
};
