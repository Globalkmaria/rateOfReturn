import { z } from 'zod';

interface FieldValidParams {
  type: keyof typeof schema;
  value: string;
}

interface FieldValidConfig {
  isValid: boolean;
  text: string;
}

interface checkValidityResult {
  isValid: boolean;
  message: string;
}

const emailValidSchema = z
  .string({
    required_error: 'Email is required',
  })
  .trim()
  .email('Please enter a valid email address')
  .max(30, 'Email must be at most 30 characters long');

const passwordValidSchema = z
  .string({
    required_error: 'Password is required',
  })
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(20, { message: 'Password must be at most 20 characters long' });

const schema = {
  email: emailValidSchema,
  password: passwordValidSchema,
};

export const checkFieldValidity = ({ type, value }: FieldValidParams): checkValidityResult => {
  const result = schema[type].safeParse(value);
  return {
    isValid: result.success,
    message: result.success ? '' : result.error.issues[0].message,
  };
};

export const getFieldValidConfig = ({ type, value }: FieldValidParams): FieldValidConfig => {
  if (!value.length) return { isValid: true, text: '' };

  const { isValid, message } = checkFieldValidity({ type, value });
  if (!isValid) return { isValid, text: message };

  return { isValid, text: 'Valid' };
};
