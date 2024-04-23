import { useDispatch } from 'react-redux';

import { resetUserData } from '@/features';
import WarningModal from '../../../components/WarningModal';

type Props = {
  onClose: () => void;
};

const ResetDataWarning = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const onReset = () => {
    dispatch(resetUserData());
    onClose();
  };

  return <WarningModal onClose={onClose} onConfirm={onReset} message={MESSAGE} buttonName='Reset' />;
};

export default ResetDataWarning;

const MESSAGE = (
  <>
    If you reset, current data will be deleted.
    <br /> Are you sure you want to reset?
  </>
);
