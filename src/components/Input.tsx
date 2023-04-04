import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';

const INPUT_TYPES = ['text', 'number', 'date'] as const;
interface BaseInputProps {
  align?: 'left' | 'right';
  fullWidth?: boolean;
}
interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {
  type?: typeof INPUT_TYPES[number];
  value?: string;
}

const changeTransformValue = (
  type: typeof INPUT_TYPES[number],
  value: string,
  prevValue: string,
): string | null => {
  switch (type) {
    case 'number':
      const [integer, decimal] = value.split('.');
      const num = Number(integer.replaceAll(',', ''));
      const isValid = !isNaN(num) && !isNaN(Number(decimal || 0));
      if (!isValid) return null;
      const noDot = decimal === undefined;
      const result = num.toLocaleString() + (noDot ? '' : `.${decimal}`);
      return prevValue !== result ? result : null;

    default:
      return prevValue !== value ? value : null;
  }
};

const blurTransformValue = (
  type: typeof INPUT_TYPES[number],
  value: string,
  prevValue: string,
): string | null => {
  switch (type) {
    case 'number':
      const [integer, decimal] = value.split('.');
      const num = Number(integer.replaceAll(',', ''));
      const dotNoNeed = decimal === '' || decimal === undefined;
      const result = num.toLocaleString() + (dotNoNeed ? '' : `.${decimal}`);
      return prevValue !== result ? result : null;

    default:
      return prevValue !== value ? value : null;
  }
};

export const BaseInput = styled('input')<BaseInputProps>(
  ({ theme, align = 'left', width, fullWidth }) => ({
    padding: '5px',
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

export const Input: React.FC<InputProps> = ({
  type = 'text',
  onChange,
  onBlur,
  value = '',
  ...restProps
}) => {
  const input = useRef<null | HTMLInputElement>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const [finalValue, setFinalValue] = useState<string>(value);
  useEffect(() => {
    if (selection) {
      input.current?.setSelectionRange(selection, selection);
    }
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const onChangeResult = onChange && onChange(e);
    const value = onChangeResult ?? e.target.value;
    const transformedValue = changeTransformValue(type, value, finalValue);
    if (transformedValue) {
      setFinalValue(transformedValue);
      const nextSelection =
        e.target.selectionStart! + transformedValue.length - value.length;
      setSelection(nextSelection);
    } else {
      setSelection(null);
    }
  };
  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const onBlurResult = onBlur && onBlur(e);
    const value = onBlurResult ?? e.target.value;
    const transformedValue = blurTransformValue(type, value, finalValue);
    transformedValue && setFinalValue(transformedValue);
    setSelection(null);
  };

  const isDate = type === 'date';
  const inputType = isDate ? 'datetime-local' : 'text';
  const align = type === 'number' ? 'right' : 'left';

  return (
    <BaseInput
      ref={input}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      type={inputType}
      value={finalValue}
      align={align}
      {...restProps}
    />
  );
};
