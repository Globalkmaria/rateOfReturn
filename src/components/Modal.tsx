import { MouseEvent, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BorderButton } from './Button';
import { CgClose } from 'react-icons/cg';

export interface ModalContentProps {
  onClose: () => void;
  isOpen: boolean;
}

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  title?: string;
}

const Modal = ({
  children,
  isOpen,
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

  useEffect(() => {
    const body = document.querySelector('body');
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
      <StyledModalContent needHeader={needHeader} ref={modalContent}>
        <div className='header'>
          <h1 className='title'>{title}</h1>
          {showCloseButton && (
            <BorderButton
              className='close-btn'
              size='s'
              showLine={false}
              width={32}
              onClick={onClose}
            >
              <CgClose />
            </BorderButton>
          )}
        </div>
        {children}
      </StyledModalContent>
    </StyledModal>
  );
};

export default Modal;

const StyledModal = styled('div')<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;

const StyledModalContent = styled('div')<{ needHeader: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.grey700};
  min-height: 100px;
  min-width: 200px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  .header {
    display: ${({ needHeader }) => (needHeader ? 'flex' : 'none')};
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-weight: 700;
    font-size: 1.4rem;
  }

  ${BorderButton}.close-btn {
    align-self: flex-end;
    border: none;
  }
`;
