import { ContainedButton } from '../../../components/Button';
import { TableCell, TableRow } from '../../../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchasedItem } from '../../../features/stockList/stockListSlice';
import { selectStockList } from '../../../features/stockList/selectors';
import { addPurchasedItemsCheckInfo } from '../../../features/checkedItems/checkedItemsSlice';
import { updateMainGroup } from '../../../features/groups/groupsSlice';
import { selectCurrentLanguage } from '../../../features/language/selectors';
import { ADD_BTN_TITLE } from './StockItemLan';

export const AddSameStockButton = ({ stockId }: { stockId: string }) => {
  const dispatch = useDispatch();
  const stockList = useSelector(selectStockList);
  const currentLanguage = useSelector(selectCurrentLanguage);

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
          title={ADD_BTN_TITLE[currentLanguage]}
          onClick={onAddSameStock}
          color='secondary1'
          fullWidth
        >
          {ADD_BTN_TITLE[currentLanguage]}
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};
