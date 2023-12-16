import { MouseEvent, useEffect, useRef } from 'react';
import { CgClose } from 'react-icons/cg';

import { StyledCloseButton, StyledModal, StyledModalContent, StyledModalHeader, StyledModalTitle } from './Modal.style';

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

const Modal = ({ children, isOpen = true, onClose, title = '', showCloseButton = true }: ModalProps) => {
  const modalContent = useRef<HTMLDivElement>(null);
  const needHeader = !!title.length || showCloseButton;
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!modalContent.current?.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body!.style.overflow = 'hidden';
    } else {
      body!.style.overflow = 'auto';
    }
    return () => {
      body!.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <StyledModal isOpen={isOpen} onClick={onClick}>
      <StyledModalContent ref={modalContent}>
        <StyledModalHeader needHeader={needHeader}>
          <StyledModalTitle>{title}</StyledModalTitle>
          {showCloseButton && (
            <StyledCloseButton size='s' showLine={false} width={32} onClick={onClose}>
              <CgClose />
            </StyledCloseButton>
          )}
        </StyledModalHeader>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;
