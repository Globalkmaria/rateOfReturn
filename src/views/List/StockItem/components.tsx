import { ChangeEvent, MouseEvent, memo } from 'react';
import styled from 'styled-components';
import { FaTrash, FaLockOpen, FaLock } from 'react-icons/fa';

import { BaseButtonProps, BorderButton } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import { TableCell, TableCellProps, TableHead, TableHeadProps } from '../../../components/Table';
import { InputProps } from '../../../components/Input/BaseInput';

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
  className?: string;
} & Pick<TableHeadProps, 'fixedWidth' | 'minWidth'>;
export type LockButtonProps = {
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

export const NumberCell = memo(function NumberCell({ value, className, ...props }: NumberCellProps) {
  return (
    <TableCell align='right' className={className} {...props}>
      <StyledTextWrapper>{Number(value).toLocaleString()}</StyledTextWrapper>
    </TableCell>
  );
});

export const InputCell = ({ value, disabled, ...restProps }: InputCellProps) => {
  value = value.toString();

  return (
    <TableCell>
      <Input disabled={disabled} fullWidth type='number' value={value} {...restProps} />
    </TableCell>
  );
};

export const CheckboxCell = ({ onClick, value, type = 'td', disabled, className, ...restProps }: CheckboxCellProps) => {
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
    <Cell align='center' onClick={onClickHandler} className={className} {...restProps}>
      <input disabled={disabled} type='checkbox' checked={value} onChange={onChange} />
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
        aria-label='toggle lock'
        title='toggle lock'
      >
        <Icon />
      </BorderButton>
    </StyledBtnWrapper>
  );
};

export const DeleteButton = memo(function DeleteButton({ disabled, ...resProps }: DeleteButtonProps) {
  return (
    <StyledBtnWrapper>
      <BorderButton
        disabled={disabled}
        disableIcon={disabled}
        width={40}
        aria-label='delete'
        title='delete'
        {...resProps}
      >
        <FaTrash />
      </BorderButton>
    </StyledBtnWrapper>
  );
});

export const StyledTextWrapper = styled('div')`
  padding: 5px;
`;

const StyledBtnWrapper = styled(TableCell)`
  ${BorderButton} {
    margin: 0 2px;
  }
`;

export const StyledEditBtnWrapper = styled(StyledBtnWrapper)<{
  $isLock: boolean;
}>`
  ${BorderButton} {
    ${({ $isLock, theme }) => !$isLock && `background: ${theme.colors.grey400}`}
  }
`;
