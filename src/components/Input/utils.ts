import { ChangeEvent } from 'react';
import { InputType, InputValidation, TransformedValue } from './BaseInput';
import { removeComma } from '@/utils';

const checkValidDots = (value: string) => {
  if (value[0] === '.') return false;

  const dots = value.split('.').length - 1;
  return dots <= 1;
};

const getLocalString = (commaRemovedValue: string) => {
  if (commaRemovedValue.includes('.')) {
    const [integer, decimal = ''] = commaRemovedValue.split('.');
    return `${Number(integer).toLocaleString()}.${decimal}`;
  }

  return Number(commaRemovedValue).toLocaleString();
};

const removeInvalidedEdgeChars = (value: string) => {
  value = value.trim();

  let validStart = 0;
  for (let i = 0; i < value.length; i++) {
    if (!isNaN(Number(value[i]))) {
      validStart = i;
      break;
    }
  }

  let validEnd = value.length - 1;
  for (let i = value.length - 1; i >= 0; i--) {
    if (!isNaN(Number(value[i]))) {
      validEnd = i;
      break;
    }
  }

  return value.slice(validStart, validEnd + 1);
};

const trimInsertPaste = (
  value: string,
  validation: (value: any) => boolean,
): TransformedValue => {
  const cleanedValue = removeInvalidedEdgeChars(value);
  const commaRemovedValue = removeComma(cleanedValue);

  const numValue = Number(commaRemovedValue);
  if (isNaN(numValue)) return null;

  const isValid = validation(numValue);
  if (!isValid) return null;

  const localValue = getLocalString(commaRemovedValue);

  return [localValue, numValue];
};

const trimInsertText = (
  value: string,
  validation: InputValidation,
): TransformedValue => {
  const validDots = checkValidDots(value);
  if (!validDots) return null;

  const commaRemovedValue = removeComma(value);

  const numValue = Number(commaRemovedValue);
  if (isNaN(numValue)) return null;

  const isValid = validation(numValue);
  if (!isValid) return null;

  const localValue = getLocalString(commaRemovedValue);

  return [localValue, numValue];
};

const handleDecimalChange = (
  e: ChangeEvent<HTMLInputElement>,
  validation: InputValidation,
): TransformedValue => {
  const value = e.target.value;
  if (value === '') return ['', 0];

  const inputType = (e.nativeEvent as InputEvent).inputType;

  if (inputType === 'insertFromPaste') {
    return trimInsertPaste(value, validation);
  }

  return trimInsertText(value, validation);
};

const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  validation: InputValidation,
) => {
  const isValid = validation(e.target.value);
  if (!isValid) return null;
  return e.target.value;
};

export const getTransformedValue = (
  e: ChangeEvent<HTMLInputElement>,
  validation: InputValidation,
  type: InputType,
): TransformedValue => {
  switch (type) {
    case 'decimal':
      return handleDecimalChange(e, validation);

    default:
      return handleChange(e, validation);
  }
};
