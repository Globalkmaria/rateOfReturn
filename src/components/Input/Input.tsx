import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { BaseInput, InputProps } from './BaseInput';
import {
  blurTransformValue,
  changeTransformValue,
  getInitialValue,
} from './utils';

export const Input = ({
  type = 'text',
  onChange,
  onBlur,
  value = '',
  ...restProps
}: InputProps) => {
  const inputType = type === 'number' ? 'text' : type;
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
