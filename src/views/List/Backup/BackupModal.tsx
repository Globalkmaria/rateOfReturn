import styled from 'styled-components';

import Reset from './Reset';
import SaveAsFile from './SaveAsFile';
import SetBackup from './SetBackup';
import PortalModal from '../../../components/Modal/PortalModal';

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
