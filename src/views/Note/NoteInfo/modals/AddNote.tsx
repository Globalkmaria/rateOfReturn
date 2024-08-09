import { useState } from 'react';
import { useDispatch } from 'react-redux';

import PortalModal from '@/components/Modal/PortalModal';
import { ContainedButton } from '@/components/Button';
import { addNewNote } from '@/features/notes';

import NotePopupForm from '../NotePopupForm';
import { StyledForm, StyledNoteModal } from '../components';
import { NoteFormKeys, NoteFormState } from '../type';
import CloseWarningModal from '../CloseWarningModal';
import { checkEditNoteFormHasChanges } from '../helper';

interface NotePopupProps {
  onCloseModal: () => void;
  initialFormState: NoteFormState;
}

function AddNote({ onCloseModal, initialFormState }: NotePopupProps) {
  const dispatch = useDispatch();

  const [showWarning, setShowWarning] = useState(false);
  const [formState, setFormState] = useState<NoteFormState>(initialFormState);

  const onChange = <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => setFormState(prev => ({ ...prev, [fieldName]: value }));

  const onSubmit = () => {
    dispatch(
      addNewNote({
        ...formState,
        stockId: formState.stockName?.value,
        stockName: formState.stockName?.label,
        title: formState.title ?? 'Untitled',
      }),
    );

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
