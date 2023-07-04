import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPurchasedItem,
  updateNextPurchasedId,
} from '../../../features/stockList/stockListSlice';
import { selectStockList } from '../../../features/stockList/selectors';
import { addPurchasedItemsCheckInfo } from '../../../features/checkedItems/checkedItemsSlice';
import { updateMainGroup } from '../../../features/groups/groupsSlice';
import { getNewPurchasedItemInfo } from '../../../features/stockList/utils';

export const AddSameStockButton = ({ stockId }: { stockId: string }) => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);

  const onAddSameStock = () => {
    const newPurchasedId = stockList.nextPurchasedId.toString();
    const newPurchasedItem = getNewPurchasedItemInfo(newPurchasedId);

    dispatch(
      addPurchasedItem({
        stockId,
        purchasedId: newPurchasedId,
        purchasedItem: newPurchasedItem,
      }),
    );
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
    dispatch(updateNextPurchasedId());
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
