import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useAddNewStock } from './hooks';

export const AddNewStock = () => {
  const { onAddNewStock } = useAddNewStock();
  return (
    <TableRow>
      <TableCell colSpan={13}>
        <ContainedButton
          mode='light'
          onClick={onAddNewStock}
          color='secondary2'
          fullWidth
          title='Add new stock'
        >
          Add Stock
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};
