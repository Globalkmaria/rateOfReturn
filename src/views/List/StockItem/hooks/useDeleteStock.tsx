import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteStock } from '@/features';

import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';

interface Props {
  onClose: () => void;
  stockId: string;
}

function useDeleteStock({ onClose, stockId }: Props) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const onDeleteStock = useCallback(async () => {
    if (isLoggedIn) {
      const result = await userStocksService.deleteUserStock(stockId);
      if (!result.success) return;
    }
    dispatch(deleteStock(stockId));
    onClose();
  }, [onClose, isLoggedIn, stockId]);

  return onDeleteStock;
}

export default useDeleteStock;
