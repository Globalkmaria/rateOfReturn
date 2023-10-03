import React from 'react';
import { useDispatch } from 'react-redux';
import { setBackupCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { setBackupGroups } from '../../../features/groups/groupsSlice';
import { setBackupStockList } from '../../../features/stockList/stockListSlice';
import WarningModal from '../../../components/WarningModal';

type Props = {
  onClose: () => void;
  data: any;
};

const SetBackupWarning = ({ onClose, data }: Props) => {
  const dispatch = useDispatch();

  const backupData = () => {
    if (data === null || data === undefined) return;
    dispatch(setBackupCheckedItems(data.checkedItems));
    dispatch(setBackupGroups(data.groups));
    dispatch(setBackupStockList(data.stockList));
    onClose();
  };

  return (
    <WarningModal
      onClose={onClose}
      onConfirm={backupData}
      message={MESSAGE}
      buttonName='Set Backup'
    />
  );
};

export default SetBackupWarning;

const MESSAGE = (
  <>
    If you set backup, current data will be deleted.
    <br /> Are you sure you want to set backup?
  </>
);
