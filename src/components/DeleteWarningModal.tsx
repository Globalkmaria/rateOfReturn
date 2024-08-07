import styled from 'styled-components';

import { ContainedButton } from './Button';
import PortalModal from './Modal/PortalModal';

interface DeleteWarningModalProps {
  message: string;
  onDelete: () => void;
  onClose: () => void;
  modalId?: string;
}

const DeleteWarningModal = ({
  onClose,
  onDelete,
  message,
  modalId,
}: DeleteWarningModalProps) => {
  return (
    <PortalModal onClose={onClose} id={modalId}>
      <StyledDeleteWarningModal>
        <StyledMessage>{message}</StyledMessage>
        <ContainedButton size='m' color='warning' onClick={onDelete}>
          Delete
        </ContainedButton>
      </StyledDeleteWarningModal>
    </PortalModal>
  );
};

export default DeleteWarningModal;

const StyledDeleteWarningModal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin-bottom: 10px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 70vw;
  }
`;

const StyledMessage = styled('p')`
  padding-bottom: 20px;
  font-size: 1.2em;
  font-weight: 600;
`;
