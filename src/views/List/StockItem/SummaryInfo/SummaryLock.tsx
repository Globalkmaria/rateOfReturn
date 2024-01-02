import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../../features/user/selectors';
import { updateStockNeedInit } from '../../../../features/stockList/stockListSlice';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';

import EditButton from '../EditButton';
import { ChangedSummaryInputs } from './hooks/useStockSummaryInputChange';
import useSaveData from './hooks/useSaveData';

export interface SummaryLockProps {
  isLock: boolean;
  setIsLock: Dispatch<SetStateAction<boolean>>;
  stockId: string;
  changedInputs: ChangedSummaryInputs;
  initChangedInputs: () => void;
  needInit?: boolean;
}

const SummaryLock = ({ isLock, setIsLock, stockId, changedInputs, initChangedInputs, needInit }: SummaryLockProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const saveData = useSaveData({
    setIsLock,
    stockId,
    changedInputs,
    initChangedInputs,
  });

  const toggleLock = async () => {
    if (needInit) dispatch(updateStockNeedInit(stockId));
    if (isLock) return setIsLock(false);

    if (!isLoggedIn) return setIsLock(prev => !prev);
    return saveData();
  };

  return <EditButton isLock={isLock} onClick={toggleLock} disabled={!isMainGroupSelected} />;
};

export default SummaryLock;
