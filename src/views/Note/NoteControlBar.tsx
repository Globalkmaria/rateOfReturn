import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';

import useModal from '../List/hooks/useModal';
import AddNote from './NoteInfo/modals/AddNote';
import { INITIAL_NOTE_FORM_STATE } from './NoteInfo/const';

function NoteControlBar() {
  const { showModal, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <StyledNoteControlBar>
        <BorderButton size='s' onClick={onOpenModal}>
          <Icon icon='add' />
          <span>Add New</span>
        </BorderButton>
      </StyledNoteControlBar>
      {showModal && (
        <AddNote
          initialFormState={INITIAL_NOTE_FORM_STATE}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export default NoteControlBar;

const StyledNoteControlBar = styled.div`
  padding: 20px 40px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  & > ${BorderButton} {
    gap: 5px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px 20px 0;
  }
`;
