import { SelectHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

type Option = {
  value: string;
  label: string;
};

interface SelectComponentProps extends SelectHTMLAttributes<HTMLSelectElement> {
  width?: number;
  height?: number;
}
interface SelectProps extends SelectComponentProps {
  options: Option[];
  initialValue?: string;
}

const SelectComponent = styled('select')<SelectComponentProps>(
  ({ theme, width = 100, height = 40 }) => ({
    padding: '0.4rem',
    width: `${width}px`,
    height: `${height}px`,
    border: `2px solid ${theme.colors.grey700}`,
    borderRadius: '5px',
    outline: 'none',

    '&:focus': {
      outline: 'none',
    },
  }),
);

const Select = ({
  initialValue,
  options,
  onChange,
  ...restProps
}: SelectProps) => {
  const [value, setValue] = useState(initialValue || '');
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const onChangeResult = onChange && onChange(e);
    const value = onChangeResult ?? e.target.value;
    setValue(value);
  };

  return (
    <SelectComponent value={value} {...restProps} onChange={onChangeHandler}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectComponent>
  );
};

export default Select;
