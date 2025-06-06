import { useMemo, useState } from 'react';

import ConfirmInput from './ConfirmInput';
import { getEmailValidConfig, getPasswordValidConfig } from './helper';
import { useSignupSubmit } from './hooks/useSignupSubmit';
import SignForm from '../../components/SignForm/SignForm';
import { useFormChange } from '../../hooks/useFormChange';

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
  const emailValidConfig = useMemo(
    () => getEmailValidConfig(signupInfo),
    [signupInfo.username],
  );
  const passwordValidConfig = useMemo(
    () => getPasswordValidConfig(signupInfo),
    [signupInfo.password, signupInfo.confirmPassword],
  );
  const confirmInput = useMemo(
    () => <ConfirmInput onChange={onChange} signupInfo={signupInfo} />,
    [onChange, signupInfo.confirmPassword, signupInfo.password],
  );

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
      AdditionalFormInput={confirmInput}
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
