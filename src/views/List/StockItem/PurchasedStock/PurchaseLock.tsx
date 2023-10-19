import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../../features/user/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import EditButton from '../EditButton';
import { ChangedPurchasedItemInputs } from './PurchasedStock';
import { memo } from 'react';

type Props = {
  isLock: boolean;
  setIsLock: React.Dispatch<React.SetStateAction<boolean>>;
  stockId: string;
  purchasedId: string;
  changedInputs: ChangedPurchasedItemInputs;
  setChangedInputs: React.Dispatch<
    React.SetStateAction<ChangedPurchasedItemInputs>
  >;
};

const PurchaseLock = ({
  isLock,
  setIsLock,
  stockId,
  purchasedId,
  changedInputs,
  setChangedInputs,
}: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);

  const toggleLock = async () => {
    if (!isLoggedIn) {
      return setIsLock((prev) => !prev);
    }

    if (!isLock) {
      if (Object.keys(changedInputs).length === 0) return setIsLock(true);

      const result = await userStocksService.editUserItem({
        stockId,
        itemId: purchasedId,
        data: changedInputs,
      });
      if (!result.success) return;

      setChangedInputs({});
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

export default memo(PurchaseLock);
