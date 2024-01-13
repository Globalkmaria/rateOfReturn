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
    if (!isLoggedIn) {
      alert('Please login to use remote storage.');
      return;
    }
    if (data === null || data === undefined) {
      alert('Please select a file.');
      return;
    }

    onOpenModal();
  };
  return (
    <>
      <StyledButton color='warning' fullWidth onClick={onRemoteOpen}>
        Store Remote Data as Backup
      </StyledButton>
      {showModal && <StoreRemoteBackupWarning onClose={onCloseModal} data={data} />}
    </>
  );
}

export default RemoteData;

const StyledButton = styled(ContainedButton)`
  margin-top: 10px;
`;
