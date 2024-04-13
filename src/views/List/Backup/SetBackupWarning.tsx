import { useDispatch } from 'react-redux';
import WarningModal from '../../../components/WarningModal';
import { setBackupData } from '@/features';

type Props = {
  onClose: () => void;
  data: any;
};

const SetBackupWarning = ({ onClose, data }: Props) => {
  const dispatch = useDispatch();

  const backupData = () => {
    if (data === null || data === undefined) return;
    dispatch(
      setBackupData({
        stockList: data.stockList,
        groups: data.groups,
        checkedItems: data.checkedItems,
      }),
    );

    onClose();
  };

  return <WarningModal onClose={onClose} onConfirm={backupData} message={MESSAGE} buttonName='Set Backup' />;
};

export default SetBackupWarning;

const MESSAGE = (
  <>
    If you set backup, current data will be deleted.
    <br /> Are you sure you want to set backup?
  </>
);
