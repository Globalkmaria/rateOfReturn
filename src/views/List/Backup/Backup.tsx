import React from 'react';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { openStockModal } from '../../../features/stockModal/stockModalSlice';

const Backup = () => {
  const dispatch = useDispatch();
  const onOpenModal = () => {
    dispatch(openStockModal({ modalName: 'BackupModal' }));
  };
  return (
    <StyledBackup>
      <BorderButton size='m' onClick={onOpenModal}>
        Backup
      </BorderButton>
    </StyledBackup>
  );
};

export default Backup;

const StyledBackup = styled('div')`
  hr {
    margin: 15px 0;
  }

  .modal-content {
    width: 340px;
  }
`;
