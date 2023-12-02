import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { deletePurchasedItem } from '../stockList/stockListSlice';
import { deletePurchaseItemFromGroups } from '../groups/groupsSlice';
import { deleteCheckedItems } from '../checkedItems/checkedItemsSlice';

function useDeletePurchasedItemState() {
  const dispatch = useDispatch();

  const onDeletePurchasedItem = useCallback(
    ({ stockId, purchasedId }: { stockId: string; purchasedId: string }) => {
      dispatch(deletePurchasedItem({ stockId, purchasedId }));
      dispatch(deletePurchaseItemFromGroups({ stockId, purchasedId }));
      dispatch(deleteCheckedItems({ stockId, purchasedId }));
    },
    [dispatch],
  );

  return onDeletePurchasedItem;
}

export default useDeletePurchasedItemState;
