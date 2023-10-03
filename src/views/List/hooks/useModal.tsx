import { useState } from 'react';

function useModal() {
  const [showModal, setShowModal] = useState(false);
  const onOpenModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return { showModal, onOpenModal, onCloseModal };
}

export default useModal;
