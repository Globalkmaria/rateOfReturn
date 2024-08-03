import { ContainedButton } from '@/components/Button';
import PortalModal from '@/components/Modal/PortalModal';
import styled from 'styled-components';

interface Props {
  onClose: () => void;
  onDelete: () => Promise<void>;
}

function DeleteSoldModal({ onClose, onDelete }: Props) {
  return (
    <PortalModal onClose={onClose}>
      <StyledDeleteModal>
        <StyledMessage>
          Are you sure you want to delete this item?
        </StyledMessage>
        <ContainedButton size='l' color='warning' onClick={onDelete}>
          Delete
        </ContainedButton>
      </StyledDeleteModal>
    </PortalModal>
  );
}

export default DeleteSoldModal;

export const StyledDeleteModal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin-bottom: 20px;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 60vw;
  }
`;

const StyledMessage = styled('div')`
  padding: 20px 0 40px;
  font-size: 1.2em;
  font-weight: 700;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 20px 0;
    font-size: 1rem;
    text-align: center;
  }
`;
