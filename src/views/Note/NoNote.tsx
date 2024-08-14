import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';
import { NoListText } from '@/components/Text';

import useModal from '../List/hooks/useModal';
import AddNote from './NoteInfo/modals/AddNote';
import { INITIAL_NOTE_FORM_STATE } from './NoteInfo/const';

function EmptyNote() {
  const { showModal, onOpenModal, onCloseModal } = useModal();
  return (
    <>
      <EmptyNoteContainer>
        <NoListText>No notes</NoListText>
        <BorderButton size='s' onClick={onOpenModal}>
          <Icon icon='add' />
          <span>Add new note</span>
        </BorderButton>
      </EmptyNoteContainer>
      {showModal && (
        <AddNote
          initialFormState={INITIAL_NOTE_FORM_STATE}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export default EmptyNote;

const EmptyNoteContainer = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  & > ${BorderButton} {
    gap: 5px;
  }
`;
