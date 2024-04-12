import { useDispatch, useSelector } from 'react-redux';

import { selectNextIds } from '../../../../features/stockList/selectors';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import { getNewPurchasedItemInfo } from '../../../../features/stockList/utils';
import userStocksService from '../../../../service/userStocks/userStocks';
import getDateAndTime from '../../../../utils/getDateAndTime';
import { addPurchasedItem } from '../../../../features/actions';

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
  };

  return onAddItem;
}
