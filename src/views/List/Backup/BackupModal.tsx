import styled from 'styled-components/macro';

import PortalModal from '../../../components/Modal/PortalModal';
import SaveAsFile from './SaveAsFile';
import SetBackup from './SetBackup';
import Reset from './Reset';

type Props = {
  onClose: () => void;
};

const BackupModal = ({ onClose }: Props) => {
  return (
    <PortalModal title={'Backup'} onClose={onClose}>
      <StyledBackupModal>
        <SaveAsFile />
        <hr />
        <SetBackup />
        <hr />
        <Reset />
      </StyledBackupModal>
    </PortalModal>
  );
};

export default BackupModal;

const StyledBackupModal = styled('div')`
  hr {
    margin: 14px 0;
  }
`;
