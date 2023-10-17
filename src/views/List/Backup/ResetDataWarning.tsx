import { useDispatch } from 'react-redux';

import WarningModal from '../../../components/WarningModal';
import { restStockList } from '../../../features/stockList/stockListSlice';
import { resetGroups } from '../../../features/groups/groupsSlice';
import { resetCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';

type Props = {
  onClose: () => void;
};

const ResetDataWarning = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const onReset = () => {
    dispatch(resetCheckedItems());
    dispatch(restStockList());
    dispatch(resetGroups());
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
    If you reset, current data will be deleted.
    <br /> Are you sure you want to reset?
  </>
);
