import styled from 'styled-components';
import {
  BaseButtonProps,
  BorderButton,
  ContainedButton,
} from '../../../components/Button';
import { Input, InputProps } from '../../../components/Input';
import {
  TableCell,
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
} & Pick<TableHeadProps, 'width' | 'flexBasis'>;
interface LockButtonProps {
  isLock: boolean;
  onClick: () => void;
}

export const NumberCell = ({ value }: { value: number | string }) => {
  return (
    <TableCell align='right'>
      <StyledTextWrapper>{Number(value).toLocaleString()}</StyledTextWrapper>
    </TableCell>
  );
};

export const InputCell: React.FC<InputCellProps> = ({
  value,
  disabled,
  ...restProps
}) => {
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
  ...restProps
}: CheckboxCellProps) => {
  const Cell = type === 'td' ? TableCell : TableHead;
  const onClickHandler = (e: MouseEvent<HTMLTableCellElement>) => {
    if (e.target instanceof HTMLInputElement) return;
    const target = e.target as HTMLTableCellElement;
    onClick(!(target.childNodes[0] as HTMLInputElement).checked);
  };
  return (
    <Cell align='center' onClick={onClickHandler} {...restProps}>
      <input
        type='checkbox'
        checked={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onClick(e.target.checked);
        }}
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
        <ContainedButton onClick={onAddSameStock} color='secondary1' fullWidth>
          동일 종목 추가
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};

export const LockButton = ({ isLock, onClick }: LockButtonProps) => {
  const Icon = isLock ? FaLock : FaLockOpen;
  return (
    <TableCell align='center'>
      <BorderButton width={40} onClick={onClick}>
        <Icon />
      </BorderButton>
    </TableCell>
  );
};

export const DeleteButton = (props: BaseButtonProps) => {
  return (
    <TableCell align='center'>
      <BorderButton width={40} {...props}>
        <FaTrash />
      </BorderButton>
    </TableCell>
  );
};

export const StyledTextWrapper = styled('div')`
  padding: 5px;
`;
