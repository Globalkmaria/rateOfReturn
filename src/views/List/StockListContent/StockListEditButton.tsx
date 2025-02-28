import { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectStocks } from '@/features/stockList/selectors';
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
  const stockList = useSelector(selectStocks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLock = !temporalStockList.isEditMode;
  const [isLoading, startTransition] = useTransition();

  const disabled = isLoading || isLock || !stockList.allIds.length;

  const toggleLock = async () => {
    if (isLock) {
      dispatch(updateTemporalStockListEditMode(true));
      return;
    }

    if (!Object.keys(temporalStockList.stockList).length) {
      dispatch(updateTemporalStockListEditMode(false));
      return;
    }

    startTransition(async () => {
      if (isLoggedIn) {
        await logInSaveStock({
          changedStockData: temporalStockList.stockList,
          originalStockData: stockList,
        });
      }

      dispatch(updateStockList(temporalStockList.stockList));

      dispatch(updateTemporalStockListEditMode(false));
      dispatch(resetTemporalStockList());
    });
  };

  return (
    <EditButton disabled={disabled} isLock={disabled} onClick={toggleLock} />
  );
}

export default StockListEditButton;
