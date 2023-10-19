import { useSelector } from 'react-redux';
import { ContainedButton } from '../../../components/Button';
import useModal from '../hooks/useModal';
import StoreRemoteBackupWarning from './StoreRemoteBackupWarning';
import { selectIsLoggedIn } from '../../../features/user/selectors';

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
      <ContainedButton
        className='store-remote-data'
        color='warning'
        fullWidth
        onClick={onRemoteOpen}
      >
        Store Remote Data as Backup
      </ContainedButton>
      {showModal && (
        <StoreRemoteBackupWarning onClose={onCloseModal} data={data} />
      )}
    </>
  );
}

export default RemoteData;
