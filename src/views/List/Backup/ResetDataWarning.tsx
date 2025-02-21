import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetUserData } from '@/features';
import WarningModal from '@/components/WarningModal';
import { selectIsLoggedIn } from '@/features/user/selectors';
import userDataService from '@/service/userData/userData';
import { STOCK_INITIAL_STATE } from '@/features/stockList/stockListSlice';
import { GROUP_INITIAL_STATE } from '@/features/groups/groupsSlice';
import { SOLD_INITIAL_STATE } from '@/features/solds';
import { useState } from 'react';

type Props = {
  onClose: () => void;
};

const ResetDataWarning = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const buttonText = loading ? 'Resetting...' : 'Reset';

  const onReset = async () => {
    setLoading(true);
    if (isLoggedIn) {
      const result = await userDataService.replaceUserData({
        stocks: {
          stocks: {},
          nextStockId: STOCK_INITIAL_STATE.nextStockId,
          nextItemId: STOCK_INITIAL_STATE.nextPurchasedId,
          tags: [],
        },
        groups: {
          groups: {},
          nextGroupId: GROUP_INITIAL_STATE.nextGroupId,
        },
        solds: {
          solds: {},
          nextId: SOLD_INITIAL_STATE.nextId,
        },
        notes: {
          nextId: 1,
          notes: {},
        },
      });

      if (!result.success) {
        alert('Failed to reset remote data.');
        setLoading(false);
        return;
      }
    }

    dispatch(resetUserData());
    setLoading(false);
    onClose();
    navigate('/portfolio');
  };

  const onModalClose = () => {
    if (!loading) onClose();
  };

  return (
    <WarningModal
      disabled={loading}
      onClose={onModalClose}
      onConfirm={onReset}
      message={MESSAGE}
      buttonName={buttonText}
    />
  );
};

export default ResetDataWarning;

const MESSAGE = (
  <>
    If you reset, current data will be deleted. <br /> Please note that this
    action is irreversible. <br />
    If you want to get backup file before reset, click the {`'Get Backup File'`}
    first.
    <br /> Are you sure you want to reset?
  </>
);
