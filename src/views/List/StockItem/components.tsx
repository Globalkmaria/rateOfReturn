import styled from 'styled-components';
import { BaseButtonProps, BorderButton } from '../../../components/Button';
import { Input, InputProps } from '../../../components/Input';
import {
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
} from '../../../components/Table';
import { FaTrash, FaLockOpen, FaLock } from 'react-icons/fa';
import { ChangeEvent, MouseEvent } from 'react';

type InputCellProps = {
  disabled: boolean;
  value: string | number;
} & Omit<InputProps, 'value'>;
type CheckboxCellProps = {
  onClick: (checked: boolean) => void;
  value: boolean;
  type?: 'td' | 'th';
  disabled?: boolean;
  title?: string;
} & Pick<TableHeadProps, 'fixedWidth' | 'minWidth'>;
type LockButtonProps = {
  isLock: boolean;
  disabled?: boolean;
  onClick: () => void;
};
type DeleteButtonProps = {
  disabled?: boolean;
} & BaseButtonProps;

type NumberCellProps = {
  value: number | string;
} & TableCellProps;

export const NumberCell = ({ value, ...props }: NumberCellProps) => {
  return (
    <TableCell align='right' {...props}>
      <StyledTextWrapper>{Number(value).toLocaleString()}</StyledTextWrapper>
    </TableCell>
  );
};

export const InputCell = ({
  value,
  disabled,
  ...restProps
}: InputCellProps) => {
  value = value.toString();

  return (
    <TableCell>
      <Input
        disabled={disabled}
        fullWidth
        type='number'
        value={value}
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
    <Cell align='center' onClick={onClickHandler} {...restProps}>
      <input
        disabled={disabled}
        type='checkbox'
        checked={value}
        onChange={onChange}
      />
    </Cell>
  );
};

export const LockButton = ({ isLock, onClick, disabled }: LockButtonProps) => {
  const Icon = isLock ? FaLock : FaLockOpen;

  return (
    <StyledBtnWrapper>
      <BorderButton
        disabled={disabled}
        disableIcon={disabled}
        width={40}
        onClick={onClick}
      >
        <Icon />
      </BorderButton>
    </StyledBtnWrapper>
  );
};

export const DeleteButton = ({ disabled, ...resProps }: DeleteButtonProps) => {
  return (
    <StyledBtnWrapper>
      <BorderButton
        disabled={disabled}
        disableIcon={disabled}
        width={40}
        {...resProps}
      >
        <FaTrash />
      </BorderButton>
    </StyledBtnWrapper>
  );
};

export const StyledTextWrapper = styled('div')`
  padding: 5px;
`;

const StyledBtnWrapper = styled(TableCell)`
  ${BorderButton} {
    margin: 0 2px;
  }
`;
