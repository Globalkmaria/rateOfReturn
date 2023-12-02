import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { deleteStock } from '../stockList/stockListSlice';
import { deleteStockFromGroups } from '../groups/groupsSlice';
import { deleteStockCheck } from '../checkedItems/checkedItemsSlice';

function useDeleteStock() {
  const dispatch = useDispatch();

  const onDeleteStock = useCallback(
    (stockId: string) => {
      dispatch(deleteStock(stockId));
      dispatch(deleteStockFromGroups(stockId));
      dispatch(deleteStockCheck(stockId));
    },
    [dispatch],
  );

  return onDeleteStock;
}

export default useDeleteStock;
