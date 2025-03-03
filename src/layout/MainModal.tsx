import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/getLocalStorage';

import { selectIsLoggedIn } from '../features/user/selectors';
import { isLocalStorageEmpty } from '../utils/isLocalStorageEmpty';
import MergeLocalDataModal from '../views/Home/MergeLocalDataModal';
import useModal from '../views/List/hooks/useModal';

function MainModal() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const wasMerged = getLocalStorageItem('merge');

  useEffect(() => {
    if (wasMerged || !isLoggedIn) return;

    if (isLocalStorageEmpty()) {
      setLocalStorageItem('merge', true);
      return;
    }

    onOpenModal();
  }, [isLoggedIn]);

  return <>{showModal && <MergeLocalDataModal onClose={onCloseModal} />}</>;
}

export default MainModal;
