import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBackupCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { setBackupGroups } from '../../../features/groups/groupsSlice';
import { setBackupStockList } from '../../../features/stockList/stockListSlice';
import {
  closeStockModal,
  initialStockModal,
  selectModalProps,
} from '../../../features/stockModal/stockModalSlice';
import WarningModal from '../../../components/WarningModal';

export type SetBackupWarningProps = {
  data: any;
};

const SetBackupWarning = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(
    selectModalProps('SetBackupWarning'),
  ) as SetBackupWarningProps;

  const backupData = () => {
    if (data === null || data === undefined) return;
    dispatch(setBackupCheckedItems(data.checkedItems));
    dispatch(setBackupGroups(data.groups));
    dispatch(setBackupStockList(data.stockList));
    dispatch(initialStockModal());
  };

  const onClose = () => dispatch(closeStockModal('SetBackupWarning'));

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
