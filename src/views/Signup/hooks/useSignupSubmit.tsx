import { FormEvent } from 'react';
import { useSetUserAndNavigate } from '../../../hooks/useSetUserAndNavigate';
import authService from '../../../service/auth';
import { checkSignFormValidity } from '../helper';
import { SignupInfoState } from '../Signup';

export const useSignupSubmit = (signupInfo: SignupInfoState) => {
  const loginRedirect = useSetUserAndNavigate();
  const onSubmit = async (
    e: FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const validity = checkSignFormValidity(signupInfo);
    if (!validity.isValid) {
      alert(validity.message);
      return;
    }

    const result = await authService.signup(
      signupInfo.username,
      signupInfo.password,
    );

    if (!result) return;
    loginRedirect(result.user);
  };

  return onSubmit;
};
