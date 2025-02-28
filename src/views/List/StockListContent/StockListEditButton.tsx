import { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectStockList } from '@/features/stockList/selectors';
import { updateStockList } from '@/features/stockList/stockListSlice';
import { selectTemporalStockList } from '@/features/temporalStockList/selectors';
import {
  resetTemporalStockList,
  updateTemporalStockListEditMode,
} from '@/features/temporalStockList/temporalStockListSlice';
import { selectIsLoggedIn } from '@/features/user/selectors';

import { EditButton } from '@/components/IconButton';

import { logInSaveStock } from './helper';

function StockListEditButton() {
  const dispatch = useDispatch();
  const temporalStockList = useSelector(selectTemporalStockList);
  const stockList = useSelector(selectStockList);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLock = !temporalStockList.isEditMode;
  const [isLoading, startTransition] = useTransition();

  const disable = isLoading || isLock;

  const toggleLock = async () => {
    if (isLock) {
      dispatch(updateTemporalStockListEditMode(true));
    } else {
      const keys = Object.keys(temporalStockList.stockList);
      if (!keys.length) return;

      startTransition(async () => {
        if (isLoggedIn) {
          await logInSaveStock({
            changedStockData: temporalStockList.stockList,
            originalStockData: stockList.stocks,
          });
        }

        dispatch(updateStockList(temporalStockList.stockList));

        dispatch(updateTemporalStockListEditMode(false));
        dispatch(resetTemporalStockList());
      });
    }
  };

  return <EditButton isLock={disable} onClick={toggleLock} />;
}

export default StockListEditButton;
