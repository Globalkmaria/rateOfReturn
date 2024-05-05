import Dropbox from '@/components/Dropbox';
import IconButton from '@/components/IconButton';
import BackupModal from '@/views/List/Backup/BackupModal';
import useModal from '@/views/List/hooks/useModal';
import styled from 'styled-components';

function Setting() {
  const settingControl = useModal();
  const backupControl = useModal();

  return (
    <Dropbox.Wrapper onCloseModal={settingControl.onCloseModal}>
      <IconButton
        icon='setting'
        size='m'
        onClick={settingControl.onToggleModal}
      />
      {settingControl.showModal && (
        <Dropbox.Container vertical={'bottom'} horizontal={'right'}>
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
  font-weight: 500;
`;
