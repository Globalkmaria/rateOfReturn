import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { deletePurchasedItem } from '../../../../features/stockList/stockListSlice';

interface Props {
  onClose: () => void;
  stockId: string;
  purchasedId: string;
}

function useDeletePurchased({ onClose, stockId, purchasedId }: Props) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { purchasedItems } = useSelector(selectStockInfoById(stockId));

  const onDeletePurchased = useCallback(async () => {
    if (isLoggedIn) {
      const isOnlyItem = purchasedItems.allIds.length === 1;
      const result = await userStocksService.deleteUserItemWithStock({
        stockId,
        purchasedId,
        isOnlyItem,
      });

      if (!result.success) return;
    }

    deletePurchasedItem({ stockId, purchasedId });
    onClose();
  }, [onClose, isLoggedIn, stockId, purchasedId, purchasedItems.allIds.length]);

  return onDeletePurchased;
}

export default useDeletePurchased;
