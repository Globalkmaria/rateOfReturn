import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userNotesService from '@/service/userNotes/service';

import { addNewNote, NoteContent } from '@/features/notes';
import { selectIsLoggedIn } from '@/features/user/selectors';

import PortalModal from '@/components/Modal/PortalModal';
import { ContainedButton } from '@/components/Button';

import NotePopupForm from '../NotePopupForm';
import { StyledForm, StyledNoteModal } from '../components';
import { NoteFormKeys, NoteFormState } from '../type';
import CloseWarningModal from '../CloseWarningModal';
import { checkEditNoteFormHasChanges, isNoteEmpty } from '../helper';

interface NotePopupProps {
  onCloseModal: () => void;
  initialFormState: NoteFormState;
}

function AddNote({ onCloseModal, initialFormState }: NotePopupProps) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showWarning, setShowWarning] = useState(false);
  const [formState, setFormState] = useState<NoteFormState>(initialFormState);

  const onChange = <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => setFormState(prev => ({ ...prev, [fieldName]: value }));

  const onSubmit = async () => {
    if (isNoteEmpty(formState)) {
      alert('No information was added. Please enter a least one field.');
      return;
    }

    const newNote: NoteContent = {
      ...formState,
      stockId: formState.stockName?.value,
      stockName: formState.stockName?.label,
      title: formState.title ?? 'Untitled',
    };

    if (!isLoggedIn) {
      dispatch(addNewNote(newNote));
      onCloseModal();
      return;
    }

    const result = await userNotesService.addNewNote(newNote);
    if (!result.success) {
      alert(result.message);
      return;
    }

    dispatch(addNewNote({ ...newNote, ...result }));
    onCloseModal();
  };

  const onCheckChangeAndCloseModal = () => {
    const changes = checkEditNoteFormHasChanges(initialFormState, formState);
    if (changes) {
      setShowWarning(true);
      return;
    }

    onCloseModal();
  };

  const onCloseWarningModal = () => setShowWarning(false);

  const onCloseMainModal = () => {
    onCloseModal();
    onCloseWarningModal();
  };

  return (
    <>
      <PortalModal onClose={onCheckChangeAndCloseModal}>
        <StyledNoteModal>
          <StyledForm>
            <NotePopupForm onChange={onChange} formState={formState} />
            <ContainedButton onClick={onSubmit}>Add</ContainedButton>
          </StyledForm>
        </StyledNoteModal>
      </PortalModal>
      {showWarning && (
        <CloseWarningModal
          onCloseMainModal={onCloseMainModal}
          onContinueWriting={onCloseWarningModal}
        />
      )}
    </>
  );
}

export default AddNote;
