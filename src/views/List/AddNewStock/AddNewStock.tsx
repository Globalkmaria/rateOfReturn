import { memo } from 'react';
import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useAddNewStock } from './hooks/useAddNewStock';
import styled from 'styled-components';

const AddNewStock = () => {
  const { onAddNewStock } = useAddNewStock();
  return (
    <StyledTableRow>
      <TableCell colSpan={13}>
        <ContainedButton
          mode='light'
          onClick={onAddNewStock}
          color='secondary2'
          fullWidth
          title='Add new stock'
        >
          Add new stock
        </ContainedButton>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(AddNewStock);

const StyledTableRow = styled(TableRow)`
  height: 46px;
`;
