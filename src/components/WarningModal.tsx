import styled from 'styled-components';

import { ContainedButton } from './Button';
import PortalModal from './Modal/PortalModal';

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
    <PortalModal title='Warning' onClose={onClose}>
      <StyledWarningModal>
        <p className='message'>{message}</p>
        <ContainedButton
          className='warning-confirm'
          color='warning'
          onClick={onConfirm}
        >
          {buttonName}
        </ContainedButton>
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

  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.7;
    flex: 1;
  }

  .warning-confirm {
    margin-top: 10px;
  }
`;
