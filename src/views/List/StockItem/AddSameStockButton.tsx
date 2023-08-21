import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useAddItem } from './hooks/useAddItem';

export const AddSameStockButton = ({ stockId }: { stockId: string }) => {
  const onAddItem = useAddItem(stockId);

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell colSpan={12}>
        <ContainedButton
          mode='light'
          title='Add same stock item'
          onClick={onAddItem}
          color='secondary1'
          fullWidth
        >
          Add Item
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};
