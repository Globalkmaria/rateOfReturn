import { ChangeEvent, MouseEvent, memo } from 'react';

import styled from 'styled-components';

import { getFixedLocaleString } from '@/utils/number';

import { Chip } from '@/components/Chip';
import {
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
} from '@/components/Table';

import { ColorsKeys } from '@/styles/theme';

import { InputProps } from '../../../components/Input/BaseInput';
import { Input } from '../../../components/Input/Input';

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

type InputCellProps = {
  disabled?: boolean;
  value: string;
  withFixed?: boolean;
} & Omit<InputProps<string | number>, 'value'>;

export const InputCell = ({
  value,
  disabled,
  withFixed,
  type = 'number',
  ...restProps
}: InputCellProps) => {
  return (
    <TableCell>
      <Input
        align='right'
        disabled={disabled}
        fullWidth
        type={type}
        value={value}
        {...restProps}
      />
    </TableCell>
  );
};

type CheckboxCellProps = {
  onClick: (checked: boolean) => void;
  value: boolean;
  type?: 'td' | 'th';
  disabled?: boolean;
  title?: string;
  className?: string;
} & Pick<TableHeadProps, 'fixedWidth' | 'minWidth'>;

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

interface ProfitRateProps {
  profitRate: string;
}
export function ProfitRate({ profitRate }: ProfitRateProps) {
  const color: ColorsKeys = parseInt(profitRate) >= 0 ? 'teal700' : 'red700';

  return (
    <StyledProfitRateCell>
      <StyledProfitRate color={color} fontColor='white'>
        {profitRate}
      </StyledProfitRate>
    </StyledProfitRateCell>
  );
}

const StyledProfitRateCell = styled(TableCell)`
  white-space: nowrap;
`;

const StyledProfitRate = styled(Chip)`
  width: 100%;
  justify-content: center;
`;
