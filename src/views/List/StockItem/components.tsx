import styled from 'styled-components';
import {
  BaseButtonProps,
  BorderButton,
  ContainedButton,
} from '../../../components/Button';
import { Input, InputProps } from '../../../components/Input';
import {
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
  TableRow,
} from '../../../components/Table';
import { FaTrash, FaLockOpen, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addPurchasedItem } from '../../../features/stockList/stockListSlice';
import { ChangeEvent, MouseEvent } from 'react';
import { addPurchasedItemsCheckInfo } from '../../../features/checkedItems/checkedItemsSlice';
import { store } from '../../../store';

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
} & Pick<TableHeadProps, 'width' | 'flexBasis'>;
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

export const AddSameStockButton = ({ stockId }: { stockId: string }) => {
  const dispatch = useDispatch();
  const onAddSameStock = () => {
    dispatch(addPurchasedItem(stockId));
    const purchasedIds =
      store.getState().stockList.stocks.byId[stockId].purchasedItems.allIds;
    const newPurchasedId = purchasedIds[purchasedIds.length - 1];
    dispatch(
      addPurchasedItemsCheckInfo({ stockId, purchasedId: newPurchasedId }),
    );
  };

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell colSpan={12}>
        <ContainedButton
          mode='light'
          title='Add same stock item'
          onClick={onAddSameStock}
          color='secondary1'
          fullWidth
        >
          Add Item
        </ContainedButton>
      </TableCell>
    </TableRow>
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
    margin: 0 5px;
  }
`;
