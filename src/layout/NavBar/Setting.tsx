import { useRef } from 'react';
import styled from 'styled-components';

import Dropbox from '@/components/Dropbox';
import IconButton from '@/components/IconButton';
import BackupModal from '@/views/List/Backup/BackupModal';
import useModal from '@/views/List/hooks/useModal';

function Setting() {
  const settingControl = useModal();
  const backupControl = useModal();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Dropbox.Wrapper ref={containerRef}>
      <IconButton
        icon='setting'
        onClick={settingControl.onToggleModal}
        size='l'
      />
      {settingControl.showModal && (
        <Dropbox.Container
          width={140}
          containerRef={containerRef}
          onCloseModal={settingControl.onCloseModal}
          vertical={'bottom'}
          horizontal={'right'}
        >
          <Item onClick={backupControl.onOpenModal}>Backup</Item>
        </Dropbox.Container>
      )}
      {backupControl.showModal && (
        <BackupModal onClose={backupControl.onCloseModal} />
      )}
    </Dropbox.Wrapper>
  );
}

export default Setting;

const Item = styled(Dropbox.Item)`
  && {
    padding: 10px 15px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
