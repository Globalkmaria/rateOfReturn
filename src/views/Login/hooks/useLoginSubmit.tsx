import { useSetUserAndNavigate } from '../../../hooks/useSetUserAndNavigate';
import authService from '../../../service/auth';
import { LoginInfoState } from '../Login';

const useLoginSubmit = (loginInfo: LoginInfoState) => {
  const loginRedirect = useSetUserAndNavigate();

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

    if (!result) return;
    loginRedirect(result.user);
    return;
  };

  return onSubmit;
};

export default useLoginSubmit;
