import { ChangeEvent, MouseEvent, memo } from 'react';
import styled from 'styled-components';

import { Input } from '../../../components/Input/Input';
import {
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
} from '@/components/Table';
import { InputProps } from '../../../components/Input/BaseInput';
import { getFixedLocaleString } from '@/utils/number';

type InputCellProps = {
  disabled: boolean;
  value: string | number;
  withFixed?: boolean;
} & Omit<InputProps, 'value'>;
type CheckboxCellProps = {
  onClick: (checked: boolean) => void;
  value: boolean;
  type?: 'td' | 'th';
  disabled?: boolean;
  title?: string;
  className?: string;
} & Pick<TableHeadProps, 'fixedWidth' | 'minWidth'>;

type NumberCellProps = {
  value: number | string;
  withFixed?: boolean;
} & TableCellProps;

export const NumberCell = memo(function NumberCell({
  value,
  className,
  withFixed,
  ...props
}: NumberCellProps) {
  const formattedValue = withFixed
    ? getFixedLocaleString(value)
    : value.toLocaleString();
  return (
    <TableCell align='right' className={className} {...props}>
      <StyledTextWrapper>{formattedValue}</StyledTextWrapper>
    </TableCell>
  );
});

export const InputCell = ({
  value,
  disabled,
  withFixed,
  ...restProps
}: InputCellProps) => {
  const formattedValue =
    withFixed && disabled
      ? getFixedLocaleString(value)
      : value.toLocaleString();

  return (
    <TableCell>
      <Input
        disabled={disabled}
        fullWidth
        type='number'
        value={formattedValue}
        {...restProps}
      />
    </TableCell>
  );
};

export const CheckboxCell = ({
  onClick,
  value,
  type = 'td',
  disabled,
  className,
  ...restProps
}: CheckboxCellProps) => {
  const Cell = type === 'td' ? TableCell : TableHead;
  const onClickHandler = (e: MouseEvent<HTMLTableCellElement>) => {
    if (e.target instanceof HTMLInputElement) return;
    const target = e.target as HTMLTableCellElement;
    onClick(!(target.childNodes[0] as HTMLInputElement).checked);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onClick(e.target.checked);
  };

  return (
    <Cell
      align='center'
      onClick={onClickHandler}
      className={className}
      {...restProps}
    >
      <input
        disabled={disabled}
        type='checkbox'
        checked={value}
        onChange={onChange}
      />
    </Cell>
  );
};

export const StyledTextWrapper = styled('div')`
  padding: 5px;
`;
