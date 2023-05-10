import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

export type OnInputChangeType = (
  e: ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue,
) => void;
export type TransformedValue = [localValue: string, pureValue: string] | null;

const INPUT_TYPES = ['text', 'number', 'date'] as const;
interface BaseInputProps {
  align?: 'left' | 'right';
  fullWidth?: boolean;
  padding?: number;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>,
    BaseInputProps {
  type?: (typeof INPUT_TYPES)[number];
  value?: string;
  onChange?: OnInputChangeType;
  onBlur?: OnInputChangeType;
}

const changeTransformValue = (
  type: (typeof INPUT_TYPES)[number],
  value: string,
  prevValue: string,
): TransformedValue => {
  switch (type) {
    case 'number':
      const [integer, decimal] = value.split('.');
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

const blurTransformValue = (
  type: (typeof INPUT_TYPES)[number],
  value: string,
  prevValue: string,
): TransformedValue => {
  switch (type) {
    case 'number':
      const [integer, decimal] = value.split('.');
      const num = Number(integer.replaceAll(',', ''));
      const noDot = decimal === '' || decimal === undefined;
      const localValue = num.toLocaleString() + (noDot ? '' : `.${decimal}`);
      const pureValue = num.toString() + (noDot ? '' : `.${decimal}`);
      return prevValue !== localValue ? [localValue, pureValue] : null;
    default:
      return prevValue !== value ? [value, value] : null;
  }
};

const getInitialValue = (value: string, type: (typeof INPUT_TYPES)[number]) => {
  switch (type) {
    case 'number':
      return Number(value).toLocaleString();
    case 'date':
      return new Date(value).toISOString().slice(0, 16);
    default:
      return value;
  }
};

export const BaseInput = styled('input')<BaseInputProps>(
  ({ theme, align = 'left', width, fullWidth, padding = 5 }) => ({
    padding: `${padding}px`,
    border: 'none',
    borderRadius: '5px',
    textAlign: align,
    fontSize: '1rem',
    width: width ? `${width}px` : fullWidth ? '100%' : 'auto',

    '&:focus': {
      background: theme.colors.grey000,
    },
  }),
);

export const Input = ({
  type = 'text',
  onChange,
  onBlur,
  value = '',
  ...restProps
}: InputProps) => {
  const isDate = type === 'date';
  const inputType = isDate ? 'datetime-local' : 'text';
  const align = type === 'number' ? 'right' : 'left';

  const formattedValue = getInitialValue(value, type);
  const [preValue, setPreValue] = useState(value);

  const input = useRef<null | HTMLInputElement>(null);
  const [selection, setSelection] = useState<number | null>(null);
  useEffect(() => {
    if (selection) {
      input.current?.setSelectionRange(selection, selection);
    }
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const transformedValue = changeTransformValue(type, value, preValue);
    onChange && onChange(e, transformedValue);
    if (transformedValue) {
      setPreValue(transformedValue[0]);
      const nextSelection =
        e.target.selectionStart! + transformedValue[0].length - value.length;
      setSelection(nextSelection);
    } else {
      setSelection(null);
    }
  };
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const transformedValue = blurTransformValue(type, value, preValue);
    onBlur && onBlur(e, transformedValue);
    transformedValue && setPreValue(transformedValue[0]);
    setSelection(null);
  };

  return (
    <BaseInput
      ref={input}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      type={inputType}
      value={formattedValue}
      align={align}
      {...restProps}
    />
  );
};
