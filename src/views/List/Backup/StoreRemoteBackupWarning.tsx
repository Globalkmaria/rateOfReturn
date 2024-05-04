import { useDispatch, useSelector } from 'react-redux';
import WarningModal from '../../../components/WarningModal';
import formatStockAsServerFormat from '../../../utils/formatStockAsServerFormat';
import formatGroupAsServerFormat from '../../../utils/formatGroupAsServerFormat';
import userDataService from '../../../service/userData/userData';
import { formatSoldAsServerFormat } from '@/utils/formatSoldsAsServerFormat';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { setBackupData } from '@/features';
import { getInitialCheckedItemsInfo } from '@/features/checkedItems/utils';

type Props = {
  onClose: () => void;
  data: any;
};

const StoreRemoteBackupWarning = ({ onClose, data }: Props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const backupData = async () => {
    if (data === null || data === undefined) return;

    if (isLoggedIn) {
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

      if (!result.success) {
        alert('Failed to store remote data.');
        return;
      }
    }

    dispatch(
      setBackupData({
        stockList: data.stockList,
        groups: data.groups,
        checkedItems:
          data.checkedItems ?? getInitialCheckedItemsInfo(data.stockList),
        solds: data.solds,
      }),
    );

    onClose();
  };

  return (
    <WarningModal
      onClose={onClose}
      onConfirm={backupData}
      message={getMessage(!isLoggedIn)}
      buttonName='Restore remote from Backup'
    />
  );
};

export default StoreRemoteBackupWarning;

const WARNING_MESSAGE =
  'Current backup file cannot be used to store remote data.';

const getMessage = (isLocal: boolean) => {
  const storage = isLocal ? 'local' : 'remote';
  return (
    <>
      This will overwrite your current {storage} data with the data from the
      backup file. <br /> Please note that this action is irreversible. <br />
      If you set backup, {storage} data will be changed to backup file data.
      <br /> Are you certain you want to proceed?
    </>
  );
};
