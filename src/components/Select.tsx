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

const SelectBase = styled('select')<SelectComponentProps>(
  ({ theme, width = 100, height = 40 }) => ({
    padding: '2px 0px 2px 4px',
    width: `${width}px`,
    height: `${height}px`,
    border: 'none',
    background: 'transparent',

    outline: 'none',

    '&:focus': {
      outline: 'none',
    },

    '&:disabled': {
      color: theme.colors.grey600,
      cursor: 'not-allowed',
    },
  }),
);

const Select = ({
  initialValue,
  options,
  onChange,
  disabled,
  className,
  ...restProps
}: SelectProps) => {
  const [value, setValue] = useState(initialValue || '');
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const onChangeResult = onChange && onChange(e);
    const value = onChangeResult ?? e.target.value;
    setValue(value);
  };

  return (
    <StyledWrapper disabled={disabled} className={className}>
      <SelectBase
        value={value}
        disabled={disabled}
        onChange={onChangeHandler}
        {...restProps}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectBase>
    </StyledWrapper>
  );
};

export default Select;

const StyledWrapper = styled.div<{ disabled?: boolean }>`
  width: fit-content;
  height: fit-content;
  padding-right: 4px;
  border: ${({ theme, disabled }) =>
    `1px solid ${disabled ? theme.colors.grey500 : theme.colors.black}`};
  border-radius: 13px;
`;
