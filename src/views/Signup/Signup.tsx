import { useState } from 'react';
import SignForm from '../../components/SignForm';
import { useFormChange } from '../../hooks/useFormChange';
import { getEmailValidConfig, getPasswordValidConfig } from './helper';
import { useSignupSubmit } from './hooks/useSignupSubmit';
import ConfirmInput from './ConfirmInput';

export type SignupInfoState = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState<SignupInfoState>(
    SIGNUP_INFO_INITIAL_STATE,
  );
  const onChange = useFormChange<SignupInfoState>(setSignupInfo);
  const onSubmit = useSignupSubmit(signupInfo);
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

const SIGNUP_INFO_INITIAL_STATE = {
  username: '',
  password: '',
  confirmPassword: '',
};

const TITLE = 'Get started';
const TITLE_SUBTEXT = 'Create your account';
const SUBMIT_BTN_TITLE = 'Sign up';
const GOOGLE_BTN_TITLE = 'Sign up with Google';
const OTHER_OPTION_SUBTEXT = 'Already have an account?';
const OTHER_OPTION_TITLE = 'Log in';
const OTHER_OPTION_LINK = '/login';
