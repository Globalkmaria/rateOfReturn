import { useState } from 'react';
import SignForm from '../../components/SignForm';
import { useFormChange } from '../../hooks/useFormChange';
import useLoginSubmit from './hooks/useLoginSubmit';

export type LoginInfoState = {
  username: string;
  password: string;
};

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfoState>(
    LOGIN_INFO_INITIAL_STATE,
  );
  const onChange = useFormChange<LoginInfoState>(setLoginInfo);
  const onSubmit = useLoginSubmit(loginInfo);

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
    />
  );
};

export default Login;

const LOGIN_INFO_INITIAL_STATE = {
  username: '',
  password: '',
};

const TITLE = 'Log in';
const TITLE_SUBTEXT = 'Welcome back!';
const SUBMIT_BTN_TITLE = 'Log in';
const GOOGLE_BTN_TITLE = 'Log in with Google';
const OTHER_OPTION_SUBTEXT = 'New user?';
const OTHER_OPTION_TITLE = 'Sign up';
const OTHER_OPTION_LINK = '/signup';
