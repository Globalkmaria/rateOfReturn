import { useCallback, useState } from 'react';

function useModal() {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = useCallback(() => setShowModal(true), []);
  const onCloseModal = useCallback(() => setShowModal(false), []);
  const onToggleModal = useCallback(
    () => setShowModal(!showModal),
    [showModal],
  );

  return {
    showModal,
    onOpenModal,
    onCloseModal,
    onToggleModal,
  };
}

export default useModal;
