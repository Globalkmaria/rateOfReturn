import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import EditButton from '../EditButton';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { ChangedSummaryInputs } from './hooks/useStockSummaryInputChange';
import useSaveData from './hooks/useSaveData';

export interface SummaryLockProps {
  isLock: boolean;
  setIsLock: Dispatch<SetStateAction<boolean>>;
  stockId: string;
  changedInputs: ChangedSummaryInputs;
  initChangedInputs: () => void;
}

const SummaryLock = ({
  isLock,
  setIsLock,
  stockId,
  changedInputs,
  initChangedInputs,
}: SummaryLockProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const saveData = useSaveData({
    setIsLock,
    stockId,
    changedInputs,
    initChangedInputs,
  });

  const toggleLock = async () => {
    if (isLock) return setIsLock(false);

    if (!isLoggedIn) return setIsLock((prev) => !prev);
    return saveData();
  };

  return (
    <EditButton
      isLock={isLock}
      onClick={toggleLock}
      disabled={!isMainGroupSelected}
    />
  );
};

export default SummaryLock;
