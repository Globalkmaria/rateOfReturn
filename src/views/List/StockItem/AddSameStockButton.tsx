import { memo } from 'react';
import styled from 'styled-components';

import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useAddItem } from './hooks/useAddItem';

const AddSameStockButton = ({ stockId }: { stockId: string }) => {
  const onAddItem = useAddItem(stockId);

  return (
    <StyledTableRow>
      <TableCell></TableCell>
      <TableCell colSpan={12}>
        <ContainedButton mode='light' title='Add same stock item' onClick={onAddItem} color='secondary1' fullWidth>
          Add Item
        </ContainedButton>
      </TableCell>
    </StyledTableRow>
  );
};

export default memo(AddSameStockButton);

const StyledTableRow = styled(TableRow)`
  height: 46px;
`;
