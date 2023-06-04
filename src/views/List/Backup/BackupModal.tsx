import React from 'react';
import Modal from '../../../components/Modal';
import { useDispatch } from 'react-redux';
import { closeStockModal } from '../../../features/stockModal/stockModalSlice';
import SaveAsFile from './SaveAsFile';
import SetBackup from './SetBackup';
import Reset from './Reset';

const BackupModal = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeStockModal('BackupModal'));
  return (
    <Modal title={'Backup'} onClose={onClose}>
      <div className='modal-content'>
        <SaveAsFile />
        <hr />
        <SetBackup />
        <hr />
        <Reset />
      </div>
    </Modal>
  );
};

export default BackupModal;
