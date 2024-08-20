import { useDispatch, useSelector } from 'react-redux';
import WarningModal from '../../../components/WarningModal';
import formatStockAsServerFormat from '../../../utils/formatStockAsServerFormat';
import formatGroupAsServerFormat from '../../../utils/formatGroupAsServerFormat';
import userDataService from '../../../service/userData/userData';
import { formatSoldAsServerFormat } from '@/utils/formatSoldsAsServerFormat';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { setBackupData } from '@/features';
import { getInitialCheckedItemsInfo } from '@/features/checkedItems/utils';
import { useNavigate } from 'react-router-dom';
import { formatNotesAsServerFormat } from '@/utils/formatNotesAsServerFormat';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  data: any;
};

const BackupWarningModal = ({ onClose, data }: Props) => {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backupData = async () => {
    if (loading) return;
    if (data === null || data === undefined) return;
    setLoading(true);

    if (isLoggedIn) {
      if (!data.stockList || !data.groups) {
        alert(WARNING_MESSAGE);
        setLoading(false);
        return;
      }

      const stocks = formatStockAsServerFormat(data.stockList);
      if (!stocks) {
        alert(WARNING_MESSAGE);
        setLoading(false);
        return;
      }
      const groups = formatGroupAsServerFormat(data.groups);
      if (!groups) {
        alert(WARNING_MESSAGE);
        setLoading(false);
        return;
      }
      const solds = formatSoldAsServerFormat(data.solds);
      if (!solds) {
        alert(WARNING_MESSAGE);
        setLoading(false);
        return;
      }
      const notes = formatNotesAsServerFormat(data.notes);
      if (!notes) {
        alert(WARNING_MESSAGE);
        setLoading(false);
        return;
      }

      const result = await userDataService.replaceUserData({
        stocks,
        groups,
        solds,
        notes,
      });

      if (!result.success) {
        alert('Failed to store remote data.');
        setLoading(false);
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
        notes: data.notes,
      }),
    );

    setLoading(false);
    onClose();
    navigate('/portfolio');
  };

  const onModalClose = () => {
    if (!loading) onClose();
  };

  const buttonText = loading ? 'Restoring...' : 'Restore remote from Backup';

  return (
    <WarningModal
      disabled={loading}
      onClose={onModalClose}
      onConfirm={backupData}
      message={getMessage(!isLoggedIn)}
      buttonName={buttonText}
    />
  );
};

export default BackupWarningModal;

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
