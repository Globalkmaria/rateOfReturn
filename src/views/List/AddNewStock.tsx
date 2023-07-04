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
import { StockCheckInfo } from '../../features/checkedItems/type';

export const AddNewStock = () => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);
  const onAddNewStock = () => {
    const { nextStockId, nextPurchasedId } = stockList;
    const newStockInfo = getNewStockInfo(nextStockId, nextPurchasedId);
    const newStockCheckInfo: StockCheckInfo = {
      allChecked: true,
      purchasedItems: { [nextPurchasedId]: true },
    };

    dispatch(
      addNewStock({
        stockId: nextStockId,
        stockInfo: newStockInfo,
      }),
    );
    dispatch(
      addStockCheckInfo({
        stockCheckInfo: newStockCheckInfo,
        stockId: nextStockId,
      }),
    );
    dispatch(
      updateMainGroup({
        type: 'stock',
        stockId: nextStockId,
        purchasedId: nextPurchasedId,
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
