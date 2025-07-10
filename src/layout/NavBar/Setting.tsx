import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import BackupModal from '@/views/List/Backup/BackupModal';
import useModal from '@/views/List/hooks/useModal';

import Dropbox from '@/components/Dropbox';
import IconButton from '@/components/IconButton';

function Setting() {
  const settingControl = useModal();
  const backupControl = useModal();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SettingWrapper ref={containerRef}>
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
          <Item
            onClick={() => {
              navigate('/settings');
              settingControl.onCloseModal();
            }}
          >
            Settings
          </Item>
        </Dropbox.Container>
      )}
      {backupControl.showModal && (
        <BackupModal onClose={backupControl.onCloseModal} />
      )}
    </SettingWrapper>
  );
}

export default Setting;

const SettingWrapper = styled(Dropbox.Wrapper)`
  .drop-container {
    z-index: 9;
  }
`;

const Item = styled(Dropbox.Item)`
  && {
    padding: 10px 15px;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;
