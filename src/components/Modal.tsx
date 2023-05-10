import { MouseEvent, useRef } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const modalContent = useRef<HTMLDivElement>(null);
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!modalContent.current?.contains(e.target as Node)) {
      onClose();
    }
  };
  return (
    <StyledModal isOpen={isOpen} onClick={onClick}>
      <StyledModalContent ref={modalContent}>{children}</StyledModalContent>
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

const StyledModalContent = styled('div')`
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
`;
