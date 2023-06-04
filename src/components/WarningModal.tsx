import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { ContainedButton } from './Button';

interface WarningModalProps {
  message: JSX.Element | string;
  onConfirm: () => void;
  onClose: () => void;
  buttonName: string;
}

const WarningModal = ({
  onClose,
  onConfirm,
  message,
  buttonName,
}: WarningModalProps) => {
  return (
    <Modal title='Warning' onClose={onClose}>
      <StyledWarningModal>
        <p className='message'>{message}</p>
        <ContainedButton color='warning' onClick={onConfirm}>
          {buttonName}
        </ContainedButton>
      </StyledWarningModal>
    </Modal>
  );
};

export default WarningModal;

const StyledWarningModal = styled('div')`
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 145px;
  text-align: center;
  font-weight: 700;

  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.7;
    flex: 1;
  }
`;
