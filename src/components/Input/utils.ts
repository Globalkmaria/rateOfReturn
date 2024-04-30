import { INPUT_TYPES, TransformedValue } from './BaseInput';

export const changeTransformValue = (
  type: (typeof INPUT_TYPES)[number],
  value: string,
  prevValue: string,
): TransformedValue => {
  switch (type) {
    case 'number':
      const checkMaxDotToBeOne = value
        .replace(/\.{1,}/g, '.')
        .replace(/[^\.]/g, '').length;
      if (checkMaxDotToBeOne > 1) return null;

      const [integer, decimal] = value
        .replace(/\.{1,}/g, '.')
        .replace(/\s/g, '')
        .split('.');

      const num = Number(integer.replaceAll(',', ''));

      const isValid = !isNaN(num) && !isNaN(Number(decimal || 0));
      if (!isValid) return null;
      const noDot = decimal === undefined;

      const localValue = num.toLocaleString() + (noDot ? '' : `.${decimal}`);
      const pureValue = num.toString() + (noDot ? '' : `.${decimal}`);
      return prevValue !== localValue ? [localValue, pureValue] : null;
    default:
      return prevValue !== value ? [value, value] : null;
  }
};

export const blurTransformValue = (
  type: (typeof INPUT_TYPES)[number],
  value: string,
  prevValue: string,
): TransformedValue => {
  switch (type) {
    case 'number':
      const [integer, decimal] = value.split('.');
      const num = Number(integer.replaceAll(',', ''));
      const finalDecimal =
        decimal === undefined
          ? ''
          : decimal.length < 2
          ? `.${decimal.padEnd(2, '0')}`
          : `.${decimal}`;
      const localValue = num.toLocaleString() + finalDecimal;
      const pureValue = num.toString() + finalDecimal;
      return prevValue !== localValue ? [localValue, pureValue] : null;
    default:
      return prevValue !== value ? [value, value] : null;
  }
};

export const getInitialValue = (
  value: string,
  type: (typeof INPUT_TYPES)[number],
) => {
  switch (type) {
    case 'number':
      const [integer, decimal] = value.split('.');
      return (
        Number(integer.replaceAll(',', '')).toLocaleString() +
        (decimal !== undefined ? `.${decimal}` : '')
      );
    default:
      return value;
  }
};
