import { useDispatch, useSelector } from 'react-redux';
import { ContainedButton } from '../../components/Button';
import { TableCell, TableRow } from '../../components/Table';
import {
  addNewStock,
  updateNextPurchasedId,
  updateNextStockId,
} from '../../features/stockList/stockListSlice';
import { addStockCheckInfo } from '../../features/checkedItems/checkedItemsSlice';
import { updateMainGroup } from '../../features/groups/groupsSlice';
import { selectStockList } from '../../features/stockList/selectors';
import { getNewStockInfo } from '../../features/stockList/utils';

export const AddNewStock = () => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);
  const onAddNewStock = () => {
    const newStockId = stockList.nextStockId.toString();
    const newPurchasedId = stockList.nextPurchasedId.toString();
    const newStockInfo = getNewStockInfo(newStockId, newPurchasedId);
    dispatch(
      addNewStock({
        stockId: newStockId,
        stockInfo: newStockInfo,
      }),
    );
    dispatch(
      addStockCheckInfo({
        stockId: newStockId.toString(),
        purchasedId: newPurchasedId.toString(),
      }),
    );
    dispatch(
      updateMainGroup({
        type: 'stock',
        stockId: newStockId,
        purchasedId: newPurchasedId,
      }),
    );
    dispatch(updateNextStockId());
    dispatch(updateNextPurchasedId());
  };

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
