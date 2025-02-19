import { MouseEvent, useRef } from 'react';

import {
  StyledCloseButton,
  StyledModal,
  StyledModalContent,
  StyledModalHeader,
  StyledModalTitle,
} from './Modal.style';
import useHideScroll from '../../views/List/hooks/useHideScroll';

export interface ModalContentProps {
  onClose: () => void;
}

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  title?: string;
}

const Modal = ({
  children,
  isOpen = true,
  onClose,
  title = '',
  showCloseButton = true,
}: ModalProps) => {
  const modalContent = useRef<HTMLDivElement>(null);
  const needHeader = !!title.length || showCloseButton;
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!modalContent.current?.contains(e.target as Node)) {
      onClose();
    }
  };

  useHideScroll({ isOpen });

  return (
    <StyledModal isOpen={isOpen} onClick={onClick}>
      <StyledModalContent ref={modalContent}>
        <StyledModalHeader needHeader={needHeader}>
          <StyledModalTitle>{title}</StyledModalTitle>
          {showCloseButton && (
            <StyledCloseButton
              size='s'
              width={32}
              onClick={onClose}
              icon='close'
            />
          )}
        </StyledModalHeader>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
