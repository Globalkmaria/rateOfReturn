import { useCallback } from 'react';
import { SummaryLockProps } from '../SummaryLock';
import userStocksService from '../../../../../service/userStocks/userStocks';

function useSaveData({
  setIsLock,
  stockId,
  changedInputs,
  initChangedInputs,
}: Omit<SummaryLockProps, 'isLock'>) {
  const saveData = useCallback(async () => {
    const changedInputsKeys = Object.keys(changedInputs);

    if (!changedInputsKeys.length) return setIsLock(true);

    const result = await userStocksService.editUserStock({
      stockId,
      data: changedInputs,
    });

    if (!result.success) return;

    initChangedInputs();
    setIsLock(true);
  }, [stockId, initChangedInputs, setIsLock, changedInputs]);

  return saveData;
}

export default useSaveData;
