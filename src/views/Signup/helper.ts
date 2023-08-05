import { z } from 'zod';

import { SignupInfoState } from './Signup';

const emailValidSchema = z
  .string({
    required_error: 'Email is required',
  })
  .trim()
  .email('Please enter a valid email address');

const passwordValidSchema = z
  .string({
    required_error: 'Password is required',
  })
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long' });

export const checkSignFormValidity = (state: SignupInfoState) => {
  const emailValidResult = emailValidSchema.safeParse(state.username);
  const passwordValidResult = passwordValidSchema.safeParse(state.password);
  const passwordMatched = state.password === state.confirmPassword;

  const message =
    (!emailValidResult.success && emailValidResult.error.issues[0].message) ||
    (!passwordValidResult.success &&
      passwordValidResult.error.issues[0].message) ||
    (!passwordMatched && 'Please check Confirm Password');

  return {
    isValid: message === undefined,
    message,
  };
};

export const getEmailValidConfig = (formInfo: SignupInfoState) => {
  const emailValidResult = emailValidSchema.safeParse(formInfo.username);

  const emailMessage = formInfo.username.length
    ? emailValidResult.success
      ? 'Valid'
      : emailValidResult.error.issues[0].message
    : '';

  return {
    isValid: emailValidResult.success,
    text: emailMessage,
  };
};

export const getPasswordValidConfig = (formInfo: SignupInfoState) => {
  const passwordValidResult = passwordValidSchema.safeParse(formInfo.password);

  const passwordMessage = formInfo.password.length
    ? passwordValidResult.success
      ? 'Valid'
      : passwordValidResult.error.issues[0].message
    : '';

  return {
    isValid: passwordValidResult.success,
    text: passwordMessage,
  };
};
