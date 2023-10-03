import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../features/user/selectors';
import useModal from '../views/List/hooks/useModal';
import { isLocalStorageEmpty } from '../utils/isLocalStorageEmpty';
import MergeLocalDataModal from '../views/Home/MergeLocalDataModal';

function MainModal() {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const { showModal, onOpenModal, onCloseModal } = useModal();

  useEffect(() => {
    if (!isLoggedIn || isLocalStorageEmpty()) return;
    onOpenModal();
  }, [isLoggedIn]);

  return <>{showModal && <MergeLocalDataModal onClose={onCloseModal} />}</>;
}

export default MainModal;
