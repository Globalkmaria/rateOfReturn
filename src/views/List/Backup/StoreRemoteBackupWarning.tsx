import WarningModal from '../../../components/WarningModal';
import formatStockAsServerFormat from '../../../utils/formatStockAsServerFormat';
import formatGroupAsServerFormat from '../../../utils/formatGroupAsServerFormat';
import userDataService from '../../../service/userData/userData';
import { formatSoldAsServerFormat } from '@/utils/formatSoldsAsServerFormat';

type Props = {
  onClose: () => void;
  data: any;
};

const StoreRemoteBackupWarning = ({ onClose, data }: Props) => {
  const backupData = async () => {
    if (data === null || data === undefined) return;
    if (!data.stockList || !data.groups) {
      alert(WARNING_MESSAGE);
      return;
    }
    const stocks = formatStockAsServerFormat(data.stockList);
    if (!stocks) {
      alert(WARNING_MESSAGE);
      return;
    }
    const groups = formatGroupAsServerFormat(data.groups);
    if (!groups) {
      alert(WARNING_MESSAGE);
      return;
    }
    const solds = formatSoldAsServerFormat(data.solds);
    if (!solds) {
      alert(WARNING_MESSAGE);
      return;
    }
    const result = await userDataService.replaceUserData({
      stocks,
      groups,
      solds,
    });

    if (result.success) {
      onClose();
      return;
    }

    alert('Failed to store remote data.');
  };

  return (
    <WarningModal
      onClose={onClose}
      onConfirm={backupData}
      message={MESSAGE}
      buttonName='Restore remote data from Backup'
    />
  );
};

export default StoreRemoteBackupWarning;

const MESSAGE = (
  <>
    This will overwrite your current remote data with the data from the backup
    file. <br /> Please note that this action is irreversible. <br /> If you set
    backup, remote data will be changed to backup file data.
    <br /> Are you certain you want to proceed?
  </>
);

const WARNING_MESSAGE =
  'Current backup file cannot be used to store remote data.';
