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
import userStocksService from '../../../service/userStocks/userStocks';
import { selectIsLoggedIn } from '../../../features/user/selectors';

export const useAddNewStock = () => {
  const dispatch = useDispatch();
  const localNextIds = useSelector(selectNextIds());
  const isLogin = useSelector(selectIsLoggedIn());

  const onAddNewStock = async () => {
    let stockId = localNextIds.nextPurchasedId;
    let itemId = localNextIds.nextPurchasedId;

    if (isLogin) {
      const result = await userStocksService.addNewUserStock();
      if (result) {
        stockId = result.stockId;
        itemId = result.itemId;
      }
    }

    const newStockCheckInfo: StockCheckInfo = {
      allChecked: true,
      purchasedItems: { [itemId]: true },
    };
    const newStockInfo = getNewStockInfo(stockId, itemId);

    dispatch(
      addNewStock({
        stockId: stockId,
        stockInfo: newStockInfo,
      }),
    );
    dispatch(
      addStockCheckInfo({
        stockCheckInfo: newStockCheckInfo,
        stockId: stockId,
      }),
    );
    dispatch(
      updateMainGroup({
        type: 'stock',
        stockId: stockId,
        purchasedId: itemId,
      }),
    );

    dispatch(updateNextStockId());
    dispatch(updateNextPurchasedId());
  };

  return { onAddNewStock };
};
