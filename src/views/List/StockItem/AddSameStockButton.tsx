import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPurchasedItem,
  selectStockList,
} from '../../../features/stockList/stockListSlice';
import { addPurchasedItemsCheckInfo } from '../../../features/checkedItems/checkedItemsSlice';
import { updateMainGroup } from '../../../features/groups/groupsSlice';

export const AddSameStockButton = ({ stockId }: { stockId: string }) => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);

  const onAddSameStock = () => {
    const newPurchasedId = stockList.nextPurchasedId.toString();
    dispatch(addPurchasedItem(stockId));
    dispatch(
      addPurchasedItemsCheckInfo({ stockId, purchasedId: newPurchasedId }),
    );
    dispatch(
      updateMainGroup({
        type: 'purchase',
        stockId: stockId,
        purchasedId: newPurchasedId,
      }),
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
