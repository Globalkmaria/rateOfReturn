import { useDispatch, useSelector } from 'react-redux';

import {
  addNewStock,
  updateNextPurchasedId,
  updateNextStockId,
} from '../../../features/stockList/stockListSlice';
import { addStockCheckInfo } from '../../../features/checkedItems/checkedItemsSlice';
import { updateMainGroup } from '../../../features/groups/groupsSlice';
import { selectNextIds } from '../../../features/stockList/selectors';
import { getNewStockInfo } from '../../../features/stockList/utils';
import { StockCheckInfo } from '../../../features/checkedItems/type';

export const useAddNewStock = () => {
  const dispatch = useDispatch();
  const { nextStockId, nextPurchasedId } = useSelector(selectNextIds());

  const onAddNewStock = () => {
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

  return { onAddNewStock };
};
