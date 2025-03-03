import { useDispatch, useSelector } from 'react-redux';

import { addNewStock } from '@/features';

import { StockCheckInfo } from '../../../../features/checkedItems/type';
import { selectNextIds } from '../../../../features/stockList/selectors';
import { getNewStockInfo } from '../../../../features/stockList/utils';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import getDateAndTime from '../../../../utils/getDateAndTime';

export const useAddNewStock = () => {
  const dispatch = useDispatch();
  const localNextIds = useSelector(selectNextIds());
  const isLogin = useSelector(selectIsLoggedIn);

  const onAddNewStock = async () => {
    let stockId = localNextIds.nextPurchasedId;
    let itemId = localNextIds.nextPurchasedId;
    const { date, time } = getDateAndTime();

    if (isLogin) {
      const result = await userStocksService.addNewUserStock({
        date,
        time,
      });
      if (result) {
        stockId = result.stockId;
        itemId = result.itemId;
      }
    }

    const newStockCheckInfo: StockCheckInfo = {
      allChecked: true,
      purchasedItems: { [itemId]: true },
    };
    const newStockInfo = getNewStockInfo(stockId, itemId, date, time);

    dispatch(
      addNewStock({
        stockId,
        stockInfo: newStockInfo,
        stockCheckInfo: newStockCheckInfo,
      }),
    );
  };

  return { onAddNewStock };
};
