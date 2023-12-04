import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import useDeleteStockState from '../../../../features/customActions/useDeleteStockState';

interface Props {
  onClose: () => void;
  stockId: string;
}

function useDeleteStock({ onClose, stockId }: Props) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const deleteStock = useDeleteStockState();

  const onDeleteStock = useCallback(async () => {
    if (isLoggedIn) {
      const result = await userStocksService.deleteUserStock(stockId);
      if (!result.success) return;
    }
    deleteStock(stockId);
    onClose();
  }, [onClose, isLoggedIn, stockId, deleteStock]);

  return onDeleteStock;
}

export default useDeleteStock;
