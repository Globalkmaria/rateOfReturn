import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ContainedButton } from '../../../components/Button';
import useModal from '../hooks/useModal';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import StoreRemoteBackupWarning from './StoreRemoteBackupWarning';

type Props = {
  data: any;
};

function RemoteData({ data }: Props) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const onRemoteOpen = () => {
    if (data === null || data === undefined) {
      alert('Please select a file.');
      return;
    }

    if (!isLoggedIn) {
      alert('Please login to use remote storage.');
      return;
    }

    onOpenModal();
  };
  return (
    <>
      <StyledButton color='warning' fullWidth onClick={onRemoteOpen}>
        Restore remote data from Backup
      </StyledButton>
      {showModal && (
        <StoreRemoteBackupWarning onClose={onCloseModal} data={data} />
      )}
    </>
  );
}

export default RemoteData;

const StyledButton = styled(ContainedButton)`
  margin-top: 10px;
`;
