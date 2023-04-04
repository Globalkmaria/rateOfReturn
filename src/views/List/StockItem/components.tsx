import styled from 'styled-components';
import { BorderButton, ContainedButton } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import { FaTrash, FaLockOpen, FaLock } from 'react-icons/fa';

interface InputCellProps {
  disabled: boolean;
  value: string | number;
}
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

export const InputCell: React.FC<InputCellProps> = ({ value, disabled }) => {
  if (typeof value === 'number') {
    value = value.toString();
  }
  return (
    <TableCell>
      <Input disabled={disabled} fullWidth type='number' value={value} />
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

export const AddSameStockButton: React.FC = () => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell colSpan={11}>
        <ContainedButton color='secondary1' fullWidth>
          동일 종목 추가
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};

export const DeleteButton: React.FC = () => {
  return (
    <BorderButton width={40}>
      <FaTrash />
    </BorderButton>
  );
};

export const StyledTextWrapper = styled('div')`
  padding: 5px;
`;
