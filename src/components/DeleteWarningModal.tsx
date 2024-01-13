import styled from 'styled-components';

import { ContainedButton } from './Button';
import PortalModal from './Modal/PortalModal';

interface DeleteWarningModalProps {
  message: string;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteWarningModal = ({ onClose, onDelete, message }: DeleteWarningModalProps) => {
  return (
    <PortalModal onClose={onClose}>
      <StyledDeleteWarningModal>
        <StyledMessage>{message}</StyledMessage>
        <ContainedButton size='l' color='warning' onClick={onDelete}>
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
  margin-bottom: 20px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 70vw;
  }
`;

const StyledMessage = styled('p')`
  padding: 20px 0 40px;
  font-size: 1.4em;
  font-weight: 700;
`;
