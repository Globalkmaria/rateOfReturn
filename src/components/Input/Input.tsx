import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { BaseInput, InputProps, InputType } from './BaseInput';
import { getTransformedValue } from './utils';

export function Input({
  type = 'text',
  onChange,
  onBlur,
  className,
  value = '',
  validation = () => true,
  ref,
  ...restProps
}: InputProps) {
  const isNumberType = NUMBER_TYPE.includes(type);
  const inputType = isNumberType ? 'text' : type;
  const align = type === 'number' ? 'right' : 'left';

  const inputRef = ref ?? useRef<HTMLInputElement>(null);
  const [selection, setSelection] = useState<number | null>(null);

  useEffect(() => {
    if (selection !== null) {
      inputRef.current?.setSelectionRange(selection, selection);
    }
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const transformedValue = getTransformedValue(e, validation, type);
    onChange && onChange(e, transformedValue);

    if (isNumberType && transformedValue) {
      let nextSelection =
        e.target.selectionStart! +
        transformedValue[0].length -
        e.target.value.length;
      nextSelection = Math.max(nextSelection, 0);

      setSelection(nextSelection);
    }
  };

  return (
    <BaseInput
      className={className}
      ref={inputRef}
      onChange={onChangeHandler}
      type={inputType}
      value={value}
      align={align}
      {...restProps}
    />
  );
}

const NUMBER_TYPE: InputType[] = ['decimal', 'number'];
