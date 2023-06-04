import React from 'react';
import Modal from '../../../components/Modal';
import { useDispatch } from 'react-redux';
import { closeStockModal } from '../../../features/stockModal/stockModalSlice';
import SaveAsFile from './SaveAsFile';
import SetBackup from './SetBackup';
import Reset from './Reset';
import styled from 'styled-components';

const BackupModal = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeStockModal('BackupModal'));
  return (
    <Modal title={'Backup'} onClose={onClose}>
      <StyledBackupModal>
        <SaveAsFile />
        <hr />
        <SetBackup />
        <hr />
        <Reset />
      </StyledBackupModal>
    </Modal>
  );
};

export default BackupModal;

const StyledBackupModal = styled('div')`
  hr {
    margin: 14px 0;
  }
`;
