import { ChangeEvent } from 'react';
import { SignupInfoState } from './Signup';
import FormInput from '../../components/form/Input';

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
      name='confirmPassword'
      onChange={onChange}
      validityConfig={validityConfig}
      required
    />
  );
};

export default ConfirmInput;
