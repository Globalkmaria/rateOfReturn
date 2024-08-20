import styled from 'styled-components';

import { ContainedButton } from './Button';
import PortalModal from './Modal/PortalModal';

interface WarningModalProps {
  message: JSX.Element | string;
  onConfirm: () => void;
  onClose: () => void;
  buttonName: string;
  disabled?: boolean;
}

const WarningModal = ({
  onClose,
  onConfirm,
  message,
  buttonName,
  disabled,
}: WarningModalProps) => {
  return (
    <PortalModal title='Warning' onClose={onClose}>
      <StyledWarningModal>
        <StyledMessage>{message}</StyledMessage>
        <StyledWarningModalButton
          disabled={disabled}
          size='m'
          color='warning'
          onClick={onConfirm}
        >
          {buttonName}
        </StyledWarningModalButton>
      </StyledWarningModal>
    </PortalModal>
  );
};

export default WarningModal;

const StyledWarningModal = styled('div')`
  display: flex;
  flex-direction: column;
  width: 340px;
  text-align: center;
  font-weight: 700;
`;

const StyledMessage = styled('p')`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.7;
  flex: 1;
`;

const StyledWarningModalButton = styled(ContainedButton)`
  margin-top: 10px;
`;
