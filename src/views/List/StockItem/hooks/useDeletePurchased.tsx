import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import useDeletePurchasedItemState from '../../../../features/customActions/useDeletePurchasedItemState';

interface Props {
  onClose: () => void;
  stockId: string;
  purchasedId: string;
}

function useDeletePurchased({ onClose, stockId, purchasedId }: Props) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { purchasedItems } = useSelector(selectStockInfoById(stockId));
  const deletePurchased = useDeletePurchasedItemState();

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

    deletePurchased({ stockId, purchasedId });
    onClose();
  }, [onClose, isLoggedIn, stockId, purchasedId, purchasedItems.allIds.length, deletePurchased]);

  return onDeletePurchased;
}

export default useDeletePurchased;
