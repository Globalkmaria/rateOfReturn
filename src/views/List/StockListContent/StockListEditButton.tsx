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
  const [isLoading, startTransition] = useTransition();
  const temporalStockList = useSelector(selectTemporalStockList);
  const stockList = useSelector(selectStocks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLock = !temporalStockList.isEditMode;

  const disabled = isLoading || !stockList.allIds.length;

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
        const result = await logInSaveStock({
          changedStockData: temporalStockList.stockList,
          originalStockData: stockList,
        });

        if (!result.success) {
          alert(
            result.message ?? 'Could not save stock. Please try again later.',
          );
          return;
        }
      }

      dispatch(updateStockList(temporalStockList.stockList));

      dispatch(updateTemporalStockListEditMode(false));
      dispatch(resetTemporalStockList());
    });
  };

  return (
    <EditButton disabled={disabled} isLock={isLock} onClick={toggleLock} />
  );
}

export default StockListEditButton;
