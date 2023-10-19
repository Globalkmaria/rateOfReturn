import { useDispatch, useSelector } from 'react-redux';

import { selectNextIds } from '../../../../features/stockList/selectors';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import {
  addPurchasedItem,
  updateNextPurchasedId,
} from '../../../../features/stockList/stockListSlice';
import { addPurchasedItemsCheckInfo } from '../../../../features/checkedItems/checkedItemsSlice';
import { getNewPurchasedItemInfo } from '../../../../features/stockList/utils';
import userStocksService from '../../../../service/userStocks/userStocks';
import getDateAndTime from '../../../../utils/getDateAndTime';

export function useAddItem(stockId: string) {
  const dispatch = useDispatch();
  const localNextIds = useSelector(selectNextIds());
  const isLogin = useSelector(selectIsLoggedIn);

  const onAddItem = async () => {
    let itemId = localNextIds.nextPurchasedId;
    const { date, time } = getDateAndTime();

    if (isLogin) {
      const result = await userStocksService.addNewUserItem({
        stockId,
        date,
        time,
      });
      if (result) itemId = result.itemId;
    }

    const newPurchasedItem = getNewPurchasedItemInfo(itemId, date, time);

    dispatch(
      addPurchasedItem({
        stockId,
        purchasedId: itemId,
        purchasedItem: newPurchasedItem,
      }),
    );

    dispatch(addPurchasedItemsCheckInfo({ stockId, purchasedId: itemId }));

    dispatch(updateNextPurchasedId());
  };

  return onAddItem;
}
