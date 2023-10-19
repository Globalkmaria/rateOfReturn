import styled from 'styled-components';

import { BorderButton } from '../../../components/Button';
import BackupModal from './BackupModal';
import useModal from '../hooks/useModal';
import { memo } from 'react';

const Backup = () => {
  const { showModal, onOpenModal, onCloseModal } = useModal();

  return (
    <StyledBackup>
      <BorderButton size='m' onClick={onOpenModal}>
        Backup
      </BorderButton>
      {showModal && <BackupModal onClose={onCloseModal} />}
    </StyledBackup>
  );
};

export default memo(Backup);

const StyledBackup = styled('div')`
  .modal-content {
    width: 340px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    ${BorderButton} {
      font-size: min(0.8rem, 5vw);
    }
  }
`;
