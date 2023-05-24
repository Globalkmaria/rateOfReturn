import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import Modal from '../../../components/Modal';
import SaveAsFile from './SaveAsFile';
import SetBackup from './SetBackup';
import Reset from './Reset';

const Backup = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledBackup>
      <BorderButton size='m' onClick={() => setIsOpen(true)}>
        Backup
      </BorderButton>
      <Modal title={'Backup'} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='modal-content'>
          <SaveAsFile />
          <hr />
          <SetBackup />
          <hr />
          <Reset />
        </div>
      </Modal>
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
