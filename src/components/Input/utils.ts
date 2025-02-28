import { ChangeEvent } from 'react';

import { removeComma } from '@/utils';

import { InputType, InputValidation, TransformedValue } from './BaseInput';

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
    const num = Number(value[i]);
    if (num === 0) continue;
    if (!isNaN(num)) {
      validStart = i;
      break;
    }
  }

  let validEnd = value.length - 1;
  for (let i = value.length - 1; i >= 0; i--) {
    const num = Number(value[i]);
    if (!isNaN(num)) {
      validEnd = i;
      break;
    }
  }

  return value.slice(validStart, validEnd + 1);
};

const trimDecimalInsertPaste = (
  value: string,
  validation: (value: string) => boolean,
): TransformedValue => {
  const cleanedValue = removeInvalidedEdgeChars(value);
  const commaRemovedValue = removeComma(cleanedValue);

  const numValue = Number(commaRemovedValue);
  if (isNaN(numValue)) return null;

  const isValid = validation(numValue.toString());
  if (!isValid) return null;

  const localValue = getLocalString(commaRemovedValue);

  return [localValue, numValue];
};

const trimDecimalInsertText = (
  value: string,
  validation: InputValidation,
): TransformedValue => {
  const validDots = checkValidDots(value);
  if (!validDots) return null;

  const commaRemovedValue = removeComma(value);

  const numValue = Number(commaRemovedValue);
  if (isNaN(numValue)) return null;

  const isValid = validation(numValue.toString());
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
    return trimDecimalInsertPaste(value, validation);
  }

  return trimDecimalInsertText(value, validation);
};

const trimNumberInsertPaste = (
  value: string,
  validation: (value: string) => boolean,
): TransformedValue => {
  const cleanedValue = removeInvalidedEdgeChars(value);
  const commaRemovedValue = removeComma(cleanedValue);

  const numValue = Number(commaRemovedValue);
  if (isNaN(numValue)) return null;

  const isValid = validation(numValue.toString());
  if (!isValid) return null;

  const localValue = numValue.toLocaleString();

  return [localValue, numValue];
};

const trimNumberInsertText = (
  value: string,
  validation: InputValidation,
): TransformedValue => {
  const commaRemovedValue = removeComma(value);

  const numValue = Number(commaRemovedValue);
  if (isNaN(numValue)) return null;

  const isValid = validation(numValue.toString());
  if (!isValid) return null;

  const localValue = numValue.toLocaleString();

  return [localValue, numValue];
};

const handleNumberChange = (
  e: ChangeEvent<HTMLInputElement>,
  validation: InputValidation,
): TransformedValue => {
  const value = e.target.value;
  if (value === '') return ['', 0];

  const inputType = (e.nativeEvent as InputEvent).inputType;

  if (inputType === 'insertFromPaste') {
    return trimNumberInsertPaste(value, validation);
  }

  return trimNumberInsertText(value, validation);
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
    case 'number':
      return handleNumberChange(e, validation);
    default:
      return handleChange(e, validation);
  }
};
