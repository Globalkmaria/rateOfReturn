import { SignupInfoState } from './Signup';
import { checkFieldValidity, getFieldValidConfig } from './fieldValidator';

export const getEmailValidConfig = (state: SignupInfoState) => {
  return getFieldValidConfig({ type: 'email', value: state.username });
};

export const getPasswordValidConfig = (state: SignupInfoState) => {
  return getFieldValidConfig({ type: 'password', value: state.password });
};

export const checkSignFormValidity = (
  state: SignupInfoState,
): { isValid: boolean; message: string } => {
  const emailValidResult = checkFieldValidity({
    type: 'email',
    value: state.username,
  });
  if (!emailValidResult.isValid) return emailValidResult;

  const passwordValidResult = checkFieldValidity({
    type: 'password',
    value: state.password,
  });
  if (!passwordValidResult.isValid) return passwordValidResult;

  const passwordMatched = state.password === state.confirmPassword;
  if (!passwordMatched)
    return { isValid: false, message: 'Passwords do not match' };

  return { isValid: true, message: '' };
};
