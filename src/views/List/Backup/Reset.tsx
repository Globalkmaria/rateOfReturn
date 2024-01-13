import styled from 'styled-components';

import { ContainedButton } from '../../../components/Button';
import useModal from '../hooks/useModal';
import ResetDataWarning from './ResetDataWarning';

const Reset = () => {
  const { showModal, onOpenModal, onCloseModal } = useModal();

  return (
    <StyledReset>
      <ContainedButton onClick={onOpenModal} color='warning' fullWidth>
        Reset
      </ContainedButton>
      {showModal && <ResetDataWarning onClose={onCloseModal} />}
    </StyledReset>
  );
};

export default Reset;

const StyledReset = styled('div')``;
