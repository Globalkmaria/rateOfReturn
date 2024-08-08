import { useCallback, useState } from 'react';

type ModalHandlers<T extends string | undefined> = T extends string
  ? {
      [K in `showModal${Capitalize<T>}`]: boolean;
    } & {
      [K in `onOpenModal${Capitalize<T>}`]: () => void;
    } & {
      [K in `onCloseModal${Capitalize<T>}`]: () => void;
    } & {
      [K in `onToggleModal${Capitalize<T>}`]: () => void;
    }
  : {
      showModal: boolean;
      onOpenModal: () => void;
      onCloseModal: () => void;
      onToggleModal: () => void;
    };

function useModal<T extends string | undefined = undefined>(
  name?: T,
): ModalHandlers<T> {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = useCallback(() => setShowModal(true), []);
  const onCloseModal = useCallback(() => setShowModal(false), []);
  const onToggleModal = useCallback(() => setShowModal(prev => !prev), []);

  const capitalized = capitalize(name ?? '');

  return {
    [`showModal${capitalized}`]: showModal,
    [`onOpenModal${capitalized}`]: onOpenModal,
    [`onCloseModal${capitalized}`]: onCloseModal,
    [`onToggleModal${capitalized}`]: onToggleModal,
  } as ModalHandlers<T>;
}

export default useModal;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
