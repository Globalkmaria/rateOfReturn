import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import EditButton from '../EditButton';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { ChangedSummaryInputs } from './hooks';

type Props = {
  isLock: boolean;
  setIsLock: Dispatch<SetStateAction<boolean>>;
  stockId: string;
  changedInputs: ChangedSummaryInputs;
  initChangedInputs: () => void;
};

const SummaryLock = ({
  isLock,
  setIsLock,
  stockId,
  changedInputs,
  initChangedInputs,
}: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);

  const toggleLock = async () => {
    if (!isLoggedIn) {
      return setIsLock((prev) => !prev);
    }
    if (!isLock) {
      if (Object.keys(changedInputs).length === 0) return setIsLock(true);

      const result = await userStocksService.editUserStock({
        stockId,
        data: changedInputs,
      });
      if (!result.success) return;

      initChangedInputs();
      setIsLock(true);
      return;
    }

    setIsLock(false);
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
