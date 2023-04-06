import styled from 'styled-components';
import {
  BaseButtonProps,
  BorderButton,
  ContainedButton,
} from '../../../components/Button';
import { Input, InputProps } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import { FaTrash, FaLockOpen, FaLock } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addPurchasedItem } from '../../../features/stockList/stockListSlice';

type InputCellProps = {
  disabled: boolean;
  value: string | number;
} & Omit<InputProps, 'value'>;
interface LockButtonProps {
  isLock: boolean;
  onClick: () => void;
}

export const NumberCell: React.FC<{ value: number | string }> = ({ value }) => {
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

export const LockButton: React.FC<LockButtonProps> = ({ isLock, onClick }) => {
  const Icon = isLock ? FaLock : FaLockOpen;
  return (
    <BorderButton width={40} onClick={onClick}>
      <Icon />
    </BorderButton>
  );
};

export const AddSameStockButton: React.FC<{
  stockId: number;
}> = ({ stockId }) => {
  const dispatch = useDispatch();
  const onAddSameStock = () => {
    dispatch(addPurchasedItem(stockId));
  };

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell colSpan={11}>
        <ContainedButton onClick={onAddSameStock} color='secondary1' fullWidth>
          동일 종목 추가
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};

export const DeleteButton: React.FC<BaseButtonProps> = (props) => {
  return (
    <BorderButton width={40} {...props}>
      <FaTrash />
    </BorderButton>
  );
};

export const StyledTextWrapper = styled('div')`
  padding: 5px;
`;
