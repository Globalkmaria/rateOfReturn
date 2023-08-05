import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import authService from '../../service/auth';
import SignForm from '../../components/SignForm';

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });

  const onSubmit = async () => {
    if (loginInfo.username.length < 1) {
      alert('Please enter your email');
      return;
    }
    if (loginInfo.password.length < 1) {
      alert('Please enter your password');
      return;
    }

    const result = await authService.login(
      loginInfo.username,
      loginInfo.password,
    );

    // TODO should add user to auth store
    if (result) {
      navigate('/');
      return;
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

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

const TITLE = 'Log in';
const TITLE_SUBTEXT = 'Welcome back!';
const SUBMIT_BTN_TITLE = 'Log in';
const GOOGLE_BTN_TITLE = 'Log in with Google';
const OTHER_OPTION_SUBTEXT = 'New user?';
const OTHER_OPTION_TITLE = 'Sign up';
const OTHER_OPTION_LINK = '/signup';
