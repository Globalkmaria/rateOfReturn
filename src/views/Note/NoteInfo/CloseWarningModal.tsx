import styled from 'styled-components';

import { BorderButton, ContainedButton } from '@/components/Button';
import PortalModal from '@/components/Modal/PortalModal';

interface Props {
  onCloseMainModal: () => void;
  onContinueWriting: () => void;
}

function CloseWarningModal({ onCloseMainModal, onContinueWriting }: Props) {
  return (
    <PortalModal title='Unsaved changes' onClose={onContinueWriting}>
      <StyledMessage>
        {`Changes that you made won't be saved.`} <br /> Are you sure you want
        to close?
      </StyledMessage>
      <StyledButtons>
        <BorderButton size='m' width={150} onClick={onCloseMainModal}>
          Close
        </BorderButton>
        <ContainedButton size='m' width={150} onClick={onContinueWriting}>
          Continue writing
        </ContainedButton>
      </StyledButtons>
    </PortalModal>
  );
}

export default CloseWarningModal;

const StyledButtons = styled('div')`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const StyledMessage = styled('p')`
  text-align: center;
  font-size: 0.9rem;
`;
