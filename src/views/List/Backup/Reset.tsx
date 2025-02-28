import styled from 'styled-components';

import ResetDataWarning from './ResetDataWarning';
import { ContainedButton } from '../../../components/Button';
import useModal from '../hooks/useModal';

const Reset = () => {
  const { showModal, onOpenModal, onCloseModal } = useModal();

  return (
    <StyledReset>
      <ContainedButton size='m' onClick={onOpenModal} color='warning' fullWidth>
        Reset
      </ContainedButton>
      {showModal && <ResetDataWarning onClose={onCloseModal} />}
    </StyledReset>
  );
};

export default Reset;

const StyledReset = styled('div')``;
