import { useDispatch, useSelector } from 'react-redux';

import { resetUserData } from '@/features';
import WarningModal from '@/components/WarningModal';
import { selectIsLoggedIn } from '@/features/user/selectors';
import userDataService from '@/service/userData/userData';
import { STOCK_INITIAL_STATE } from '@/features/stockList/stockListSlice';
import { GROUP_INITIAL_STATE } from '@/features/groups/groupsSlice';
import { SOLD_INITIAL_STATE } from '@/features/solds';

type Props = {
  onClose: () => void;
};

const ResetDataWarning = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onReset = async () => {
    if (isLoggedIn) {
      const result = await userDataService.replaceUserData({
        stocks: {
          stocks: {},
          nextStockId: STOCK_INITIAL_STATE.nextStockId,
          nextItemId: STOCK_INITIAL_STATE.nextPurchasedId,
        },
        groups: {
          groups: {},
          nextGroupId: GROUP_INITIAL_STATE.nextGroupId,
        },
        solds: {
          solds: {},
          nextId: SOLD_INITIAL_STATE.nextId,
        },
      });

      if (!result.success) {
        alert('Failed to reset remote data.');
        return;
      }
    }

    dispatch(resetUserData());
    onClose();
  };

  return (
    <WarningModal
      onClose={onClose}
      onConfirm={onReset}
      message={MESSAGE}
      buttonName='Reset'
    />
  );
};

export default ResetDataWarning;

const MESSAGE = (
  <>
    If you reset, current data will be deleted. <br /> Please note that this
    action is irreversible. <br />
    If you want to get backup file before reset, click the 'Get Backup File'
    first.
    <br /> Are you sure you want to reset?
  </>
);
