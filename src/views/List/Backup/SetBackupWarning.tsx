import React from 'react';
import Modal from '../../../components/Modal';
import { ContainedButton } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setBackupCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { setBackupGroups } from '../../../features/groups/groupsSlice';
import { setBackupStockList } from '../../../features/stockList/stockListSlice';
import {
  closeStockModal,
  initialStockModal,
  selectModalProps,
} from '../../../features/stockModal/stockModalSlice';

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
    <Modal title='Warning' onClose={onClose}>
      <div className='modal-content'>
        <p className='text'>
          If you set backup, all data will be deleted.
          <br /> Are you sure you want to set backup?
        </p>
        <ContainedButton
          className='set-btn'
          color='warning'
          onClick={backupData}
          fullWidth
        >
          Set Backup
        </ContainedButton>
      </div>
    </Modal>
  );
};

export default SetBackupWarning;
