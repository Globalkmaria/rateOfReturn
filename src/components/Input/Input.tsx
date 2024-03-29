import { ChangeEvent, FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { BaseInput, InputProps } from './BaseInput';
import { blurTransformValue, changeTransformValue, getInitialValue } from './utils';

export const Input = forwardRef(function Input(
  { type = 'text', onChange, onBlur, className, value = '', ...restProps }: InputProps,
  ref,
) {
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

  const setRef = (element: HTMLInputElement) => {
    input.current = element;

    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const transformedValue = changeTransformValue(type, value, preValue);
    onChange && onChange(e, transformedValue);

    if (transformedValue) {
      setPreValue(transformedValue[0]);
      const nextSelection = e.target.selectionStart! + transformedValue[0].length - value.length;
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
      className={className}
      ref={setRef}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      type={inputType}
      value={formattedValue}
      align={align}
      {...restProps}
    />
  );
});
