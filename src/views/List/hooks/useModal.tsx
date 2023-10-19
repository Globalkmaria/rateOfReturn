import { useMemo, useState } from 'react';

function useModal() {
  const [showModal, setShowModal] = useState(false);
  const onOpenModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  const result = useMemo(
    () => ({ showModal, onOpenModal, onCloseModal }),
    [showModal],
  );

  return result;
}

export default useModal;
