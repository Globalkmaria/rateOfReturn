import { FormEvent } from 'react';
import { LoginInfoState } from '../Login';
import authService from '../../../service/auth';
import { useSetUserAndNavigate } from '../../../hooks/useSetUserAndNavigate';

const useLoginSubmit = (loginInfo: LoginInfoState) => {
  const loginRedirect = useSetUserAndNavigate();

  const onSubmit = async (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
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

    if (!result) return;
    loginRedirect(result.user);
    return;
  };

  return onSubmit;
};

export default useLoginSubmit;
