import { useDispatch, useSelector } from 'react-redux';
import {
  closeStockModal,
  initialStockModal,
  selectModalProps,
} from '../../../features/stockModal/stockModalSlice';
import WarningModal from '../../../components/WarningModal';
import formatStockAsServerFormat from '../../../utils/formatStockAsServerFormat';
import formatGroupAsServerFormat from '../../../utils/formatGroupAsServerFormat';
import userDataService from '../../../service/userData/userData';

export type StoreRemoteBackupWarningProps = {
  data: any;
};

const StoreRemoteBackupWarning = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(
    selectModalProps('StoreRemoteBackupWarning'),
  ) as StoreRemoteBackupWarningProps;

  const backupData = async () => {
    if (data === null || data === undefined) return;
    if (!data.stockList || !data.groups) {
      alert('Current backup file cannot be used to store remote data."');
      return;
    }
    const stocks = formatStockAsServerFormat(data.stockList);
    if (!stocks) {
      alert('Current backup file cannot be used to store remote data."');
      return;
    }
    const groups = formatGroupAsServerFormat(data.groups);
    if (!groups) {
      alert('Current backup file cannot be used to store remote data."');
      return;
    }
    const result = await userDataService.replaceUserData({
      stocks,
      groups,
    });

    if (result.success) {
      dispatch(initialStockModal());
      return;
    }

    alert('Failed to store remote data.');
  };

  const onClose = () => dispatch(closeStockModal('StoreRemoteBackupWarning'));

  return (
    <WarningModal
      onClose={onClose}
      onConfirm={backupData}
      message={MESSAGE}
      buttonName='Store Remote Data as Backup'
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
