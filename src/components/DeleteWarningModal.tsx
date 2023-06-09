import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { ContainedButton } from './Button';

interface DeleteWarningModalProps {
  message: string;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteWarningModal = ({
  onClose,
  onDelete,
  message,
}: DeleteWarningModalProps) => {
  return (
    <Modal onClose={onClose}>
      <StyledDeleteWarningModal>
        <p className='message'>{message}</p>
        <ContainedButton size='l' color='warning' onClick={onDelete}>
          Delete
        </ContainedButton>
      </StyledDeleteWarningModal>
    </Modal>
  );
};

export default DeleteWarningModal;

const StyledDeleteWarningModal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin-bottom: 20px;

  .message {
    padding: 20px 0 40px;
    font-size: 1.4em;
    font-weight: 700;
  }
`;
